var Registry = artifacts.require("./Registry.sol");
var Adoption = artifacts.require("./Adoption.sol")

module.exports = function(deployer) {
  deployer.deploy(Registry);
  deployer.deploy(Adoption);
};
