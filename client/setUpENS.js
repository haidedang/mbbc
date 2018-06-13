let URLResolver = require('./build/contracts/URLResolver.json')
let FIFSRegistrar = require('./build/contracts/FIFSRegistrar.json')
let ENSRegistry = require('./build/contracts/ENSRegistry.json')
let ReverseRegistrar = require('./build/contracts/ReverseRegistrar.json')
let contract = require('truffle-contract')
const request = require('request');

var Web3 = require('web3')
var provider = new Web3.providers.HttpProvider("http://localhost:9545");

let web3 = new Web3(provider);

function fixProvider(contract) {
    if (typeof contract.currentProvider.sendAsync !== "function") {
        contract.currentProvider.sendAsync = function () {
            return contract.currentProvider.send.apply(
                contract.currentProvider, arguments
            );
        };
    }
}

let Contracts = {
    accounts: null,
    init: function () {
        return new Promise((resolve, reject) => {
            Contracts.fifsRegistrar = contract(FIFSRegistrar);
            Contracts.fifsRegistrar.setProvider(provider);
            fixProvider(Contracts.fifsRegistrar);

            Contracts.ensRegistry = contract(ENSRegistry)
            Contracts.ensRegistry.setProvider(provider);
            fixProvider(Contracts.ensRegistry);

            Contracts.urlResolver = contract(URLResolver);
            Contracts.urlResolver.setProvider(provider);
            fixProvider(Contracts.urlResolver);

            Contracts.registrar = contract(ReverseRegistrar);
            Contracts.registrar.setProvider(provider);
            fixProvider(Contracts.registrar);

            /* let accounts = await web3.eth.getAccounts();
            Contracts.accounts = accounts; */
            web3.eth.getAccounts().then((accounts) => {
                Contracts.accounts = accounts;
                resolve();
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
    setRootNode() {
        return new Promise((resolve, reject) => {
                Contracts.ensRegistry.deployed().then((instance) => {
                    return instance.setSubnodeOwner(0, web3.utils.sha3('reverse'), Contracts.accounts[0], { from: Contracts.accounts[0] });
                }).then((result) => {
                    console.log("rootnode");
                    resolve(result)
                }).catch(function (err) {
                    console.log(err);
                });
        })
    },
    setChildNode() {
        return new Promise((resolve, reject) => {
            Contracts.registrar.deployed().then((registrarInstance)=>{
                Contracts.ensRegistry.deployed().then((instance) => {
                    return instance.setSubnodeOwner(Contracts.namehash('reverse'), web3.utils.sha3('addr'), registrarInstance.address, { from: Contracts.accounts[0]});
                }).then((result) => {
                    console.log("childnode");
                    resolve(result)
                }).catch(function (err) {
                    console.log(err);
                });
            })
                
        })
    }

}



Contracts.init()
    .then(() => { 
        return Contracts.setRootNode(); 
    })
    .then(()=> { 
        return Contracts.setChildNode();
    })