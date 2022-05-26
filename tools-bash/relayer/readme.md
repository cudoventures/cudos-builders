# Overview

The goal of this project is to manage the relayer between two IBC-enabled chains.

You must create an SSH connection from a machine (<em>host computer</em>) to the machine where the relayer is running (<em>target computer</em>).

All the executions below MUST happen on <em>target computer</em>. Nothing is executed on the <em>host computer</em> itself.

## Prerequirements on host computer

SSH Connection to the machine where a CUDOS node is running

## Prerequirements on target machine

Docker must be installed

Docker-compose must be installed

Git must be installed

Curl must be installed

## General usage

### Start

1. Clone cudos-builders repo somewhere (usually in your home directory)
```
git clone --branch v0.9.0 https://github.com/CudoVentures/cudos-builders.git CudosBuilders
```
2. Create config files according to **Config** section below
2. Execute the script according to **Usage** section below

### Upgrade

**This script MUST only be used if the network upgrade includes a <a href="https://docs.cosmos.network/master/ibc/upgrades/quick-guide.html">IBC-breaking change</a>. Otherwise the relayer must not be upgraded.**

1. Connect to <em>target computer</em> using SSH
1. Attach shell to the relayer's docker instance.
    
    In order to attach a shell you must first get the container's id. You can do it by listing all running docker containers and then search for hermer container.
    ```
    sudo docker container ls
    ```
    Then you can attach a shell
    ```
    sudo docker container exec -it <id> /bin/bash
    ```

1. Create a <em>ibc-upgrade</em> proposal (not a <em>software upgrade</em> proposal).

    - **[This step is executed on the osmosis node]**: Get client state from the osmosis-node using the script below. Set the correct **newChainId** and **upgradeHeight**.
    ```
    newChainId="cudos-2"
    upgradeHeight="550"
    revisionNumber="${newChainId##*-}"
    <daemon name> q ibc client state <client id> --output json | jq ".client_state" | jq ".latest_height.revision_number= \"$revisionNumber\"" | jq ".chain_id = \"$newChainId\"" | jq ".latest_height.revision_height= \"$upgradeHeight\""
    ```

    - **[This step is saving data from osmosis node to cudos node]**: Copy the result of the above script to a file on a machine where the node where you will make the ibc-upgrade proposal from is running. The docs below will assume that you've save the client state to the file /tmp/state.json but you can use any location you want.

    - **[This step is executed on the cudos node]**: Create the proposal

    ```
    upgradeName="network-upgrade"
    upgradeHeight="550"
    pathToState="/tmp/state.json"
    description="Upgrade the network"
    cudos-noded tx gov submit-proposal ibc-upgrade "$upgradeName" $upgradeHeight "$pathToState" --deposit 50000000000000000000000acudos --title "$upgradeName" --description "$description" --from validator-1 --chain-id cudos-1 --gas-prices 5000000000000acudos -y
    ```
1. Wait the network to reach the upgrade height. It will stop at that point. 

1. Upgrade IBC client

    The easiest way to upgrade the client is by using the hermes relayer itself.
    ```
    hermes upgrade client <current osmosis chain id> <client id of upgradable network on osmosis>
    ```
1. Stop the Hermes docker
1. Now you can continue with the upgrading of your node(s) and gravity (if applicable).
1. Clone cudos-builders repo somewhere (usually in your home directory)
```
git clone --branch v0.9.0 https://github.com/CudoVentures/cudos-builders.git CudosBuilders
```
1. Create config files according to **Config** section below
1. Execute the script according to **Usage** section below

# Config

All of the config files are in ./relayer/config folder.

**Important: Do not leave any comments in any .env file**

Prepare the .env based on .env.example. It contains the following variables:
1. **PARAM_SOURCE_DIR:** this is the dir on which the nodes home dir will be, usually we use something like "/usr/cudos" <em>Example: PARAM_SOURCE_DIR="/usr/cudos"</em>

Prepare the .relayer.env based on relayer.env.example. It contains the following variables:

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

There are 3 scripts - <em>start</em>, <em>validate</em> and <em>upgrade</em>.

**Important**: The side effect of executing any of these scripts will be a folder, defined in PARAM_SOURCE_DIR at .env on <em>target computer</em>

**Important**: Execute these scripts only when all config files are ready.

**Important**: All of the scripts below must be executed from ./upgrade folder.

**Important**: Make sure that <em>./src/start.sh</em>, <em>./src/validate.sh</em> and <em>./src/upgrade.sh</em> have execute permission. 

## Validate 

It validates the connection from current machine to IBC-enabled chains and also checks for software requirements, params, etc.

```bash
./src/validate.sh
```

## Start

It starts the relayer

```bash
sudo ./src/start.sh
```

## Upgrade

It upgrades the relayer

```bash
sudo ./src/upgrade.sh
```

## Launch sequence

1. Validate

2. Start or Upgrade

    <em>Notes:</em> 

    - Execute start only if you are starting a relayer for the first time on a newly created network
    - Execute upgrade only after CUDOS network, that the relayer is connected to, is halted due to **ibc-upgrade** proposal AND the IBC client has been upgraded (See Usage **General usage** section).

