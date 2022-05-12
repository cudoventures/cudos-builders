---
title: Local Network - Validator Cluster Build
---
# Guide Overview
::: warning Note
This guide is only intended for testing purposes on a local envrionment and should not be used for testnet/mainet envrionments.
It has been tested on version 0.5.0 of CudosNode, GravityBridge and CudosBuiders
:::
The purpose of this guide is show how to setup a local network consisting of one root validator with one sentry and seed node

# Node Environment Preparation


This section will take you through preparing the environment on your nodes in preparation for running the Cudos software. You must complete the following two steps on every node that will take part in the Cudos network:

- Install required packages
- Build the node images

 
## Install required packages
You must ensure that you have the following installed:

**Docker 20.10.6 or above (latest version recommended)**
Refer to the [Docker installation and upgrade guide](https://docs.docker.com/engine/install/) for your OS.
 
**Docker Compose 1.29.1 or above (latest version recommended)**
Refer to the [Docker Compose Installation and Upgrade guide](https://docs.docker.com/compose/install/) for your OS.
 
**Git**
Refer to the [Git installation guide](https://github.com/git-guides/install-git) for your OS.
 
**JQ**
JQ is a command line JSON processor that you will use to extract data from JSON documents. Refer to the [JQ installation guide](https://stedolan.github.io/jq/download/) for your OS.

## Build the node images
After installing all prerequisites, you can build the Cudos node images. 

::: tip
This document describes installing the platform as root. It is also possible to install the platform as a non-root user using sudo.
:::

1. Change to root user and create a directory to use as your workspace (we will assume you call the directory `cudos`)

```
sudo -i
mkdir /var/lib/cudos
```
 
2. Make sure that you are in the correct directory 
```
cd /var/lib/cudos
```

Clone the correct branches from the [CudosNode](https://github.com/CudoVentures/cudos-node) , [CudosBuilders](https://github.com/CudoVentures/cudos-builders), and [CudosGravityBridge](https://github.com/CudoVentures/cosmos-gravity-bridge) repositories, renaming the folders *CudosNode*, *CudosBuilders*, and *CudosGravityBridge*:

```
git clone --depth 1 --branch v0.5.0 https://github.com/CudoVentures/cudos-node.git CudosNode
git clone --depth 1 --branch v0.5.0  https://github.com/CudoVentures/cudos-builders.git CudosBuilders
git clone --depth 1 --branch v0.5.0 https://github.com/CudoVentures/cosmos-gravity-bridge.git CudosGravityBridge
```

Navigate to the `CudosBuilders/docker/binary-builder` directory
```
cd CudosBuilders/docker/binary-builder 
```

Build the docker image of the binary by running the command:
```
docker-compose --env-file binary-builder.arg -f binary-builder.yml -p cudos-binary-builder up --build --detach
```

You have now prepared your node environment and can proceed building a local network.



# Validator Cluster Build

The Validator Cluster is a cluster of Cudos nodes that can be configured as *Validator*, *Seed*, or *Sentry* nodes.
 
## Cluster Build procedure

### 1. Initialize your Validator Node


You will apply basic values to your root Validator’s .env file, initialise  and start it

#### 1. As root, navigate to the directory `/var/lib/cudos/CudosBuilders/docker/root-node`:
```
sudo -i
cd /var/lib/cudos/CudosBuilders/docker/root-node
```

#### 2. Create a copy of `root-node.env.example`, naming the copy `root-node.local.env `
```
cp root-node.env.example root-node.local.env
```

#### 3. Open the file `root-node.local.env`.
- Set the `MONIKER` attribute to your desired name:
```
MONIKER=<your-root-node-moniker>
```
- Set the flag `SHOULD_USE_GLOBAL_PEERS` to `false`:
```
SHOULD_USE_GLOBAL_PEERS=false
```
- Populate these other variables as follow:
```
CHAIN_ID="cudos-local-network"
ORCH_ETH_ADDRESS=0x41D0B5762341B0FCE6aDCCF69572c663481C7286
MONITORING_ENABLED="true"
ADDR_BOOK_STRICT="false"
GRAVITY_MODULE_BALANCE="10000000000000000000000000000"
CUDOS_TOKEN_CONTRACT_ADDRESS="0x28ea52f3ee46CaC5a72f72e8B3A387C0291d586d"
NUMBER_OF_VALIDATORS="3"
NUMBER_OF_ORCHESTRATORS="3"
VALIDATOR_BALANCE="2000000000000000000000000"
ORCHESTRATOR_BALANCE="1000000000000000000000000"
FAUCET_BALANCE="20000000000000000000000000000"
KEYRING_OS_PASS="123123123"
```
#### 4. Make sure that you are still in the correct directory `/var/lib/cudos/CudosBuilders/docker/root-node`, and *Initialize* the node by running this command:
```
sudo docker-compose --env-file root-node.local.arg -f init-root-node.yml -p cudos-init-root-node up --build
```

If all steps are completed successfully, you should see a newly generated file: 
`/var/lib/cudos/CudosData/cudos-data-root-node/tendermint.nodeid`
that contains your **node ID**, consisting of a long string of random characters.

#### 5. Make sure that you are still in the correct directory `/var/lib/cudos/CudosBuilders/docker/root-node`, and *Start* the root validator node by running this command:
```
docker-compose --env-file ./root-node.local.arg -f ./start-root-node.yml -p cudos-start-root-node up --build --detach
```

If all steps are completed successfully you should have a running validator node
 
 ### 2. Add config files and copy local genesis.json to config folder.
 #### 1. As root, navigate to the directory `/var/lib/cudos/CudosBuilders/docker/config`:
 ```
    sudo -i
    cd /var/lib/cudos/CudosBuilders/docker/config
```
#### 2. Create 3 new files as follows and leave them empty:
```
touch persistent-peers.local.config
touch seeds.local.config
touch state-sync-rpc-servers.local.config
```
#### 3. Copy the genesis from the root node to this folder:
```
cp /var/lib/cudos/CudosData/cudos-data-root-node/config/genesis.json /var/lib/cudos/CudosBuilders/docker/config/genesis.local.json
```

### 3. Initialise and start your Sentry and Seed nodes

### Sentry


#### 1. As root, navigate to the directory `/var/lib/cudos/CudosBuilders/docker/sentry-node`
```
sudo -i
cd /var/lib/cudos/CudosBuilders/docker/sentry-node
```

#### 2. Create a copy of `sentry-node.env.example`, naming the copy `sentry-node.client.local01.env`

```
cp sentry-node.env.example sentry-node.local01.env
```

#### 3. Open the file, `sentry-node.client.local01.env`. 

- Set the `MONIKER` (your node’s name on the blockchain) attribute to your desired name:

```
MONIKER=<your-sentry-node-moniker>
```
- Set `SHOULD_USE_GLOBAL_PEERS` to `false` :

``` 
SHOULD_USE_GLOBAL_PEERS=false
```

- Configure the `PERSISTANT_PEERS` list with the node ID of your root validator

```
PERSISTANT_PEERS=<root-validator1-id@ip:port>
example: e4da73c45e1d31ecf92fb2152661ba58a3b548e1@cudos-start-root-node:26656
```

- Configure the `PRIVATE_PEERS` list with the node ID of your root validator

```
PRIVATE_PEERS=<root-validator1-id>
```
Save and Exit
 
#### 4. Make sure that you are still in the correct directory `/var/lib/cudos/CudosBuilders/docker/sentry-node`, and *Initialize* the node by running this command:
```
 docker-compose --env-file ./sentry-node.client.local01.arg -f ./init-sentry-node.yml -p cudos-init-sentry-node-client-local-01 up --build
```
If all steps are completed successfully, you should see a newly generated file: `/var/lib/cudos/CudosData/cudos-data-sentry-node-client-local-01/tendermint.nodeid` that contains your **node ID**, consisting of a long string of random characters.

#### 5. *Start* your node
```
docker-compose --env-file ./sentry-node.client.local01.arg -f ./start-sentry-node.yml -p cudos-start-sentry-node-client-local-01 up --build --detach
```

If all steps are completed successfully, you should have a new container with a running sentry node infront of the root-validator node


### Seed

#### 1. As root, navigate to the directory `/var/lib/cudos/CudosBuilders/docker/seed-node`
```
sudo -i
cd /var/lib/cudos/CudosBuilders/docker/seed-node
```

#### 2. Create a copy of seed-node.env.example, naming the copy seed-node.client.local01.env 
```
cp seed-node.env.example seed-node.client.local01.env
```
#### 3. Open the file `seed-node.client.local01.env` 

- Set the `"MONIKER"` attribute to your desired name:
```
MONIKER=<your-seed-node-moniker>
```
- Set the flag `"SHOULD_USE_GLOBAL_PEERS"` to `false` :
```
SHOULD_USE_GLOBAL_PEERS=false
```

- Configure the `PERSISTANT_PEERS` list with the node ID of your root validator

```
PERSISTANT_PEERS=<root-validator1-id@ip:port>
example: e4da73c45e1d31ecf92fb2152661ba58a3b548e1@cudos-start-root-node:26656
```

- Configure the `PRIVATE_PEERS` list with the node ID of your root validator
``` 
PRIVATE_PEERS=<root-validator-id>
```
#### 4. Make sure that you are still in the correct directory `/var/lib/cudos/CudosBuilders/docker/seed-node`, and *Initialize* the node by running this command:
```
docker-compose --env-file ./seed-node.client.local01.arg -f ./init-seed-node.yml -p cudos-init-seed-node-client-local-01 up --build
```
If all steps are completed successfully, you should see a newly generated file: 
`/var/lib/cudos/CudosData/cudos-data-seed-node-client-local-01/tendermint.nodeid`
that contains your **node ID**, consisting of a long string of random characters.
#### 5. *Start* your node
```
sudo docker-compose --env-file seed-node.client.testnet.public01.arg -f start-seed-node.yml -p cudos-start-seed-node-client-testnet-public-01 up --build --detach

docker-compose --env-file ./seed-node.client.local01.arg -f ./start-seed-node.yml -p cudos-start-seed-node-client-local-01 up --build --detach

```

 If all steps are completed successfully, you should have a running seed node for the root-validator-01


### Congrats ! You now have your own validator cluster on a local blockchain network at your disposal
