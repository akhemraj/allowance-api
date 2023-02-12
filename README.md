# allowance-api
APIs to fetch and update ERC20 token allowances

## Requirements
- Node 18
- npm 8+
- Inufra project key
- Etherscan API key

## How to run API server?
- Add .env file in src/config, check src/config/.env.example for reference
- First install the dependencies
    ``` npm i```
- Then to run, use command:
    ``` npm run```
 (or) 
To run in dev mode
    ``` npm run dev```
- Call APIs on local server at: http://localhost:30000
### APIs:
1. To get the ERC20 token allowances  
    -  Request: ***GET /api/allowances/{walletAddress}***
    -  Response:
        ```
            [{
                "contractAddress": <erc20_contract_address>,
                "spender": <spender_to_whom_allowance_is_given>,
                "allowance": <allowance_amount>
            }, ... ]
2. To update the ERC20 token allowances to 0
    -  It is not possible to update the allowance to 0 without Wallet Owner's signed transaction, just using API to update the allowance without Private key is not possible with standard ERC20 contract. Hence, Private Key is added in the env.

    -  Request: ***POST /api/allowances/update/{walletAddress}***
    -  Response:
        ```
            [trxReceipt1,trxReceipt2 ... ]
    <br />
    -  To make it non-custodial, either DApp with Frontend can be used, where access to wallet like Metamask can be given and signed trasaction can be sent to API. This signed transaction can be relayed to blockchain directly by backend server using trusted forwarders (example: Biconomy Forwarders).
