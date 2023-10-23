export const ContractAddress = "0xE137DAA608A14E5C3Cf9C5aA3059AFe75F86D481";

export const ContractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_favoriteNumber",
				"type": "uint256"
			}
		],
		"name": "store",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "oldNumber",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "newNumber",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "addedNumber",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "storedNumber",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "retrieve",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]