# Phase 4 Step 3 instructions

If you executed Step 1 instructions and got the green light from the Cudos team you can proceed with setup of your seed and sentry nodes. After that you'll start all nodes and connect to the network.
## Prerequisites
Check all the needed prerequisites [here](./prerequisites.md).
## Setup of the sentry node

### Setup the environment
You need to have a local copy of our build tools.Create your main Cudos directory. On the first row you can define where all Cudos data will be stored.

```
export CUDOS_DIR="/usr/cudos"
mkdir $CUDOS_DIR

cd $HOME
git clone --branch cudos-master https://github.com/CudoVentures/cudos-builders.git CudosBuilders
cd CudosBuilders
```

You should copy the example configuration and setup all needed params
```
cp ./config/init.env.example ./config/init.env
```
The content of the init.env should be as follows:
```bash
PARAM_SOURCE_DIR="<CUDOS_DIR_PATH>"
```
The directory you create here should exist.

Time to fill the information for the node configuration. First copy the node.env.example and fill it in the next step.
```
cp ./config/node.env.example ./config/node.env
```
The content of the node.env should be:
```bash
MONIKER=<TYPE DOWN NODE NAME>
PERSISTENT_PEERS=<list of peers>
PRIVATE_PEERS=<validator node tendermint id>
SEEDS=<>

SHOULD_USE_GLOBAL_PEERS=true
SHOULD_USE_STATE_SYNC=false

TLS_ENABLED=false
TLS_DOMAIN= #required if TLS_ENABLED=true
TLS_DOCKER_PATH= #required if TLS_ENABLED=true

MONITORING_ENABLED=false

EXTERNAL_ADDRESS=
ADDR_BOOK_STRICT=true
```
For now we can leave the information about the peers empty

```
sudo ./src/init.sh sentry-node
```

If you executed this step correctly you should see the following log:
```shell
Processing arguments...OK
Processing variables...OK
Validating...OK
Cloning the repos...OK
Copying the .env files...OK
Preparing the binary builder...OK
Preparing the sentry-node...OK
Configurating the sentry-node...OK

This node ID is: 3c8b529b9eeef3a6240284ae5ca8d9add378674f
This node ID can be found at $CUDOS_DIR/CudosData/cudos-data-sentry-node-client-mainnet/tendermint.nodeid
This node ID could always be checked using cudos-noded tendermint show-node-id

You MUST NOT delete the constructor script nor the destination folder where node's data is. They will be used later on for starting the nodes.

Initialiazing...DONE
```
Note your node ID. You are going to need it for the next steps of the configuration.

## Setting up seed node
### Setup the environment
You need to have a local copy of our build tools.Create your main Cudos directory. On the first row you can define where all Cudos data will be stored.

```
export CUDOS_DIR="/usr/cudos"
mkdir $CUDOS_DIR

cd $HOME
git clone --branch cudos-master https://github.com/CudoVentures/cudos-builders.git CudosBuilders
cd CudosBuilders
```

You should copy the example configuration and setup all needed params
```
cp ./config/init.env.example ./config/init.env
```
The content of the init.env should be as follows:
```shell
PARAM_SOURCE_DIR="<CUDOS_DIR_PATH>"
```
The directory you create here should exist.

Time to fill the information for the node configuration:
```
cp ./config/node.env.example ./config/node.env
```
The content of the node.env should be:
```shell
MONIKER=<name of the node>
PERSISTENT_PEERS=
PRIVATE_PEERS=
SEEDS=

SHOULD_USE_GLOBAL_PEERS=true
SHOULD_USE_STATE_SYNC=false

MONITORING_ENABLED=false

EXTERNAL_ADDRESS=
ADDR_BOOK_STRICT=true

```
For now we can leave the information about the peers empty

```
sudo ./src/init.sh seed-node
```

If you executed this step correctly you should see the following log:

