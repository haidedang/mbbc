import $ from 'jquery';
import contract from 'truffle-contract'
import Registry from '../../build/contracts/Registry.json'


const App = {
   
    contract: null,
    instance: null, 
  
    init: function () {
      let self = this
  
      return new Promise(function (resolve, reject) {
        self.contract = contract(Registry)
        self.contract.setProvider(window.web3.currentProvider)
        console.log(window.web3.currentProvider);
        
        self.contract.deployed().then(instance => {
          self.instance = instance;
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
  
    namehash: function(name) {
      var node = '0x0000000000000000000000000000000000000000000000000000000000000000';
      if (name != '') {
          var labels = name.split(".");
          for(var i = labels.length - 1; i >= 0; i--) {
              node = web3.utils.sha3(node + web3.utils.sha3(labels[i]).slice(2), {encoding: 'hex'});
          }
      }
      return node.toString();
    },

    selectStorage: function(){  
      var url = "http://dropStore.com"
      console.log('clicked')
      return url; 
    },

    handleRegister: function(userID){ 
      let self = this;
      
      
      return new Promise((resolve, reject) => {
    
          console.log('reached');
          console.log(self.instance); 
          
          web3.eth.getAccounts(function(error, accounts) {
            self.instance._registerProto('hallo', {from: accounts[0], gas: 2000000}).then((result)=> {resolve(result)})
            .catch ((err)=> { reject(err)});
          }) 

          
          // self.instance._register('0xd50025a1cc65692e14b2355b4fdc43c3c1970999', 
          // self.namehash(userID+'.eth'), 'http://dropStore.com').then((result)=> { 
          //   resolve('success'); 
          // });
        })
        
      
    },
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