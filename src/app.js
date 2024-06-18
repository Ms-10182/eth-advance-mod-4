
const walletFactoryAbi = [
	{
		"inputs": [],
		"name": "createWallet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "walletAddress",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "WalletCreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getWalletAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "userWallets",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const walletAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "FundsDeposited",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "FundsTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "callData",
				"type": "bytes"
			}
		],
		"name": "OperationExecuted",
		"type": "event"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "sender",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "nonce",
						"type": "uint256"
					},
					{
						"internalType": "bytes",
						"name": "initCode",
						"type": "bytes"
					},
					{
						"internalType": "bytes",
						"name": "callData",
						"type": "bytes"
					},
					{
						"internalType": "uint256",
						"name": "callGasLimit",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "verificationGasLimit",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "preVerificationGas",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "maxFeePerGas",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "maxPriorityFeePerGas",
						"type": "uint256"
					},
					{
						"internalType": "bytes",
						"name": "paymasterAndData",
						"type": "bytes"
					},
					{
						"internalType": "bytes",
						"name": "signature",
						"type": "bytes"
					}
				],
				"internalType": "struct EIP4337.UserOperation",
				"name": "userOp",
				"type": "tuple"
			}
		],
		"name": "executeOperation",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nonce",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
];
const walletFactoryAddress = "0xf8710b79D1ce4BBe68f8BeD29C5420240804876b";

let provider;
let signer;
let walletFactoryContract;
let _nonce =0;
if (window.ethereum) {
    // Initialize ethers provider and signer
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    // Create a connection to the smart contract
    walletFactoryContract = new ethers.Contract(walletFactoryAddress, walletFactoryAbi, signer);
    console.log('Wallet connected');
} else {
    alert('No wallet found');
}

document.getElementById("connectButton").addEventListener("click", async () => {
    try {
        await ethereum.request({ method: 'eth_requestAccounts' });
        console.log(`Connected account: ${await signer.getAddress()}`);
        document.getElementById("output").innerText = `Connected: ${await signer.getAddress()}`;
    } catch (error) {
        console.error(error);
        alert('Failed to connect wallet');
    }
});

document.getElementById("createWalletButton").addEventListener("click", async () => {
    try {
        const tx = await walletFactoryContract.createWallet();
        await tx.wait();
        document.getElementById("output").innerText = `Wallet Created: ${tx.hash}`;
    } catch (error) {
        console.error(error);
        alert('Failed to create wallet');
    }
});

document.getElementById("getWalletAddressButton").addEventListener("click", async () => {
    try {
        const walletAddress = await walletFactoryContract.getWalletAddress(await signer.getAddress());
        document.getElementById("output").innerText = `Wallet Address: ${walletAddress}`;
        console.log(`wallet address: ${walletAddress}`);
    } catch (error) {
        console.error(error);
        alert('Failed to fetch wallet address');
    }
});

document.getElementById("checkBalanceButton").addEventListener("click", async () => {
    try {
        const walletAddress = await walletFactoryContract.getWalletAddress(await signer.getAddress());
        const walletContract = new ethers.Contract(walletAddress, walletAbi, provider);
        const balance = await walletContract.getBalance();
        document.getElementById("output").innerText = `Wallet Balance: ${ethers.utils.formatEther(balance)} ETH`;
    } catch (error) {
        console.error(error);
        alert('Failed to fetch wallet balance');
    }
});

document.getElementById("transferButton").addEventListener("click", async () => {
    try {
        const recipientAddress = document.getElementById("recipientAddress").value;
        const transferAmount = ethers.utils.parseEther(document.getElementById("transferAmount").value);
        const walletAddress = await walletFactoryContract.getWalletAddress(await signer.getAddress());
        const walletContract = new ethers.Contract(walletAddress, walletAbi, signer);
        const tx = await walletContract.transfer(recipientAddress, transferAmount);
        await tx.wait();
        document.getElementById("output").innerText = `Transferred ${ethers.utils.formatEther(transferAmount)} ETH to ${recipientAddress}`;
    } catch (error) {
        console.error(error);
        alert('Failed to transfer funds');
    }
});

document.getElementById("executeOperationButton").addEventListener("click", async () => {
    
    try {
        // Example parameters for EIP-4337 UserOperation
        const userOp = {
            sender: await signer.getAddress(),
            nonce: _nonce, // Replace with the appropriate nonce value
            initCode: "0x", // Example initCode
            callData: "0x", // Example callData
            callGasLimit: 500000, // Example gas limit
            verificationGasLimit: 200000, // Example verification gas limit
            preVerificationGas: 100000, // Example pre-verification gas
            maxFeePerGas: 10, // Example max fee per gas
            maxPriorityFeePerGas: 2, // Example max priority fee per gas
            paymasterAndData: "0x", // Example paymaster and data
            signature: "0x" // Example signature
        };
        _nonce++;

        const walletAddress = await walletFactoryContract.getWalletAddress(await signer.getAddress());
        const walletContract = new ethers.Contract(walletAddress, walletAbi, signer);

        // Execute the operation
        const tx = await walletContract.executeOperation(userOp);
        await tx.wait();

        document.getElementById("output").innerText = `Operation Executed: ${tx.hash}`;
    } catch (error) {
        console.error(error);
        alert('Failed to execute operation');
    }
});
