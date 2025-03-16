import json
import os
from web3 import Web3
from web3.middleware import geth_poa_middleware
from eth_account import Account

# Smart contract ABI and bytecode
CONTRACT_ABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": False,
        "inputs": [
            {
                "indexed": True,
                "internalType": "bytes32",
                "name": "agreementId",
                "type": "bytes32"
            },
            {
                "indexed": True,
                "internalType": "address",
                "name": "landlord",
                "type": "address"
            },
            {
                "indexed": True,
                "internalType": "address",
                "name": "tenant",
                "type": "address"
            }
        ],
        "name": "AgreementCreated",
        "type": "event"
    },
    {
        "anonymous": False,
        "inputs": [
            {
                "indexed": True,
                "internalType": "bytes32",
                "name": "agreementId",
                "type": "bytes32"
            },
            {
                "indexed": False,
                "internalType": "bool",
                "name": "status",
                "type": "bool"
            }
        ],
        "name": "AgreementStatusChanged",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_landlord",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_tenant",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_propertyDetails",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_rentAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_duration",
                "type": "uint256"
            }
        ],
        "name": "createAgreement",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_agreementId",
                "type": "bytes32"
            }
        ],
        "name": "getAgreement",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "landlord",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "tenant",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "propertyDetails",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "rentAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "duration",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isActive",
                        "type": "bool"
                    }
                ],
                "internalType": "struct RentAgreement.Agreement",
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
                "internalType": "bytes32",
                "name": "_agreementId",
                "type": "bytes32"
            },
            {
                "internalType": "bool",
                "name": "_status",
                "type": "bool"
            }
        ],
        "name": "updateAgreementStatus",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

CONTRACT_BYTECODE = "0x608060405234801561001057600080fd5b50610b9a806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80634903b0d114610046578063da82246e14610076578063f2a4a82e146100a6575b600080fd5b610060600480360381019061005b91906106e1565b6100d6565b60405161006d91906107b0565b60405180910390f35b610090600480360381019061008b91906107cb565b610327565b60405161009d91906108a0565b60405180910390f35b6100c060048036038101906100bb91906108bb565b610403565b6040516100cd91906109a0565b60405180910390f35b6100de6105e9565b6000808581526020019081526020016000206040518060e00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600282018054610199906109ea565b80601f01602080910402602001604051908101604052809291908181526020018280546101c5906109ea565b80156102125780601f106101e757610100808354040283529160200191610212565b820191906000526020600020905b8154815290600101906020018083116101f557829003601f168201915b50505050508152602001600382015481526020016004820154815260200160058201548152602001600682015460ff1615151515815250509050919050565b6000806000848152602001908152602001600020600601805460ff1916831515908117909155905060008381526020019081526020016000206040518060e00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600282018054610417906109ea565b80601f0160208091040260200160405190810160405280929190818152602001828054610443906109ea565b80156104905780601f1061046557610100808354040283529160200191610490565b820191906000526020600020905b81548152906001019060200180831161047357829003601f168201915b505050505081526020016003820154815260200160048201548152602001600582015481526020016006820154600f1615151515815250509050827f5424fbee04a4f2f1d08893c9f2c9a0c0c5d8f6638b68b2734c6aae1696470c4e83604051610500919061091b565b60405180910390a2505050565b60405180608001604052806040518060e00160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200160608152602001600081526020016000815260200160008152602001600015158152509052565b6040518060e00160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff1681526020016060815260200160008152602001600081526020016000815260200160001515815250905090565b60008135905061065a81610b36565b92915050565b60008135905061066f81610b4d565b92915050565b60008083601f84011261068b5761068a610a4b565b5b8235905067ffffffffffffffff8111156106a8576106a7610a46565b5b6020830191508360018202830111156106c4576106c3610a50565b5b9250929050565b6000813590506106da81610b64565b92915050565b6000602082840312156106f7576106f6610a5a565b5b600061070584828501610660565b91505092915050565b6000806040838503121561072557610724610a5a565b5b600061073385828601610660565b925050602061074485828601610660565b9150509250929050565b6000806000806060858703121561076757610766610a5a565b5b600061077587828801610660565b945050602061078687828801610660565b935050604085013567ffffffffffffffff8111156107a7576107a6610a55565b5b6107b387828801610675565b925092505092959194509250565b60006107ba8261093b565b6107c48185610946565b93506107d4818560208601610a17565b6107dd81610a5f565b840191505092915050565b6107f181610997565b82525050565b61080081610985565b82525050565b61080f81610985565b82525050565b61081e81610997565b82525050565b600061082f8261093b565b6108398185610946565b9350610849818560208601610a17565b61085281610a5f565b840191505092915050565b600061086882610946565b9150610873836109a3565b602082019050919050565b600060e08301600083015161089660008601826107f7565b5060208301516108a960206001860182610806565b50604083015184820360408601526108c18282610824565b91505060608301516108d6606086018261095c565b5060808301516108e9608086018261095c565b5060a08301516108fc60a086018261095c565b5060c083015161090f60c0860182610815565b508091505092915050565b600060208201905061092f6000830184610806565b92915050565b600081519050919050565b600082825260208201905092915050565b600061095682610975565b9050919050565b61096681610975565b82525050565b61097f81610a0d565b82525050565b600061099082610975565b9050919050565b60008115159050919050565b6000819050919050565b60006109ac82610985565b9050919050565b60006020820190506109c86000830184610976565b92915050565b60006109d982610985565b9050919050565b6000610a0682856108a0565b91508190509392505050565b6000819050919050565b60005b83811015610a35578082015181840152602081019050610a1a565b83811115610a44576000848401525b50505050565b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b610a7f816109ce565b8114610a8a57600080fd5b50565b610a9681610997565b8114610aa157600080fd5b50565b610aad81610975565b8114610ab857600080fd5b50565b610ac481610985565b8114610acf57600080fd5b50565b610adb81610a0d565b8114610ae657600080fd5b50565b610af281610997565b8114610afd57600080fd5b50565b610b0981610975565b8114610b1457600080fd5b50565b610b2081610985565b8114610b2b57600080fd5b50565b610b3781610a0d565b8114610b4257600080fd5b50565b610b4b81610997565b8114610b5657600080fd5b50565b610b6d81610975565b8114610b7857600080fd5b5056fea2646970667358221220d1c5e2e2c2a9e4e2c2a9e4e2c2a9e4e2c2a9e4e2c2a9e4e2c2a9e4e2c2a9e4e264736f6c63430008070033"

