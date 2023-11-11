import { Address } from 'viem'

type ContractFunction = {
  inputs: Array<{
    indexed?: boolean;
    internalType: string;
    name: string;
    type: string;
  }>;
  name?: string;
  outputs?: Array<{
    internalType: string;
    name: string;
    type: string;
    components?: Array<{
      internalType: string;
      name: string;
      type: string;
    }>;
  }>;
  stateMutability: 'nonpayable' | 'view' | 'payable';
  type: 'function';
};

type ContractEvent = {
  anonymous: boolean;
  inputs: Array<{
    indexed: boolean;
    internalType: string;
    name: string;
    type: string;
  }>;
  name: string;
  type: 'event';
};

type ContractConstructor = {
  inputs: Array<{
    internalType: string;
    name: string;
    type: string;
  }>;
  stateMutability: 'nonpayable';
  type: 'constructor';
};

type ABIElement = ContractFunction | ContractEvent | ContractConstructor;

export const contract: { address: Address, abi: ABIElement[] } = {
  address: '0x5F8e9d267eA11fdEFC5b8D76EfAB89D20f805e4c' as Address,
  abi: [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [],
      "name": "ContractPaused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [],
      "name": "ContractResumed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes20",
          "name": "postHash",
          "type": "bytes20"
        }
      ],
      "name": "MarketInitialized",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "voter",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "RewardOrRefundClaimed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [],
      "name": "RewardsDistributed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [],
      "name": "StakesRefunded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "voter",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "enum MemesHouse.Vote",
          "name": "voteType",
          "type": "uint8"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "stake",
          "type": "uint256"
        }
      ],
      "name": "Voted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes20",
          "name": "postHash",
          "type": "bytes20"
        }
      ],
      "name": "VotingCancelled",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "MINIMUM_STAKE",
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
      "inputs": [
        {
          "internalType": "bytes20",
          "name": "postHash",
          "type": "bytes20"
        }
      ],
      "name": "cancelAndReturnFunds",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes20",
          "name": "postHash",
          "type": "bytes20"
        }
      ],
      "name": "claimRewardOrRefund",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes20",
          "name": "postHash",
          "type": "bytes20"
        }
      ],
      "name": "distributeStakes",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes20",
          "name": "postHash",
          "type": "bytes20"
        }
      ],
      "name": "getMarketState",
      "outputs": [
        {
          "internalType": "enum MemesHouse.MarketState",
          "name": "",
          "type": "uint8"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "votingEndTime",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "totalVoters",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "totalStake",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "mean",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "standardDeviation",
              "type": "uint256"
            },
            {
              "internalType": "int256",
              "name": "sumOfVotes",
              "type": "int256"
            },
            {
              "internalType": "int256",
              "name": "sumOfSquaredVotes",
              "type": "int256"
            },
            {
              "internalType": "bool",
              "name": "votingEnded",
              "type": "bool"
            },
            {
              "internalType": "address[]",
              "name": "voterAddresses",
              "type": "address[]"
            }
          ],
          "internalType": "struct MemesHouse.VotingMarket",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes20",
          "name": "postHash",
          "type": "bytes20"
        }
      ],
      "name": "getVoterAddressCount",
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
      "inputs": [
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        },
        {
          "internalType": "bytes20",
          "name": "postHash",
          "type": "bytes20"
        }
      ],
      "name": "getVotingDataByIndex",
      "outputs": [
        {
          "internalType": "address",
          "name": "_voterAddress",
          "type": "address"
        },
        {
          "components": [
            {
              "internalType": "enum MemesHouse.Vote",
              "name": "vote",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "stake",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "hasClaimedReward",
              "type": "bool"
            }
          ],
          "internalType": "struct MemesHouse.VotingData",
          "name": "_votingData",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes20",
          "name": "postHash",
          "type": "bytes20"
        }
      ],
      "name": "getVotingSummary",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "_totalVoters",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_totalStake",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_mean",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_standardDeviation",
          "type": "uint256"
        },
        {
          "internalType": "int256",
          "name": "_sumOfVotes",
          "type": "int256"
        },
        {
          "internalType": "int256",
          "name": "_sumOfSquaredVotes",
          "type": "int256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes20",
          "name": "postHash",
          "type": "bytes20"
        }
      ],
      "name": "initMarket",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes20",
          "name": "postHash",
          "type": "bytes20"
        }
      ],
      "name": "marketEnds",
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
      "inputs": [
        {
          "internalType": "bytes20",
          "name": "postHash",
          "type": "bytes20"
        }
      ],
      "name": "marketExists",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes20",
          "name": "",
          "type": "bytes20"
        }
      ],
      "name": "markets",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "votingEndTime",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalVoters",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalStake",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "mean",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "standardDeviation",
          "type": "uint256"
        },
        {
          "internalType": "int256",
          "name": "sumOfVotes",
          "type": "int256"
        },
        {
          "internalType": "int256",
          "name": "sumOfSquaredVotes",
          "type": "int256"
        },
        {
          "internalType": "bool",
          "name": "votingEnded",
          "type": "bool"
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
      "inputs": [],
      "name": "pauseContract",
      "outputs": [],
      "stateMutability": "nonpayable",
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
      "name": "pendingWithdrawals",
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
      "name": "resumeContract",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "enum MemesHouse.Vote",
          "name": "_vote",
          "type": "uint8"
        },
        {
          "internalType": "bytes20",
          "name": "postHash",
          "type": "bytes20"
        }
      ],
      "name": "vote",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
};
