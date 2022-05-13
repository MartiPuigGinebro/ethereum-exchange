// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Transactions {
    uint256 transactionCount;

    event Transfer(address indexed from, address indexed to, uint value, string message, uint256 timestamp, string keyword);

    struct TransferStruct {
        address from;
        address to;
        uint value;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransferStruct [] transfers;

    function addToBlock(address payable addressTo, uint amount, string memory message, string memory keyword) public {
        transactionCount ++;
        transfers.push(TransferStruct(addressTo, msg.sender, amount, message, block.timestamp, keyword));

        emit Transfer(addressTo, msg.sender, amount, message, block.timestamp, keyword);
    }

    function getAllTransfer() public view returns (TransferStruct[] memory) {
        return transfers;
    }

    function getTransferCount() public view returns (uint256) {
        return transactionCount;
    }
}
