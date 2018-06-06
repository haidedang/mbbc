import $ from 'jquery';
import contract from 'truffle-contract'
import URL from '../../build/contracts/URLResolver.json'
import FIFSRegistrar from '../../build/contracts/FIFSRegistrar.json'
import ENS from '../../build/contracts/ENSRegistry.json'


const App = {
  web3Provider: null,
  contracts: {},
  account : null,

  init: function() {

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
    
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var FIFSRegistrarArtifact = FIFSRegistrar;
      App.contracts.FIFSRegistrar = contract(FIFSRegistrarArtifact);
      App.contracts.FIFSRegistrar.setProvider(App.web3Provider);
 
      var ENSRegistry = ENS; 
      App.contracts.ENSRegistry  = contract(ENSRegistry); 
      App.contracts.ENSRegistry.setProvider(App.web3Provider); 

    
      var URLResolver = URL; 
      App.contracts.URLResolver  = contract(URLResolver); 
      App.contracts.URLResolver.setProvider(App.web3Provider); 
    
  },

  namehash: function(name) {
    var node = '0x0000000000000000000000000000000000000000000000000000000000000000';
    if (name != '') {
        var labels = name.split(".");
        for(var i = labels.length - 1; i >= 0; i--) {
            node = web3.sha3(node + web3.sha3(labels[i]).slice(2), {encoding: 'hex'});
        }
    }
    return node.toString();
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

  selectStorage: function(event){  
    var url = "http://dropStore.com"
    console.log('clicked')
    return url; 
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
        var userID = document.getElementById('userID').value;
        // Execute adopt as a transaction by sending account
        // HAS TO BE THE ENS ADRESS!!! 
        return registryInstance._register('0x64d1b55b982d93653839dce399dc30b4323b4f90', 
        App.namehash(userID+'.eth'), App.selectStorage());

        // return registryInstance._registerProto(url);
        
      }).then(function(result) {
        console.log(App.convertToEth(result)); 
      }).catch(function(err) {
        console.log(err.message);
      });
    }); 
  }
   ,
  
  registerDomain: function (username){
   
    
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      console.log(accounts);

      let account = accounts[0];
      console.log("this account: " + account);

      App.contracts.FIFSRegistrar.deployed().then(function(instance) {
       let registryInstance = instance;
        console.log('strange');
        console.log(instance.address); 
         
        return registryInstance.register(web3.sha3(username), account, {from: account}); 
      }).then(function(result){ 
        console.log("done"); 
      }).catch(function(err){
        console.log(err); 
      }); 
      
      })
    } 
  ,

  //registering works now... but name is registered on .eth while via console it is not . 
  showRegister: function(event) {
    event.preventDefault();
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      console.log(accounts);
      
       account = accounts[0];
      console.log("this account: " + account);
     //  console.log(web3.sha3('haidedang'));

      App.contracts.ENSRegistry.deployed().then(function(instance) {
        ENSInstance = instance;
        console.log(App.namehash('facebook'));
        console.log("ENSInstance")
        console.log(ENSInstance.address); 
        
         
        return ENSInstance.owner.call((App.namehash('john.eth'))); 
      }).then(function(result){ 
        console.log(result); 
        console.log("done"); 
      }).catch(function(err){
        console.log("Fail"); 
      }); 
      
      }) 

  },
  
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
    
  },
  
  registerUser: function(user, url) {
    return new Promise ((resolve, reject) => { 
      console.log('HIT')
      var registryInstance ;
      web3.eth.getAccounts(function(error, accounts) {
        if (error) { 
          console.log(error); 
        }
  
        var account = accounts[0]; 
  
        App.contracts.URLResolver.deployed().then(function(instance) {
          let registryInstance = instance;
          console.log(registryInstance.address)
         
          // return registryInstance.register(web3.sha3(url), account, {from: account}); 
  
          return registryInstance.setUrl(App.namehash(user), url , {from:account});
          
          // console.log("Hey");
          // console.log(result);
        }).then(function(result){ 
          console.log('reached');
          resolve(account);
        }).catch(function(err) {
          console.log(err.message);
        });
  
      })

    })
   
  },
  // Refactoring neccessary 
  // handleRegister: function (userID) {
  //   let self = this;

  //   return new Promise((resolve, reject) => {

  //     console.log('reached');
  //     console.log(self.instance);

  //     App.event(userID);

  //     web3.eth.getAccounts(function (error, accounts) {
  //       console.log(self.instance.ENSRegistry);
  //       // CASE 1: User already registered, cannot register one more! 
  //       self.instance.getUsers.call().then((result) => {
  //         result.forEach(item => {
  //           if (item.toUpperCase() === accounts[0].toUpperCase()) {
  //             throw new Error("You already registered");
  //           }
  //         })

  //         // CASE 2 : User needs to have an Ethereum ID, and also ID adress must be the same as msg.sender 
  //         self.instance.ENSRegistry.owner.call(App.namehash(userID + ".eth"))
  //           .then((result) => {
  //             console.log(result)
  //             console.log(accounts[0]);
  //             // if owner adress is same as msg.sender call the register function! 
  //             // FrontEND is fetching the ENS Registry and comparing 
  //             // requirement here would be that User already has an ID registered in Ethereum! 
  //             if (result !== '0x0000000000000000000000000000000000000000') {
  //               if (result.toUpperCase() === accounts[0].toUpperCase()) {
  //                 self.instance._register('0x0f498d6c7cb6c811f027396ba346f1df89c02b6f', App.namehash(userID + '.eth'), 'http://dropbox.com', { from: accounts[0] })
  //                   .then((result) => {
  //                     console.log('done')
  //                     // self.event(userID).then((result)=>console.log(result.args)); 
  //                   })
  //                   .catch((err) => { reject(err) });
  //               } else if (result.toUpperCase() !== accounts[0].toUpperCase()) {
  //                 resolve('You are not owner of that ID');
  //               }
  //             } else {
  //               resolve('This Ethereum ID does not exist');
  //             }

  //           });
  //       }).catch((e) => reject(e));
  //     })
  //   })


  // }

  searchUser: function(userName) {
    return new Promise ((resolve, reject) => {
      web3.eth.getAccounts(function(error, accounts) {
        if (error) {
          console.log(error);
        }
         let account = accounts[0];
       //  console.log(web3.sha3('haidedang'))
        App.contracts.URLResolver.deployed().then(function(instance) {
          let Resolver = instance;
           
          return Resolver.url.call((App.namehash(userName))); 
        }).then(function(result){ 
         
          resolve(result); 
        }).catch(function(err){
          console.log(err); 
        }); 
        }) 

    })
   
  }

};

export default App