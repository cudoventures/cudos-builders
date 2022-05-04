# Overview

The goal of this project is to start a node connected to one of the cudos' networks.

You must create an SSH connection from a machine (<em>host computer</em>) to the machine where the node will be running (<em>target computer</em>).

All the executions below MUST happen on <em>target computer</em>. Nothing is executed on the <em>host computer</em> itself.

## Prerequirements on host computer

SSH Connection to the machine where tge CUDOS node will be running.

## Prerequirements on target machine

Enough free space to download network's database. <em>At lease 500GB is recommented.</em>

Docker must be installed

Docker-compose must be installed

JQ must be installed

Git must be installed

## Genesal usage

1. Connect to <em>target computer</em> using SSH
1. Clone cudos-builders repo somewhere (usually in your home directory)
```
git clone --branch cudos-master https://github.com/CudoVentures/cudos-builders.git CudosBuilders
```
3. Create config files according to **Config** section below
1. Execute the script according to **Usage** section below.

# Config

All of the config files are in ./client/config folder.

**Important: Do not leave any comments in any .env file**

## Env

Prepare the .env based on .env.example. It contains the following variables:

1. **PARAM_SOURCE_DIR:** A dir where repos were initially cloned during initial setup of the node, usually we use something like "/usr/cudos" <em>Example: PARAM_SOURCE_DIR="/usr/cudos"</em>
1. **PARAM_MODE:** the name of the node that is going to be started. Possible values are: seed-node, sentry-node or validator-node. <em>Example: PARAM_MODE="sentry-node"</em>
1. **PARAM_NETWORK:** The name of the network that node will be part of. Possible values are: testnet-public, testnet-private, dressrehearsal, local. The later is used only for dev purposes. <em>Example: PARAM_NETWORK="testnet-public"</em>

## Init

Prepare the init.env based on init.env.example. It contains the following variables:

1. **PARAM_MONIKER:** The name of your node. Use only english lowercase letters and "-". <em>Example: PARAM_MONIKER="my-first-node"</em>
1. **PARAM_MONITORING_ENABLED:** Indicates whether monitoring services will be connected to this node. <em>Example: PARAM_MONITORING_ENABLED="false"</em>
1. **PARAM_EXTERNAL_ADDRESS:** **Optional** Externally accessible address of your node. It must include a port 26656 as well. If port 26656 is redirected please specify the redirected port. <em>Example: PARAM_EXTERNAL_ADDRESS="1.2.3.4:26656"</em>

## Start

Prepare the start.env based on start.env.example. It contains the following variables:

1. **PARAM_PRIVATE_PEER_IDS:** **Optional** Indicated the list of node ids that must be kept private. Usually the validator's node id is put here if you have such. <em>Example: PARAM_PRIVATE_PEER_IDS="b7be7ed4cb265e052d89b4a6ea0b4aab512a1403"</em>
1. **PARAM_PERSISTENT_PEERS:** **Optional** List of comma separated triples (node id@ip:port). Each triples describes a connection endpoint. Set this only if you do not want to use the default values. Usually you do not want to use default while setting a clustered validator. <em>Example: PARAM_PERSISTENT_PEERS="b7be7ed4cb265e052d89b4a6ea0b4aab512a1403@1.2.3.4:26656,b7be7ed4cb265e052d89b4a6ea0b4aab512a1403@1.2.3.4:26656"</em>
1. **PARAM_VALIDATOR_MNEMONIC:** **Optional <sup>1</sup>** The mnemonic phrase of a validator wallet. It must have at least 2000001 CUDOS. <em>Example: PARAM_VALIDATOR_MNEMONIC="buzz silver junior gown when grow inmate motion legend spread penalty apple supply master badge setup adapt math turn mistake reject zebra all elite"</em>
1. **PARAM_STAKING_AMOUNT:** **Optional <sup>1</sup>** The amount that will be staked to your validator. It must be >= 2000000000000000000000000 acudos. You can stake your entire wallet's balance but 1000000000000000000 acudos that will be used for the staking transaction. <em>Example: PARAM_STAKING_AMOUNT="2000000000000000000000000"</em>
1. **KEYRING_OS_PASS:** **Optional <sup>1</sup>** The password of your keyring. It must be at least 8 characters. <em>Example: KEYRING_OS_PASS="11111111"</em>

**<sup>1</sup>** If you specify any of parameters from 2 to 4 inclusive then you must specify all of them.

# Usage

There are 2 scripts - <em>init</em> and <em>start</em>.

**Important**: The side effect of executing any of these scripts will be a folder, defined in PARAM_SOURCE_DIR at .env on <em>target computer</em>

**Important**: Execute these scripts in the specifig order specifing in the **launcher sequence** below

**Important**: All of the scripts below must be executed from ./client folder.

**Important**: Make sure that <em>./src/init.sh</em> and <em>./src/start.sh</em> have execute permission. 

## Init

The command initializes the node including its empty database, folders, etc..
```
sudo ./src/init.sh
```
## Start

The command starts the initialized node
```
sudo ./src/start.sh
```

## Launch sequence for creating a standalone node of any type

<em>Best for: Users that do not plan to have a validator or for a single validator node without seeds/sentries </em>

1. Connect to the <em>target machine</em> where the node will be running on.
1. Prepare the .env file as described in the section above
1. Prepare the init.env file as described in the section above
1. Execute Init command
1. Prepare the start.env. You can leave all the variable in it empty. 
1. Execute Start command

## Launch sequence for creating a clustered validator with its seeds/sentries

### Initialize the validator

1. Connect to the <em>target machine</em> where the validator will be running on.
1. Prepare the .env file as described in the section above
1. Prepare the init.env file as described in the section above
1. Execute Init command and copy the node id. It will be available in the console as a result of the execution of the Init command.

### Initialize and start seeds/sentries

1. Connect to the <em>target machine</em> where the node will be running on.
1. Prepare the .env file as described in the section above
1. Prepare the init.env file as described in the section above
1. Execute Init command and copy the node id. It will be available in the console as a result of the execution of the Init command.
1. Prepare the start.env. Set validator's node id to **PARAM_PRIVATE_PEER_IDS**.
1. Execute Start command

<em>Note:</em> Execute this step for any seed/sentry node that you would like to have. Usually a clustered validator must have at least a sentry and a seed.

### Start the validator

1. Connect to the <em>target machine</em> where the validator was initialized.
1. Prepare the start.env. Set validator's own node id to **PARAM_PRIVATE_PEER_IDS**. Set your sentries' triples (node id@ip:port) to **PARAM_PERSISTENT_PEERS** separated by commas. Set the rest of the three params as described in the **Config** section.
1. Execute Start command
