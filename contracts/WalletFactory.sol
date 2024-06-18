// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Wallet.sol";

contract WalletFactory {
    event WalletCreated(address indexed walletAddress, address indexed owner);

    mapping(address => address) public userWallets;

    function createWallet() public {
        require(userWallets[msg.sender] == address(0), "Wallet already exists for this user");

        Wallet newWallet = new Wallet(msg.sender);
        userWallets[msg.sender] = address(newWallet);

        emit WalletCreated(address(newWallet), msg.sender);
    }

    function getWalletAddress(address user) public view returns (address) {
        return userWallets[user];
    }
}
