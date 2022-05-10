---
title: Local Network - Validator Cluster Build
---

# Guide Overview
::: warning Note
This guide is only intended for testing purposes on a local envrionment and should not be used for testnet/mainet envrionments.
:::
The purpose of this guide is show how to setup a local network consisting of one root validator with one sentry and seed node

# Validator Cluster Build

The Validator Cluster is a cluster of Cudos nodes that can be configured as *Validator*, *Seed*, or *Sentry* nodes. Refer to the [Validator Cluster Nodes](/learn/validators.html#validator-cluster-nodes) section for an overview of the validator cluster roles.
 
## Cluster Build summary
::: warning Note
In this build document, the terms _**Initialise**_ and _**Configure**_ refer to running specific scripts that apply the values in the .env settings file to your node.The _**Initialise**_ script should only be used the first time you start your node, as it will change your node ID. 
:::

The following section will take you through these steps in detail:

**1. Initialize your Root Validator Node**

- Apply basic values to the `.env` file, and **Initialise** BUT DO NOT START your Root Validator Node, taking a note of its Node ID. 

**2. Initialise and Start your Sentry and Seed nodes**

- Apply values to your nodes’ .env files, including adding the Root Validator’s ID as the `PRIVATE_PEERS` value.
- **Initialise** and **Start** your Seed and Sentry Nodes, taking a note of their Node IDs

**3. Apply peer values to your Root Validator and start it**

Enter the Seed’s ID as the SEEDS value, and the Sentry’s ID as the `PERSISTENT PEER` value in your Validator node’s .env file.
- **Configure** your node 
- **Start** your validator Node


## Cluster Build procedure

### 1. Initialize your Validator Node

**Please ensure you have completed everything in [Node Environment Preparation](/testnet/testnetenvprep.html) before you continue to create your node.**


You will apply basic values to your root Validator’s .env file and initialise it, however you will not start your validator yet:

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
sudo docker-compose --env-file root-node.local.arg -f init-root-node.yml -p cudos-init-root-node up --build"
```
**DO NOT START YOUR VALIDATOR NODE YET**

If all steps are completed successfully, you should see a newly generated file: 
`/var/lib/cudos/CudosData/cudos-data-root-node/tendermint.nodeid`
that contains your **node ID**, consisting of a long string of random characters.
 
### 2. Initialise and start your Sentry and Seed nodes

### Sentry

**Please ensure you have completed everything in [Node Environment Preparation](/testnet/testnetenvprep.html) before you continue to create your node.**

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
- Set `SHOULD_USE_GLOBAL_PEERS` to `true` :

``` 
SHOULD_USE_GLOBAL_PEERS=true
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

#### 5. *Start* your node
```
docker-compose --env-file ./sentry-node.client.local01.arg -f ./start-sentry-node.yml -p cudos-start-sentry-node-client-local-01 up --build --detach
```

If all steps are completed successfully, you should see a newly generated file: `/var/lib/cudos/CudosData/cudos-data-sentry-node-client-testnet-public-01/tendermint.nodeid` that contains your **node ID**, consisting of a long string of random characters.


### Seed

**Please ensure you have completed everything in [Node Environment Preparation](/testnet/testnetenvprep.html) before you continue to create your node.**

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
MONIKER=<your-sentry-node-moniker>
```
- Set the flag `"SHOULD_USE_GLOBAL_PEERS"` to `true` :
```
SHOULD_USE_GLOBAL_PEERS=true
```
- Configure the `PRIVATE_PEERS` list with the node ID of your root validator
``` 
PRIVATE_PEERS=<root-validator-id>
```
#### 4. Make sure that you are still in the correct directory `/var/lib/cudos/CudosBuilders/docker/seed-node`, and *Initialize* the node by running this command:
```
docker-compose --env-file ./seed-node.client.local01.arg -f ./init-seed-node.yml -p cudos-init-seed-node-client-local-01 up --build
```
#### 5. *Start* your node
```
sudo docker-compose --env-file seed-node.client.testnet.public01.arg -f start-seed-node.yml -p cudos-start-seed-node-client-testnet-public-01 up --build --detach

docker-compose --env-file ./seed-node.client.local01.arg -f ./start-seed-node.yml -p cudos-start-seed-node-client-local-01 up --build --detach

```

If all steps are completed successfully, you should see a newly generated file: 
`/var/lib/cudos/CudosData/cudos-data-seed-node-client-testnet-public-01/tendermint.nodeid`
that contains your **node ID**, consisting of a long string of random characters.
 


