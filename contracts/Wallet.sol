// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./EIP4337.sol";

contract Wallet {
    address public owner;
    uint256 public nonce;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the wallet owner");
        _;
    }

    event FundsDeposited(address indexed from, uint256 amount);
    event FundsTransferred(address indexed to, uint256 amount);
    event OperationExecuted(address indexed sender, bytes callData);

    constructor(address _owner) {
        owner = _owner;
        nonce = 0;
    }

    receive() external payable {
        emit FundsDeposited(msg.sender, msg.value);
    }

    function transfer(address payable _to, uint256 _amount) public onlyOwner {
        require(address(this).balance >= _amount, "Insufficient balance");
        _to.transfer(_amount);
        emit FundsTransferred(_to, _amount);
    }

    function executeOperation(EIP4337.UserOperation memory userOp) public {
        require(userOp.sender == owner, "Operation not from wallet owner");
        require(userOp.nonce == nonce, "Invalid nonce");

        (bool success, ) = address(this).call{gas: userOp.callGasLimit}(userOp.callData);
        require(success, "Operation failed");

        nonce++;
        emit OperationExecuted(userOp.sender, userOp.callData);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
