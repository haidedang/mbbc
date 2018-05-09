App = {
  web3Provider: null,
  contracts: {},

  init: function() {

    // Load pets.
    $.getJSON('../pets.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.pet-breed').text(data[i].breed);
        petTemplate.find('.pet-age').text(data[i].age);
        petTemplate.find('.pet-location').text(data[i].location);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);
        petTemplate.find('.input-price').attr('id', 'input-price-' + data[i].id);
        petTemplate.find('.last-price').attr('id', 'last-price-' + data[i].id);

        petsRow.append(petTemplate.html());
      }
    });

    return App.initWeb3();
  },

  initWeb3: function() {
        // Is there an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fall back to Ganache
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
      $.getJSON('Adoption.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var AdoptionArtifact = data;
      App.contracts.Adoption = TruffleContract(AdoptionArtifact);

      // Set the provider for our contract
      App.contracts.Adoption.setProvider(App.web3Provider);

      // Use our contract to retrieve and mark the adopted pets
      App.showLastPrices();
      App.showTotalAmount();
      return App.markAdopted();
    });

    $.getJSON('Registry.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var RegistryArtifact = data;
      App.contracts.Registry = TruffleContract(RegistryArtifact);

      // Set the provider for our contract
      App.contracts.Registry.setProvider(App.web3Provider);
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
    $(document).on('click', '.btn-register', App.handleRegister);
    $(document).on('click', '.show', App.showUsers);
  },

  markAdopted: function(adopters, account) {
    var adoptionInstance;
    console.log("Mark adopted");

    App.contracts.Adoption.deployed().then(function(instance) {
      adoptionInstance = instance;

      return adoptionInstance.getAdopters.call();
    }).then(function(adopters) {
      for (i = 0; i < adopters.length; i++) {
        console.log("Adopter: " + adopters[i]);
        //
        // if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
        //   $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
        // }
      }
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  convertToEth: function(wei) {
    return wei / 1000000000000000000;
  },

  showTotalAmount: function(prices, account) {
    var adoptionInstance;
    console.log("Show Total Amount");

    App.contracts.Adoption.deployed().then(function(instance) {
      adoptionInstance = instance;

      return adoptionInstance.getTotalAmount.call();
    }).then(function(totalAmount) {
      console.log(App.convertToEth(totalAmount)); 
      document.getElementById('text-total-amount').textContent = App.convertToEth(totalAmount) + " ETH";
    }).catch(function(err) {
      console.log(err.message);
    });
  },


  showLastPrices: function(prices, account) {
    var adoptionInstance;
    console.log("Show last prices");

    App.contracts.Adoption.deployed().then(function(instance) {
      adoptionInstance = instance;

      return adoptionInstance.getPrices.call();
    }).then(function(prices) {
      var petTemplate = $('#petTemplate');

      for (i = 0; i < prices.length; i++) {
        console.log("Price: " + prices[i]);
        document.getElementById('last-price-' + i).textContent = web3.fromWei(prices[i]);
      }
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));
    var adoptionInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];
      console.log("this account: " + account);

      App.contracts.Adoption.deployed().then(function(instance) {
        adoptionInstance = instance;
        var bidPrice = document.getElementById('input-price-' + petId).value;
        console.log('Bid price: ' + bidPrice);

        // Execute adopt as a transaction by sending account

        return adoptionInstance.adopt(petId, {value: web3.toWei(bidPrice), from: account});
      }).then(function(result) {
        console.log(result);
        App.showTotalAmount();
        App.showLastPrices();
        return App.markAdopted();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  handleRegister: function(event){
    event.preventDefault();
    
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      console.log(accounts);

       account = accounts[0];
      console.log("this account: " + account);

      App.contracts.Registry.deployed().then(function(instance) {
        registryInstance = instance;
        var url = document.getElementById('username').value;
         console.log('url: ' + url);
        
        // Execute adopt as a transaction by sending account
        return registryInstance._register(url);
      }).then(function(result) {
        console.log(App.convertToEth(result)); 
      }).catch(function(err) {
        console.log(err.message);
      });
    }); 
  }
   ,

  showUsers: function(event) {
    var registryInstance ;
    web3.eth.getAccounts(function(error, accounts) {
      if (error) { 
        console.log(error); 
      }

      var account = accounts[0]; 

      App.contracts.Registry.deployed().then(function(instance) {
        registryInstance = instance;
        return registryInstance.getUsers.call();
      }).then(function(result) {
        console.log(result);
        
        // get the address 
        return registryInstance.getUser.call(result[result.indexOf(account)]);
        
        // console.log("Hey");
        // console.log(result);
      }).then(function(result){ 
        console.log('reached');
        console.log(result);
      }).catch(function(err) {
        console.log(err.message);
      });

    })
    
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
