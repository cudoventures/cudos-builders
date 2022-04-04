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

All of the config files are in ./relayer/config folder.

**Important: Do not leave any comments in any .env file**


Prepare the .env based on .env.example. It contains the following variables:
1. **PARAM_SOURCE_DIR:** this is the dir on which the nodes home dir will be, usually we use something like "/usr/cudos" <em>Example: PARAM_SOURCE_DIR="/usr/cudos"</em>


Prepare the .relayer.env based on relayer.env.example. It contains the following variables:

1. **CREATE_CHANNEL:** Defines whether the channel between the two chains must be created. Usually it must be created only once when the relayer is started for the first name. All subsequent starts/rebuild MUST not create a channel. <em>Example: CREATE_CHANNEL="true"</em>
1. **REST_ENABLED:** Defines whether the relayer's REST API must be enabled. Currently it is not used but could be used in the future so settings it to true will be no harm. <em>Example: REST_ENABLED="true"</em>
1. **REST_HOST:** Defines the bind address of relayer's REST API. <em>Example: REST_HOST="127.0.0.1"</em>
1. **REST_PORT:** Defines the post of relayer's REST API. <em>Example: REST_PORT="3001"</em>
1. **TELEMETRY_ENABLED:** Defines whether the relayer's telemetry must be enabled. Currently it is not used but could be used in the future so settings it to true will be no harm. <em>Example: TELEMETRY_ENABLED="true"</em>
1. **TELEMETRY_HOST:** Defines the bind address of relayer's telemetry. <em>Example: TELEMETRY_HOST="127.0.0.1"</em>
1. **TELEMETRY_PORT:** Defines the post of relayer's telemetry. <em>Example: TELEMETRY_PORT="3001"</em>
1. **CHAIN_ID_0:** Defines the chain-id of the 1st chain. <em>Example: CHAIN_ID_0="cudos-1"</em>
1. **RPC_ADDR_0:** Defines the endpoint of RPC service of the 1st chain. You MUST escape the strings here. <em>Example: RPC_ADDR_0="http:\/\/127.0.0.1:26657"</em>
1. **GRPC_ADDR_0:** Defines the endpoint of GRPC service of the 1st chain. You MUST escape the strings here. <em>Example: GRPC_ADDR_0="http:\/\/127.0.0.1:9090"</em>
1. **WEBSOCKET_ADDR_0:** Defines the endpoint of RPC's websocket service of the 1st chain. You MUST escape the strings here. <em>Example: WEBSOCKET_ADDR_0="ws:\/\/127.0.0.1:26657\/websocket"</em>
1. **ACCOUNT_PREFIX_0:** Defines the account prefixes of the 1st chain. <em>Example: ACCOUNT_PREFIX_0="cudos"</em>
1. **GAS_PRICE_0:** Defines the gas prices of the 1st chain. <em>Example: GAS_PRICE_0="5000000000000"</em>
1. **GAS_DENOM_0:** Defines the gas prices' denom of the 1st chain. <em>Example: GAS_DENOM_0="acudos"</em>
1. **MNEMONIC_0:** Defines the account that will pay transactions costs of the 1st chain.
1. **TRUSTING_PERIOD_0:** Defines the trusting period of the 1st chain. It is good to be 2/3 of the unbonding period. <em>Example: TRUSTING_PERIOD_0="4hours"</em>
1. **CHAIN_ID_1:** Defines the chain-id of the 2nd chain. <em>Example: CHAIN_ID_1="cudos-1"</em>
1. **RPC_ADDR_1:** Defines the endpoint of RPC service of the 2nd chain. You MUST escape the strings here. <em>Example: RPC_ADDR_1="http:\/\/127.0.0.1:26657"</em>
1. **GRPC_ADDR_1:** Defines the endpoint of GRPC service of the 2nd chain. You MUST escape the strings here. <em>Example: GRPC_ADDR_1="http:\/\/127.0.0.1:9090"</em>
1. **WEBSOCKET_ADDR_1:** Defines the endpoint of RPC's websocket service of the 2nd chain. You MUST escape the strings here. <em>Example: WEBSOCKET_ADDR_1="ws:\/\/127.0.0.1:26657\/websocket"</em>
1. **ACCOUNT_PREFIX_1:** Defines the account prefixes of the 2nd chain. <em>Example: ACCOUNT_PREFIX_1="osmo"</em>
1. **GAS_PRICE_1:** Defines the gas prices of the 2nd chain. <em>Example: GAS_PRICE_1="0.0011"</em>
1. **GAS_DENOM_1:** Defines the gas prices' denom of the 2nd chain. <em>Example: GAS_DENOM_1="uosmo"</em>
1. **MNEMONIC_1:** Defines the account that will pay transactions costs of the 2nd chain.
1. **TRUSTING_PERIOD_1:** Defines the trusting period of the 2nd chain. It is good to be 2/3 of the unbonding period. <em>Example: TRUSTING_PERIOD_1="4hours"</em>

# Usage

There are 2 scripts.

**Important**: The side effect of executing any of these scripts will be a folder, defined in PARAM_SOURCE_DIR at .env.

**Launch sequence**: Execute these scripts only when all config files are ready. Follow the order below.
- First execute <em>validate</em> to ensure that the connection to IBC-enabled chain is fine
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
