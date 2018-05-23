import $ from 'jquery';
import contract from 'truffle-contract'
import Registry from '../../build/contracts/Registry.json'
import ENSRegistry from '../../../Blockchain/build/contracts/ENSRegistry.json'


const App = {

  contract: null,
  instance: null,
  result: null,

  init: function () {
    let self = this

    return new Promise(function (resolve, reject) {
      self.contract = contract(Registry)
      self.contract.setProvider(window.web3.currentProvider)
      console.log(window.web3.currentProvider);

      self.contract.ENSRegistry = contract(ENSRegistry);
      self.contract.ENSRegistry.setProvider(window.web3.currentProvider)

      self.contract.deployed().then(instance => {
        self.instance = instance;
        resolve()
      }).catch(err => {
        reject(err)
      })

      self.contract.ENSRegistry.deployed().then(instance => {
        self.instance.ENSRegistry = instance;
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },

  namehash: function (name) {
    var node = '0x0000000000000000000000000000000000000000000000000000000000000000';
    if (name != '') {
      var labels = name.split(".");
      for (var i = labels.length - 1; i >= 0; i--) {
        node = web3.utils.sha3(node + web3.utils.sha3(labels[i]).slice(2), { encoding: 'hex' });
      }
    }
    return node.toString();
  },

  selectStorage: function () {
    var url = "http://dropStore.com"
    console.log('clicked')
    return url;
  },

  event: function (userID) {
    let self = this;

    return new Promise((resolve, reject) => {
      self.instance.RegisterEvent(userID, (error, result) => {
        if (!error)
          resolve(result);
      });
    })


  },

  // Refactoring neccessary 
  handleRegister: function (userID) {
    let self = this;

    return new Promise((resolve, reject) => {

      console.log('reached');
      console.log(self.instance);

      App.event(userID);

      web3.eth.getAccounts(function (error, accounts) {
        console.log(self.instance.ENSRegistry);
        // CASE 1: User already registered, cannot register one more! 
        self.instance.getUsers.call().then((result) => {
          result.forEach(item => {
            if (item.toUpperCase() === accounts[0].toUpperCase()) {
              throw new Error("You already registered");
            }
          })

          // CASE 2 : User needs to have an Ethereum ID, and also ID adress must be the same as msg.sender 
          self.instance.ENSRegistry.owner.call(App.namehash(userID + ".eth"))
            .then((result) => {
              console.log(result)
              console.log(accounts[0]);
              // if owner adress is same as msg.sender call the register function! 
              // FrontEND is fetching the ENS Registry and comparing 
              // requirement here would be that User already has an ID registered in Ethereum! 
              if (result !== '0x0000000000000000000000000000000000000000') {
                if (result.toUpperCase() === accounts[0].toUpperCase()) {
                  self.instance._register('0x0f498d6c7cb6c811f027396ba346f1df89c02b6f', App.namehash(userID + '.eth'), 'http://dropbox.com', { from: accounts[0] })
                    .then((result) => {
                      console.log('done')
                      // self.event(userID).then((result)=>console.log(result.args)); 
                    })
                    .catch((err) => { reject(err) });
                } else if (result.toUpperCase() !== accounts[0].toUpperCase()) {
                  resolve('You are not owner of that ID');
                }
              } else {
                resolve('This Ethereum ID does not exist');
              }

            });
        }).catch((e) => reject(e));
      })
    })


  },

  login: function () {
    let self = this;
    return new Promise ((resolve, reject)=> { 
      web3.eth.getAccounts((error, accounts) => {
        self.instance.getUsers.call().then((result) => {
          result.forEach((item)=> { 
           if(item.toUpperCase() == accounts[0].toUpperCase()){ 
             resolve(true); 
           } 
          })
        })
      })
    })
    
  }
  //  ----depreceated ----

  // handleRegister: function(event){
  //   event.preventDefault();

  //   web3.eth.getAccounts(function(error, accounts) {
  //     if (error) {
  //       console.log(error);
  //     }
  //     console.log(accounts);

  //      account = accounts[0];
  //     console.log("this account: " + account);

  //     App.contracts.Registry.deployed().then(function(instance) {
  //       registryInstance = instance;
  //       var userID = document.getElementById('userID').value;
  //       // Execute adopt as a transaction by sending account
  //       // HAS TO BE THE ENS ADRESS!!! 
  //       return registryInstance._register('0x64d1b55b982d93653839dce399dc30b4323b4f90', 
  //       App.namehash(userID+'.eth'), App.selectStorage());

  //       // return registryInstance._registerProto(url);

  //     }).then(function(result) {
  //       console.log(App.convertToEth(result)); 
  //     }).catch(function(err) {
  //       console.log(err.message);
  //     });
  //   }); 
  // }

  /*     
      registerDomain: function (event){
        event.preventDefault();
        
        web3.eth.getAccounts(function(error, accounts) {
          if (error) {
            console.log(error);
          }
          console.log(accounts);
           
    
           account = accounts[0];
          console.log("this account: " + account);
    
          App.contracts.FIFSRegistrar.deployed().then(function(instance) {
            registryInstance = instance;
            var url = document.getElementById('username').value;
            console.log('strange');
            console.log(instance.address); 
             
            return registryInstance.register(web3.sha3(url), account, {from: account}); 
          }).then(function(result){ 
            console.log("done"); 
          }).catch(function(err){
            console.log("Fail"); 
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
        
      } */

};

export default App