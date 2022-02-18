# Gravity module

## Config

**Orchestrator:**

Clone <em>orchestrator.env.example</em> to <em>orchestrator.mainnet.env</em>.  It contains the following variables:

1. **ADDRESS_PREFIX:** DO NOT MODIFY THIS VALUE. Leave it "cudos" as it is in the example.
1. **FEES:** The amount of fees, with acudos suffix, that are paid by the orchestrator when he iteracts with the blockchain. The value must be large enough to ensure that a transaction will be included by some validator in a block. <em>Example: FEES="1000acudos"</em>
1. **GRPC:** DO NOT MODIFY THIS VALUE. Leave it empty as it is in the example.
1. **ETHRPC:** Address to the ethereum full node. <em>Example: ETHRPC="http://43.14.14.12:8545"</em>
1. **CONTRACT_ADDR:** This is the gravity contract address. You can get the gravity smart contract address from the result of <em>./launcher/gravity.sh</em> (For more information when and how it can be executed see the readme of ./launcher folder)
1. **COSMOS_ORCH_MNEMONIC:** This is the mnemonic address of orchestrator's wallet. You can get one from <em>./launcher/exports/orchs.mnemonic</em> USE EACH MNEMONIC ONLY ONCE. DO NOT USE THE FIRST MNEMONIC FROM THE FILE, BECAUSE IT HAS ALREADY BEEN USED BY ROOT-VALIDATOR. In order to have these mnemonics you must execute <em>./launcher/gravity.sh</em> (For more information when and how it can be executed see the readme of ./launcher folder)
1. **ETH_PRIV_KEY_HEX:** The private key of the address defined in ORCH_ETH_ADDRESS of <em>validator.mainnet.env</em>. <em>Example: ETH_PRIV_KEY_HEX="ae1341352513513a7f9a9a7a9a9a08a6a4a5f6ea9204135f1f3e1a3b1dae413e"</em>

## Usage

Ensure that it has execute permission and then start the script from ./constructor folder

```bash
sudo ./src/gravity.sh <name_of_the_node (simillar to ./init and ./start)>
```