```shell
Processing arguments...OK
Processing variables...OK
Validating...OK
Cloning the repos...OK
Copying the .env files...OK
Preparing the binary builder...OK
Preparing the seed-node...OK
Configurating the seed-node...OK

This node ID is: a3831e25275f9f3a81e0d2a7c7b0d947bc6e4512
This node ID can be found at ${CUDOS_DIR}/CudosData/cudos-data-seed-node-client-mainnet/tendermint.nodeid
This node ID could always be checked using cudos-noded tendermint show-node-id

You MUST NOT delete the constructor script nor the destination folder where node's data is. They will be used later on for starting the nodes.

Initialiazing...DONE
```
Note your node ID. You are going to need it for the next steps of the configuration.

****

## Validator setup

If you successfully submitted your genesis in the previous step of Phase 4 your validator node is already initialized and setup. If you deleted your configuration contact Cudos team for support.
## Start the sentry and seed nodes

### Senty node

Parameters for the start node should be located in start.env file as follows:
```
PARAM_PERSISTENT_PEERS=""
PARAM_SEED="<seeds_tendermint_id>@<ip>:26656"
PARAM_PRIVATE_PEER_IDS="<validator_tendermint_id>@<ip>:26656"
PARAM_EXPOSE_IP="0.0.0.0"
```

```
sudo ./src/start.sh sentry-node
```
NOTE: There may be an error for the Resetting the sentry-node step.

### Seed node

Parameters for the start node should be located in start.env file as follows:
```
PARAM_PERSISTENT_PEERS=""
PARAM_SEED="<seeds_tendermint_id>@<ip>:26656"
PARAM_PRIVATE_PEER_IDS="<validator_tendermint_id>@<ip>:26656"
PARAM_EXPOSE_IP="0.0.0.0"
```

```
sudo ./src/start.sh seed-node
```
NOTE: There may be an error for the Resetting the seed-node step.

****
## Start the validator node

## Get the genesis

Once the Cudos team has setup their nodes and you've got the green light to continue with this step you need to make sure you have the correct genesis file. It should be located in the cudos-builders config folder. 

```
export CUDOS_DIR=/usr/cudos
cd $CUDOS_DIR/CudosBuilders
git pull
```

Make sure to check the checksum.
All the nodes listed bellow need to have the same genesis. Otherwise they won't be connected to the root validator. This step should be executed for every node in the cluster.

### Manual setup of genesis

If you want to manualy provide a genesis file for your nodes you need to place it in the <code>$CUDOS_DIR/CudosBuilders/docker/config/genesis.mainnet.json </code>. The CUDOS_DIR is the directory you specified in Step 1. This step should be executed for every node in the cluster.

If you have a list of peers you need to connect add their info to the <code>$CUDOS_DIR/CudosBuilders/docker/config/seeds.mainnet.config </code> and <code>$CUDOS_DIR/CudosBuilders/docker/config/persistent-peers.mainnet.config </code>


To start the validator edit once again the start.env

It should contain the following:
```
PARAM_PERSISTENT_PEERS="<sentry_tendermint_id@ip:26656>"
PARAM_SEED="<seed_tendermint_id@ip:26656>"
PARAM_EXPOSE_IP="0.0.0.0"
```
Now you can run
```
sudo ./src/start.sh clustered-validator-node
```

# Sucesful run of your nodes
If your node connected to the network but 2/3 of the voting power is not online your nodes will log something similar to:
<img src="./start-log.png">

Once 2/3 of the voting power is online the logs will print:

```
INF executed block height=1 module=state num_invalid_txs=0 num_valid_txs=0
INF commit synced commit=436F6D6D697449447B5B3131362032313920313338203838203232352031313720313534203233392031393420373620313734203137352038382031353020313020313837203138372032333820323137203238203233322031343120393020313838203135382034322035392032353220313237203835203235352038315D3A317D
INF committed state app_hash=74DB8A58E1759AEFC24CAEAF58960ABBBBEED91CE88D5ABC9E2A3BFC7F55FF51 height=1 module=state num_txs=0
INF indexed block height=1 module=txindex

```