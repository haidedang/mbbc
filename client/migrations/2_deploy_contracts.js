
const ENS = artifacts.require("./ENSRegistry.sol"); 
const FIFSRegistrar = artifacts.require('./FIFSRegistrar.sol');
const Resolver = artifacts.require('./URLResolver.sol');

const web3 = new (require('web3'))();
const namehash = require('eth-ens-namehash');

/**
 * Calculate root node hashes given the top level domain(tld)
 *
 * @param {string} tld plain text tld, for example: 'eth'
 */
function getRootNodeFromTLD(tld) {
  return {
    namehash: namehash.hash(tld),
    sha3: web3.utils.sha3(tld)
  };
}

/**
 * Deploy the ENS and FIFSRegistrar
 *
 * @param {Object} deployer truffle deployer helper
 * @param {string} tld tld which the FIFS registrar takes charge of
 */
function deployFIFSRegistrar(deployer, tld) {
  var rootNode = getRootNodeFromTLD(tld);

  // Deploy the ENS first
  deployer.deploy(ENS)
    .then(()=> {
      // deploy the Resolve and bind it with ENS 
      return deployer.deploy(Resolver, ENS.address); 
    })
    .then(() => {
      // Deploy the FIFSRegistrar and bind it with ENS
      return deployer.deploy(FIFSRegistrar, ENS.address, rootNode.namehash);
    })
    .then(function() {
      // Transfer the owner of the `rootNode` to the FIFSRegistrar
      ENS.at(ENS.address).setSubnodeOwner('0x0', rootNode.sha3, FIFSRegistrar.address);
    });
}

module.exports = function(deployer) {
  var tld = 'eth'; 
  deployFIFSRegistrar(deployer, tld); 
};

