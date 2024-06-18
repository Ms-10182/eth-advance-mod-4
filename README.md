# Message System

 This fullstack code is made with the help of Solidity and designed a smart contract wallet for users using account abstraction. A simple wallet Factory contract is built which would create a smart contract wallet (not an EOA) at the backend and perform simple wallet operations like transfer of crypto from one wallet to another, fetching the wallet balances etc.

## Description
```EIP4337.sol``` is for UserOperation, ```Wallet.sol``` file is contract that will be deployed on runtime using ```WalletFactory.sol```.
In this project new wallet will be created for the user without the private key (EOA) at the backend. and user can perfrom the transaction and operations with this. we have few functions to test the contract. ```connect wallet``` to get the own wallet address, ```create wallet``` to create a new wallet from the contract. ```get wallet address``` to get the address of created wallet. ```checkBalance, trasnferfunds``` to check and transfer the funds and ```Execute operation``` to perform the user operations at the backend, here in this case we are doing ```nonce++```.

### steps of execution
1) open Remix ide and create ```wallet Folder```
2) upload ```EIP4337.sol, Wallet.sol, WalletFactory.sol``` into it and deploy the walletFactory.sol on sepolia test net.
3) copy the WalletFactory abi and paste in value of ```walletFactoryAbi``` in app.js, copy abi of Wallet.sol paste in value of ```walletAbi``` in app.js and copy the contract address fo walletFactory.sol in value of ```walletFactoryAddress```.
from vs code run the index.html using live server.

### Interaction
1) wallet will be pre connected, in case of failure Click connnect wallet to connect and get the address of meta mask.
2) click Create Wallet to create a new wallet, if already exist it will give error, 1 wallet per account is allowed.
3) click get wallet address to get the public address of generated wallet.
4) click check balance to get the balance. it will be 0, you can transfer some eth faucet to this public address. then its balance will be updated.
5) now you can send funds to any public address by entering the address and amount.
6) click execute operation to perfrom user operation that is nonce ++ in this case.

WARNING- nonce function is critical here, in backend after every user operation , nonce will increase by 1, so match the same with the app.js file. if the nonce dont match the it will give error. This will commomly happen if called the execute operation once and refresing the webpage. In that case you will have to manually set the nonce in app.js
