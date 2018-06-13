import $ from 'jquery';
import contract from 'truffle-contract'
import URL from '../../build/contracts/URLResolver.json'
import FIFSRegistrar from '../../build/contracts/FIFSRegistrar.json'
import ENS from '../../build/contracts/ENSRegistry.json'
import DefaultReverseResolver from '../../build/contracts/DefaultReverseResolver.json'
import ReverseRegistrar from '../../build/contracts/ReverseRegistrar.json'
import PublicResolver from '../../build/contracts/PublicResolver.json'


const App = {
    web3Provider: null,
    contracts: {},
    account: null,

    init: function () {
        return App.initWeb3();
    },

    initWeb3: function () {
        // Is there an injected web3 instance?
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
        } else {
            // If no injected web3 instance is detected, fall back to Ganache
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:9545');
        }
        web3 = new Web3(App.web3Provider);

        return App.initContract();
    },

    initContract: function () {

        // Get the necessary contract artifact file and instantiate it with truffle-contract
        var FIFSRegistrarArtifact = FIFSRegistrar;
        App.contracts.FIFSRegistrar = contract(FIFSRegistrarArtifact);
        App.contracts.FIFSRegistrar.setProvider(App.web3Provider);

        var ENSRegistry = ENS;
        App.contracts.ENSRegistry = contract(ENSRegistry);
        App.contracts.ENSRegistry.setProvider(App.web3Provider);

        var URLResolver = URL;
        App.contracts.URLResolver = contract(URLResolver);
        App.contracts.URLResolver.setProvider(App.web3Provider);

        var Resolver = PublicResolver;
        App.contracts.Resolver = contract(Resolver);
        App.contracts.Resolver.setProvider(App.web3Provider);

        var DefaultResolver = DefaultReverseResolver;
        App.contracts.DefaultResolver = contract(DefaultResolver);
        App.contracts.DefaultResolver.setProvider(App.web3Provider);

        var ReverseResolver = ReverseRegistrar;
        App.contracts.ReverseResolver = contract(ReverseResolver);
        App.contracts.ReverseResolver.setProvider(App.web3Provider);
    },

    namehash: function (name) {
        var node = '0x0000000000000000000000000000000000000000000000000000000000000000';
        if (name != '') {
            var labels = name.split(".");
            for (var i = labels.length - 1; i >= 0; i--) {
                node = web3.sha3(node + web3.sha3(labels[i]).slice(2), { encoding: 'hex' });
            }
        }
        return node.toString();
    },
    registerDomain: function (username) {
        return new Promise((resolve, reject) => {
            web3.eth.getAccounts(function (error, accounts) {
                if (error) {
                    console.log(error);
                }
                let account = accounts[0];

                let register = App.contracts.FIFSRegistrar.deployed().then((instance) => {
                    let registryInstance = instance;
                    return registryInstance.register(web3.sha3(username), account, { from: account });
                })
                    .then(function (result) {
                        console.log("done");
                        resolve(result);
                    }).catch(function (err) {
                        console.log(err);
                    });
            })
        })

    },
    getAddressOfDomain: function (username) {
        return new Promise((resolve, reject) => {
            web3.eth.getAccounts(function (error, accounts) {
                if (error) {
                    console.log(error);
                }
                let account = accounts[0];
                console.log('username ' + username)
                App.contracts.Resolver.deployed().then((instance) => {
                    let ResolverInstance = instance;
                    return ResolverInstance.addr.call(App.namehash(username + '.eth'));
                }).then((result) => {
                    console.log("done");
                    resolve(result);
                }).catch(function (err) {
                    console.log(err);
                });
            })
        })
    },
    setAddressOfDomain: function (username) {
        return new Promise((resolve, reject) => {
            console.log('reached')
            console.log(username);
            web3.eth.getAccounts(function (error, accounts) {
                if (error) {
                    console.log(error);
                }
                let account = accounts[0];
                let reverse = App.contracts.Resolver.deployed().then((instance) => {
                    let ResolverInstance = instance;
                    return ResolverInstance.setAddr(App.namehash(username + '.eth'), account, { from: account });
                }).then(function (result) {
                    resolve(result)
                    console.log("done");
                }).catch(function (err) {
                    console.log(err);
                });
            })
        })
    },
    setNameForReverseAddress: function (username) {
        return new Promise((resolve, reject) => {
            web3.eth.getAccounts((error, accounts) => {
                if (error) {
                    console.log(error);
                }
                let account = accounts[0];
                App.contracts.ReverseResolver.deployed().then((instance) => {
                    let reverseResolveInstance = instance;
                    return reverseResolveInstance.setName(username + '.eth', { from: account });
                }).then(function (result) {
                    resolve(result)
                    console.log("done");
                }).catch(function (err) {
                    console.log(err);
                });
            })
        })
    },
    getNameForReverseAddress: function () {
        console.log('hey')
        return new Promise((resolve, reject) => {
            web3.eth.getAccounts((error, accounts) => {
                if (error) {
                    console.log(error);
                }
                let account = accounts[0];
                App.contracts.DefaultResolver.deployed().then((instance) => {
                    return instance.name.call(App.namehash(account.slice(2).toLowerCase() + ".addr.reverse"));
                }).then((result) => {
                    resolve(result)
                    console.log("done");
                }).catch(function (err) {
                    console.log(err);
                });
            })
        })
    },
    claimEnsNodeHash() {
        return new Promise((resolve, reject) => {
            web3.eth.getAccounts((error, accounts) => {
                if (error) {
                    console.log(error);
                }
                let account = accounts[0];
                App.contracts.ReverseResolver.deployed().then((instance) => {
                    let reverseResolveInstance = instance;
                    return reverseResolveInstance.claim('0xd6b28bc0545f2c78c8fec629028d3882fe1e80c4', { from: account });
                }).then((result) => {
                    console.log("ENSNodeHash");
                    resolve(result)
                }).catch(function (err) {
                    console.log(err);
                });
            })
        })
    },
    registerUser: function (url) {
        return new Promise((resolve, reject) => {
            console.log('HIT')
            var registryInstance;
            web3.eth.getAccounts(function (error, accounts) {
                if (error) {
                    console.log(error);
                }
                var account = accounts[0];
                App.getNameForReverseAddress()
                    .then((userName) => {
                        App.contracts.URLResolver.deployed().then(function (instance) {
                            // return registryInstance.register(web3.sha3(url), account, {from: account});
                            return instance.setUrl(App.namehash(userName), url, userName, account, { from: account });
                        }).then(function (result) {
                            console.log('reached');
                            resolve(account);
                        }).catch(function (err) {
                            console.log(err.message);
                        });
                    })
            })
        })
    },
    searchUser: function (userName) {
        return new Promise((resolve, reject) => {
            web3.eth.getAccounts(function (error, accounts) {
                if (error) {
                    console.log(error);
                }
                let account = accounts[0];
                //  console.log(web3.sha3('haidedang'))
                App.contracts.URLResolver.deployed().then(function (instance) {
                    let Resolver = instance;

                    return Resolver.url.call((App.namehash(userName)));
                }).then(function (result) {

                    resolve(result);
                }).catch(function (err) {
                    console.log(err);
                });
            })

        })

    },
    getUserName: function () {
        console.log('reached')
        return new Promise((resolve, reject) => {
            web3.eth.getAccounts(function (error, accounts) {
                if (error) {
                    console.log(error);
                }
                let account = accounts[0];
                //  console.log(web3.sha3('haidedang'))
                App.contracts.URLResolver.deployed().then((instance) => {
                    return instance.domainID.call(account);
                }).then(function (result) {
                    resolve(result);
                }).catch(function (err) {
                    console.log(err);
                });
            })

        })
    },
    setRootNode() {
        return new Promise((resolve, reject) => {
            web3.eth.getAccounts((error, accounts) => {
                if (error) {
                    console.log(error);
                }
                let account = accounts[0];
                App.contracts.ENSRegistry.deployed().then((instance) => {

                    return instance.setSubnodeOwner(0, web3.sha3('reverse'), accounts[0], { from: accounts[0] });
                }).then((result) => {
                    console.log("rootnode");
                    resolve(result)
                }).catch(function (err) {
                    console.log(err);
                });
            })
        })
    },
    setChildNode() {
        return new Promise((resolve, reject) => {
            web3.eth.getAccounts((error, accounts) => {
                if (error) {
                    console.log(error);
                }
                let account = accounts[0];
                App.contracts.ENSRegistry.deployed().then((instance) => {

                    return instance.setSubnodeOwner(App.namehash('reverse'), web3.sha3('addr'), '0xfe433d7479467b5684a54078c1027e74a13c98fb', { from: accounts[0] });
                }).then((result) => {
                    console.log("childnode");
                    resolve(result)
                }).catch(function (err) {
                    console.log(err);
                });
            })
        })
    },
    //registering works now... but name is registered on .eth while via console it is not . 
    showRegister: function (userName) {
        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.log(error);
            }
            account = accounts[0];
            console.log("this account: " + account);
            //  console.log(web3.sha3('haidedang'));
            App.contracts.ENSRegistry.deployed().then(function (instance) {
                ENSInstance = instance;
                return ENSInstance.owner.call((App.namehash(userName + '.eth')));
            }).then(function (result) {
                console.log(result);
                console.log("done");
            }).catch(function (err) {
                console.log("Fail");
            });
        })
    }
};

export default App