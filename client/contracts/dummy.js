let URLResolver = require('../build/contracts/URLResolver.json')
let FIFSRegistrar = require('../build/contracts/FIFSRegistrar.json')
let ENSRegistry = require('../build/contracts/ENSRegistry.json')
let contract = require('truffle-contract')

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
    registerENS: function (userName, key) {
        return new Promise((resolve, reject) => {
            Contracts.fifsRegistrar.deployed().then(function (instance) {
                let registryInstance = instance;
                return registryInstance.register(web3.utils.sha3(userName), Contracts.accounts[key].toLowerCase(), { from: Contracts.accounts[key].toLowerCase() });
            }).then(function (result) {
                console.log("ENS Registration successfull");
                resolve();
            }).catch(function (err) {
                console.log(err);
            });
        })

    },
    registerUser: function (user, url, key) {
        return new Promise((resolve, reject) => {
            Contracts.urlResolver.deployed().then(function (instance) {
                let registryInstance = instance;
                return registryInstance.setUrl(Contracts.namehash(user), url, { from: Contracts.accounts[key].toLowerCase() });
            }).then(function (result) {
                console.log('Registration successfull');
                resolve();
            }).catch(function (err) {
                console.log(err.message);
            });
        })
    },
    getOwnerAddress: function (userName) {
        return new Promise((resolve, reject) => {
            Contracts.ensRegistry.deployed().then(function (instance) {
                return instance.owner.call((Contracts.namehash(userName)));
            }).then(function (result) {
                console.log('User Address ' + result);
                resolve();
            }).catch(function (err) {
                console.log(err.Message)
                console.log("Fail");
            });
        })
    },
    searchUser: function (userName) {
        return new Promise((resolve, reject) => {
            Contracts.urlResolver.deployed().then(function (instance) {
                let Resolver = instance;
                return Resolver.url.call((Contracts.namehash(userName)));
            }).then(function (result) {
                console.log('found address')
                resolve(result);
            }).catch(function (err) {
                console.log(err);
            });
        })
    }
};


DummyUsers = {
    0: {
        username: 'John',
        url: "http://localhost:8081"
    },
    1: {
        username: 'Peter',
        url: "http://localhost:8081"
    },
    2: {
        username: 'Trump',
        url: "http://localhost:8082"
    },
    3: {
        username: 'Benny',
        url: "http://localhost:8082"
    },
    4: {
        username: 'Karl',
        url: "http://localhost:8081"
    }
}

for (const key of Object.keys(DummyUsers)) { 
    console.log(parseInt(key))

}

function setUpDummyData(){
    return new Promise((resolve, reject) => { 
        for (const key of Object.keys(DummyUsers)) { 
            console.log(parseInt(key))
            Contracts.registerENS(DummyUsers[key].username, parseInt(key))
            .then((result) => {
                return Contracts.getOwnerAddress(DummyUsers[key].username+'.eth');
            })
            .then((result) => {
                return Contracts.registerUser(DummyUsers[key].username+'.eth', DummyUsers[key].url, parseInt(key));
            })
            .then((result) => {
                return Contracts.searchUser(DummyUsers[key].username+'.eth')
            })
            .then((result) => {
               (result)
            });
        } 
        
    })
}

Contracts.init().then(() => {
    return setUpDummyData(); 
}).then((result) => console.log(result))
/* 
Contracts.init()
    .then(() => {
        return Contracts.registerENS('Kai', 2)
    })
    .then((result) => {
        return Contracts.getOwnerAddress('Kai.eth');
    })
    .then((result) => {
        return Contracts.registerUser('Kai.eth', 'test.com', 2);
    })
    .then((result) => {
        return Contracts.searchUser('Kai.eth')
    })
    .then((result) => {
        console.log(result)
    }); */






/* fifsRegistrar.register(web3.sha3('Peter.eth'), ) */


