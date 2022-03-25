# DRAFT

# Overview

The goal of this project is to start the relayer between two IBC-enabled chains

## Prerequirements 

The script MUST be executed on the machine where the relayer will operarate.

Docker must be installed

Docker-compose must be installed

Git must be installed

Curl must be installed

# Config

All of the config files are in ./laucher/config folder.

**Important: Do not leave any comments in any .env file**


Prepare the .env based on .env.example. It contains the following variables:
1. **PARAM_SOURCE_DIR:** this is the dir on which the nodes home dir will be, usually we use something like "/usr/cudos" <em>Example: PARAM_SOURCE_DIR="/usr/cudos"</em>


Prepare the .relayer.env based on relayer.env.example. It contains the following variables:

**Validator:**

Clone <em>validator.env.example</em> to <em>validator.mainnet.env</em> (The actual name could be arbitrary because the absolute filename to this file is specified below in the configuration). It contains the following variables:
1. **MONIKER:** The name of the node. You could safely use the default value provided in the .example file. <em>Example: MONIKER="cudos-root-node-mainnet"</em>
1. **CHAIN_ID:** The id of the chain. DO NOT MODIFY THIS VALUE. Leave it "cudos-1" as it is in the example.
1. **ORCH_ETH_ADDRESS:** The ETH address of the the wallet that will be used by the orchestrator. <em>Example: ORCH_ETH_ADDRESS="0x582436824932f3b313e3a3b3d3e31413be6d6a"</em>
1. **MONITORING_ENABLED:** This variable defined whether the code will export data to port 26660 for prometheus. If the monitoring is disabled the port 26660 will be closed, otherwise it will be opened to the internal private interface. <em>Example: MONITORING_ENABLED="false"</em>
1. **ADDR_BOOK_STRICT:** This defines the behaviour of the internal address book. DO NOT MODIFY THIS VALUE. Leave it "true" as it is in the example.
1. **GRAVITY_MODULE_BALANCE:** DO NOT MODIFY THIS VALUE. Leave it "0" as it is in the example.
1. **CUDOS_TOKEN_CONTRACT_ADDRESS:** The address of the CUDOS token contract. <em>Example: CUDOS_TOKEN_CONTRACT_ADDRESS="0x12d474723cb8c02bcbf46cd335a3bb4c75e9de44"</em>
1. **NUMBER_OF_VALIDATORS:** The number of validator accounts that will be initialized with the primary-validator. DO NOT MODIFY THIS VALUE. Leave it "1" as it is in the example.
1. **NUMBER_OF_ORCHESTRATORS:** The number of orchestrator accounts that will initialized with the primary-validator. The default value is 3 <em>Example: NUMBER_OF_ORCHESTRATORS="3"</em>
1. **VALIDATOR_BALANCE:** The amount of staked tokens that each genesis validator will have. <em>Example: VALIDATOR_BALANCE="2000000000000000000000000"</em>
1. **ORCHESTRATOR_BALANCE:** This is the balance that each orchestrator will have. <em>Example: ORCHESTRATOR_BALANCE="1000000000000000000"</em>
1. **FAUCET_BALANCE:** The balance of the faucet. If set to 0 then no faucet will be created. <em>Example: FAUCET_BALANCE="8000000000000000000000000000"</em>
1. **KEYRING_OS_PASS:** The password of your keyring. It must be at least 8 characters. <em>Example: KEYRING_OS_PASS="11111111"</em>

**Seed:**

Clone <em>seed.env.example</em> to <em>seed.mainnet.env</em> (The actual name could be arbitrary because the absolute filename to this file is specified below in the configuration). It contains the following variables:

1. **MONIKER:** The name of the node. You could safely use the default value provided in the .example file. <em>Example: MONIKER="cudos-seed-node-mainnet-01"</em>
1. **PERSISTENT_PEERS:** DO NOT MODIFY THIS VALUE. Leave it empty as it is in the example.
1. **PRIVATE_PEERS:** DO NOT MODIFY THIS VALUE. Leave it empty as it is in the example.
1. **SEEDS:** DO NOT MODIFY THIS VALUE. Leave it empty as it is in the example.
1. **SHOULD_USE_GLOBAL_PEERS:** DO NOT MODIFY THIS VALUE. Leave it "false" as it is in the example.
1. **SHOULD_USE_STATE_SYNC:** DO NOT MODIFY THIS VALUE. Leave it "false" as it is in the example.
1. **MONITORING_ENABLED:** This variable defined whether the code will export data to port 26660 for prometheus. If the monitoring is disabled the port 26660 will be closed, otherwise it will be opened to the internal private interface. <em>Example: MONITORING_ENABLED="false"</em>
1. **EXTERNAL_ADDRESS:** This variable defines the address to advertise to peers for them to dial. It must be the public address of the node plus the 26656 (or any other external number that could be redirected to internal port 26656) port. <em>Example: EXTERNAL_ADDRESS="43.14.14.12:26656"</em>
1. **ADDR_BOOK_STRICT:** This defines the behaviour of the internal address book. DO NOT MODIFY THIS VALUE. Leave it "true" as it is in the example.

