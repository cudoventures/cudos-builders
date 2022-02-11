# Phase 4 Step 2 instructions

First define where you would like to store the Cudos configuration and scripts

```shell
export CUDOS_DIR="/usr/cudos"
mkdir $CUDOS_DIR
cd  $CUDOS_DIR
```
Now it's time to clone the CudosBuilders repository
```shell
git clone https://github.com/CudoVentures/cudos-builders.git CudosBuilders
cd CudosBuilders/tools-bash/constructor
```
The previous steps should be executed on each machine you are connected to.

##Validator setup
If you suceessfuly submited you genesis in the previous step of Phase 4 you're validator node is already initialized and
setup. If you deleted your configuration contact Cudos team for support.

## Setup of the sentry node
You should copy the example configuration and setup all needed params
```
mv ./config/init.env.example ./config/init.env
```
The content of the init.env should be as follows:
```azure
PARAM_SOURCE_DIR="$CUDOS_DIR/CudosData"
```
The directory you create here should exist.

Time to fill the information for the node configuration. Fist copy the node.env.example and fill it in the next step.
```
mv ./config/node.env.example ./config/node.env
```
The content of the node.env should be:
```azure
MONIKER=<TYPE DOWN NODE NAME>
PERSISTENT_PEERS=<list of peers>
PRIVATE_PEERS=<validator node configuration>
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
It's time to create the folder for the Cudos data.
```shell
mkdir $CUDOS_DIR/CudosData
```
You should copy the example configuration and setup all needed params
```
mv ./config/init.env.example ./config/init.env
```
The content of the init.env should be as follows:
```shell
PARAM_SOURCE_DIR="$CUDOS_DIR/CudosData"
```
The directory you create here should exist.

Time to fill the information for the node configuration:
```
mv ./config/node.env.example ./config/node.env
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
## Start the sentry and seed nodes

### Senty node

Paramethers for the start node should be located in start.env file as follows:
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

Paramethers for the start node should be located in start.env file as follows:
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

To start the validator edit once again the start.env

It should contain the following:
```
PARAM_PERSISTENT_PEERS="<sentry_tendermint_id@ip:26656>"
PARAM_SEED="<seed_tendermint_id@ip:26656>"
```
Now you can run
```
sudo ./src/start.sh clustered-validator-node
```