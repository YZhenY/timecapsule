pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/MessageStore.sol";

contract TestMessageStore {
    MessageStore messageStore = MessageStore(DeployedAddresses.MessageStore());
    
    function testStoreFunc() public {
        bool storedOrNot = messageStore.storeMsg("test, PAOPAO ON THE BL", 1521504000, this);
        bool stored2 =  messageStore.storeMsg("test, YUEYUE ON THE BL", 1522540800, this);

        Assert.equal(storedOrNot, true, "Message should be test...." );
        Assert.equal(stored2, true, "Message should be test2...." );
    }

    function testRecipient() public {
        address expectedRecipeient = this;

        address test1 = messageStore.getRecipient(1521504000);
        address test2 = messageStore.getRecipient(1522540800);

        Assert.equal(test1, expectedRecipeient, "Should see recipient as this");
        Assert.equal(test2, expectedRecipeient, "Should see recipient2 as this");
    }

    function testMsgGet() public {
        bytes32 test1 = messageStore.getMsg(1521504000);
        // bytes32 test2 = messageStore.getMsg(1522540800);
        Assert.equal(test1, "test, PAOPAO ON THE BL" , "PAO PAO SHOULD BE ON THE BL");
        // Assert.notEqual(test2, "test, YUEYUE ON THE BL" , "YUEYUE SHOULD NOT BE ON THE BL");
    }
}