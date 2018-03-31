var MessageStore = artifacts.require("MessageStore");

module.exports = function(deployer) {
    deployer.deploy(MessageStore);
}