def deploy_contract(web3, private_key):
    """Deploy a new smart contract for rent agreements"""
    # Add PoA middleware for networks like Rinkeby, Goerli, etc.
    web3.middleware_onion.inject(geth_poa_middleware, layer=0)
    
    # Get account from private key
    account = Account.from_key(private_key)
    
    # Create contract instance
    RentAgreement = web3.eth.contract(abi=CONTRACT_ABI, bytecode=CONTRACT_BYTECODE)
    
    # Build transaction
    nonce = web3.eth.get_transaction_count(account.address)
    
    # Estimate gas
    gas_estimate = RentAgreement.constructor().estimate_gas({'from': account.address})
    
    # Get gas price
    gas_price = web3.eth.gas_price
    
    # Create transaction
    transaction = {
        'from': account.address,
        'nonce': nonce,
        'gas': int(gas_estimate * 1.2),  # Add 20% buffer
        'gasPrice': gas_price,
    }
    
    # Deploy contract
    contract_tx = RentAgreement.constructor().build_transaction(transaction)
    
    # Sign transaction
    signed_tx = web3.eth.account.sign_transaction(contract_tx, private_key)
    
    # Send transaction
    tx_hash = web3.eth.send_raw_transaction(signed_tx.rawTransaction)
    
    # Wait for transaction receipt
    tx_receipt = web3.eth.wait_for_transaction_receipt(tx_hash)
    
    # Return contract address
    return tx_receipt.contractAddress

def get_contract(web3, contract_address):
    """Get contract instance from address"""
    return web3.eth.contract(address=contract_address, abi=CONTRACT_ABI)

def create_agreement(web3, contract_address, landlord_address, tenant_address, property_details, rent_amount, duration, private_key):
    """Create a new rent agreement on the blockchain"""
    # Add PoA middleware for networks like Rinkeby, Goerli, etc.
    web3.middleware_onion.inject(geth_poa_middleware, layer=0)
    
    # Get account from private key
    account = Account.from_key(private_key)
    
    # Get contract instance
    contract = get_contract(web3, contract_address)
    
    # Build transaction
    nonce = web3.eth.get_transaction_count(account.address)
    
    # Convert rent amount to wei
    rent_amount_wei = web3.to_wei(rent_amount, 'ether')
    
    # Estimate gas
    gas_estimate = contract.functions.createAgreement(
        landlord_address,
        tenant_address,
        property_details,
        rent_amount_wei,
        duration
    ).estimate_gas({'from': account.address})
    
    # Get gas price
    gas_price = web3.eth.gas_price
    
    # Create transaction
    transaction = contract.functions.createAgreement(
        landlord_address,
        tenant_address,
        property_details,
        rent_amount_wei,
        duration
    ).build_transaction({
        'from': account.address,
        'nonce': nonce,
        'gas': int(gas_estimate * 1.2),  # Add 20% buffer
        'gasPrice': gas_price,
    })
    
    # Sign transaction
    signed_tx = web3.eth.account.sign_transaction(transaction, private_key)
    
    # Send transaction
    tx_hash = web3.eth.send_raw_transaction(signed_tx.rawTransaction)
    
    # Wait for transaction receipt
    tx_receipt = web3.eth.wait_for_transaction_receipt(tx_hash)
    
    # Get agreement ID from logs
    logs = contract.events.AgreementCreated().process_receipt(tx_receipt)
    agreement_id = logs[0]['args']['agreementId'].hex()
    
    return agreement_id

def verify_agreement(web3, contract_address, agreement_id):
    """Verify a rent agreement on the blockchain"""
    # Add PoA middleware for networks like Rinkeby, Goerli, etc.
    web3.middleware_onion.inject(geth_poa_middleware, layer=0)
    
    # Get contract instance
    contract = get_contract(web3, contract_address)
    
    # Get agreement data
    agreement = contract.functions.getAgreement(agreement_id).call()
    
    # Format agreement data
    agreement_data = {
        'landlord': agreement[0],
        'tenant': agreement[1],
        'property_details': agreement[2],
        'rent_amount': web3.from_wei(agreement[3], 'ether'),
        'duration': agreement[4],
        'timestamp': agreement[5],
        'is_active': agreement[6]
    }
    
    return agreement_data