**Sentry:**

Clone <em>sentry.env.example</em> to <em>sentry.mainnet.env</em> (The actual name could be arbitrary because the absolute filename to this file is specified below in the configuration). It contains the following variables:

1. **MONIKER:** The name of the node. You could safely use the default value provided in the .example file. <em>Example: MONIKER="cudos-sentry-node-mainnet-01"</em>
1. **PERSISTENT_PEERS:** DO NOT MODIFY THIS VALUE. Leave it empty as it is in the example.
1. **PRIVATE_PEERS:** DO NOT MODIFY THIS VALUE. Leave it empty as it is in the example.
1. **SEEDS:** DO NOT MODIFY THIS VALUE. Leave it empty as it is in the example.
1. **SHOULD_USE_GLOBAL_PEERS:** DO NOT MODIFY THIS VALUE. Leave it "false" as it is in the example.
1. **SHOULD_USE_STATE_SYNC:** DO NOT MODIFY THIS VALUE. Leave it "false" as it is in the example.
1. **TLS_ENABLED**: DO NOT MODIFY THIS VALUE. Leave it "false" as it is in the example.
1. **MONITORING_ENABLED:** This variable defined whether the code will export data to port 26660 for prometheus. If the monitoring is disabled the port 26660 will be closed, otherwise it will be opened to the internal private interface. <em>Example: MONITORING_ENABLED="false"</em>
1. **EXTERNAL_ADDRESS:** This variable defines the address to advertise to peers for them to dial. It must be the public address of the node plus the 26656 (or any other external number that could be redirected to internal port 26656) port. <em>Example: EXTERNAL_ADDRESS="43.14.14.12:26656"</em>
1. **ADDR_BOOK_STRICT:** This defines the behaviour of the internal address book. DO NOT MODIFY THIS VALUE. Leave it "true" as it is in the example.

**Orchestrator:**

Clone <em>orchestrator.env.example</em> to <em>orchestrator.mainnet.env</em> (The actual name could be arbitrary because the absolute filename to this file is specified below in the configuration). It contains the following variables:

1. **ADDRESS_PREFIX:** DO NOT MODIFY THIS VALUE. Leave it "cudos" as it is in the example.
1. **FEES:** The gas price, with acudos suffix, that are paid by the orchestrator when he iteracts with the blockchain. The value must be >= than minimum gas price which is 5*1E12 <em>Example: FEES="5000000000000acudos"</em>
1. **GRPC:** DO NOT MODIFY THIS VALUE. Leave it empty as it is in the example.
1. **ETHRPC:** Address to the ethereum full node. <em>Example: ETHRPC="http://43.14.14.12:8545"</em>
1. **CONTRACT_ADDR:** DO NOT MODIFY THIS VALUE. Leave it empty as it is in the example.
1. **COSMOS_ORCH_MNEMONIC:** DO NOT MODIFY THIS VALUE. Leave it empty as it is in the example.
1. **ETH_PRIV_KEY_HEX:** The private key of the address defined in ORCH_ETH_ADDRESS of <em>validator.mainnet.env</em>. <em>Example: ETH_PRIV_KEY_HEX="ae1341352513513a7f9a9a7a9a9a08a6a4a5f6ea9204135f1f3e1a3b1dae413e"</em>

# Usage

There are 2 scripts.

**Important**: The side effect of executing any of these scripts will be a folder, defined in PARAM_SOURCE_DIR at .env, on each machine defined in topology.json

**Launch sequence**: Execute these scripts only when all config files are ready. Follow the order below.
- First execute <em>validate</em> to ensure that the connection to peers is fine
- Second execute <em>relayer</em> to start the relayer


**Validate**: It validates the connection from current machine to IBC-enabled chains and also checks for software requirements, params, etc.

Ensure that it has execute permission and then start the script from ./relayer folder

```bash
./src/validate.sh
```

**Launcher**: It starts the relayer

Ensure that it has execute permission and then start the script from ./relayer folder

```bash
sudo ./src/relayer.sh
```
