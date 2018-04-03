pragma solidity ^0.4.17;

contract MessageStore {

    mapping(uint => address) public recipients;
    mapping(uint => bytes32) public postBox;
    uint[] public msgDates;

    //allows storage of messages
    function storeMsg(bytes32 mail, uint date, address recipient) public returns(bool) {
        //possibly adjust in the future to 
        recipients[date] = recipient;
        postBox[date] = mail;
        return true;
    }

    function getAvailableMsgDates() public view returns (uint[]) {
        return msgDates;
    }
    function test() public view returns (bytes32) {
        return "sup";
    }

    function getRecipient(uint date) public view returns (address) {
        return recipients[date];
    }

    function getMsg(uint date) public view returns (bytes32) {
        require(date < block.timestamp);
        return postBox[date];
    }
}