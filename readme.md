# Overview

This project contains a set of building scripts for CudosNetwork. It depends on 6 other projects and should be downloaded manually. Here is the list:
1. CudosNode (https://github.com/CudoVentures/cudos-node)
1. CudosGravityBridge (https://github.com/CudoVentures/cosmos-gravity-bridge)
1. CudosGravityBridgeUI (https://github.com/CudoVentures/cudos-gravity-bridge-ui)
1. CudosExplorer (https://github.com/CudoVentures/big-dipper)
1. CudosFaucet (https://github.com/CudoVentures/faucet)
1. CudosExporter (https://github.com/CudoVentures/cosmos-exporter)

The following directory structure is required in order everything to work correctly otherwise the scripts will not be able to find their dependancies.
Let denote the parent directory of all projects <code>parentDir</code>. Its name could be arbitrary.

    /parentDir
    - /parentDir/CudosBuilders
    - /parentDir/CudosNode
    - /parentDir/CudosGravityBridge
    - /parentDir/CudosGravityBridgeUI
    - /parentDir/CudosExplorer
    - /parentDir/CudosFaucet
    - /parentDir/CudosData
    - /parentDir/CudosExporter

In the above directory structure, the folders' names are REQUIRED. Carefully rename every project to match the folder names above. Create an empty folder CudosData in <code>parentDir</code>

All commands in this guide assume that you are using Linux with bash. If you are using Windows then you are required to install WSL2 which is again Linux with bash.

# System requirements

These system requirements are recommended for usual setup. Spanning a network with a lot of nodes will require more RAM.

<em>**Hardware:**</em>

**CPU:** At least 2 cores.

**RAM:** 16 GB (Windows), 8 GB (Linux)

**Disk:** An SSD drive

<em>**Software:**</em>

**OS:** Linux or Windows with WSL2 enabled.

**Docker:** 20.10.6+

**Docker compose:** 1.29+

<em>Ubuntu 21 is tested and is working well.</em>

<em>Windows 10 with Ubuntu 20.04 on WSL2 is tested and it is working well.</em>

<em>The versions of docker and docker-compose are just an example. It is quite likely to work with older versions too.</em>

# Host and nested dockers permissions

In most docker instances in this project host file system is mounted inside the docker. This could cauce a permission errors unless it is correctly handled. That's why there are configuration files where you MUST specify your host account details in order identical accounts to be created inside docker container.

# CudosBuilders structure

<em>.vscode</em> - Contains predefined set of commands for VSCode only. They can be triggered by Control(or Cmd)+Shift+B.

<em>docker</em> - Contains configuration, docker, docker-compose files for all build variants of the cudos network.

<em>tools</em> - Conains scripts for network deployment.

<em>workspace</em> - Contains VS Code specific files for building a devcontainer including an example of .dockerignore file

More information about each of these folders will follow.

# Setup the workspace (workspace folder)

## VS Code

1. Install "Remote development" extension.
2. Copy everything from <code>/parentDir/CudosBuilders/workspace</code> to <code>parentDir</code>
3. Rename/copy <code>parentDir/.devcontainer/.env.example</code> to <code>parentDir/.devcontainer/.env</code>. There are 7 parameters that you must specify:


        3.1. MNT_PATH - This is the exact path there <code>parentDir</code> is located in the host. Open it in shell and run <code>pwd</code>. The result of the command is the value of MNT_PATH.
        3.2. PASS - This is the password which will be used inside dev container for both root and your accounts.
        3.3. USER_ID - Id of your host's account
        3.4. USER_NAME - Name of your host's account
        3.5. GROUP_ID - Id of your host's account's group
        3.6. GROUP_NAME - Name of your host's account's group
        3.7. DOCKER_GROUP_ID - Id of docker's group from the host
       
4. Open cudos.code-workspace located in <code>parentDir</code>
5. Open View -> Command pallete and type "Reopen in container".

Now your VS Code should reopen and start building the devcontainer. It could take some time. Once it is ready you will see in bottom-left corner the following label "Dev Container: cudos-workspace". In this devcontainer you have already installed Go, Rust, Docker, Docker compose, NodeJs.

## Non-VS Code

1. Copy .dockerignore from <code>/parentDir/CudosBuilders/workspace</code> to <code>parentDir</code> 
2. Install correspoding framework/langage that you are going to use (depends on project). You might need Go, Rust or NodeJs.

# Setup tools (tools folder)

## Configuration for deployment

<em>You can skip this step if you are going to use network deployer or deployer-tls.</em>

Most of the deployers below has a file named <code>secrecs.json.example</code> Duplicate this file and rename it to <code>secrets.json</code> In it you will find predefined instances' names. Let's call them **targets**. Do not change them, just add the corresponding parameters in the empty variables. Each target needs a host, port, username, privateKey, keyPass (if available) and serverPath. If you are deploying to currently running testnets, leave the serverPath as it is - <code>/usr/cudos</code>

## Ethereum deployer

### Usage:
1. Configure <code>secrets.json</code> in this deployer as described above.
2. Use some of the npm commands.

### List of npm commands regarding this deployer:

**<code>deploy--ethereum-rinkeby</code>** - deploys the rinkeby ethereum full node to gcloud using <code>secrets.json</code> in the deployer's folder.

## Gravity bridge ui deployer

### Usage:
1. Configure <code>secrets.json</code> in this deployer as described above.
2. Configure the ENV variables in <code>parentDir/CudosBuilders/docker/gravity-bridge-ui</code>
- Copy <em>gravity-bridge-ui.env.example</em> to:
    - <em>gravity-bridge-ui.testnet.private.env</em> (for private testnet builds)
    - <em>gravity-bridge-ui.testnet.public.env</em> (for public testnet builds)
- Fill the required fields as described in the "ENV files fields" section.

### List of npm commands regarding this deployer:

**<code>deploy-gravity-bridge-ui-testnet-public</code>** - deploys gravity-bridge-ui to public testnet using <code>secrets.json</code> in the deployer's folder.

**<code>deploy-gravity-bridge-ui-testnet-private</code>** - deploys gravity-bridge-ui to private testnet using <code>secrets.json</code> in the deployer's folder.

## network deployer

To do (network deployer is under development)

## nodes deployer

This deployer is responsible of the deployments of root, seed, sentry and full nodes.

### Usage:
1. Configure <code>secrets.json</code> in this deployer as described above.
2. Configure the ENV variables in <code>parentDir/CudosBuilders/docker/root-node</code> (if you are going to build a root-node)
- Copy <em>root-node.env.example</em> to:
    - <em>root-node.testnet.private.env</em> (for root-validator of the private testnet builds)
    - <em>root-node.testnet.public.zone01.env</em> (for root-validator of the public testnet builds)
- Fill the required fields as described in the "ENV files fields" section.
3. Configure the ENV variables in <code>parentDir/CudosBuilders/docker/seed-node</code> (if you are going to build a seed-node)
- Copy <em>seed-node.env.example</em> to:
    - <em>seed-node.testnet.private.env</em> (for 1st seed node of the private testnet builds)
    - <em>seed-node.testnet.public.zone01.env</em> (for 1st seed node of the public testnet builds)
    - <em>seed-node.testnet.public.zone02.env</em> (for 2nd seed node of the public testnet builds)
    - <em>seed-node.testnet.public.zone03.env</em> (for 3th seed node of the public testnet builds)
- Fill the required fields as described in the "ENV files fields" section.
4. Configure the ENV variables in <code>parentDir/CudosBuilders/docker/sentry-node</code> (if you are going to build a sentry-node)
- Copy <em>sentry-node.env.example</em> to:
    - <em>sentry-node.testnet.private.env</em> (for 1st sentry node of the private testnet builds)
    - <em>sentry-node.testnet.public.zone01.env</em> (for 1st sentry node of the public testnet builds)
    - <em>sentry-node.testnet.public.zone02.env</em> (for 2nd sentry node of the public testnet builds)
    - <em>sentry-node.testnet.public.zone03.env</em> (for 3th sentry node of the public testnet builds)
- Fill the required fields as described in the "ENV files fields" section.
5. Configure the ENV variables in <code>parentDir/CudosBuilders/docker/full-node</code> (if you are going to build a validator different from the root one)
- Copy <em>full-node.env.example</em> to:
    - <em>full-node.testnet.public.zone02.env</em> (for 2nd full node of the public testnet builds)
    - <em>full-node.testnet.public.zone03.env</em> (for 3th full node of the public testnet builds)
- Fill the required fields as described in the "ENV files fields" section.

### List of npm commands regarding this deployer:

**<code>deploy--init--start_root-node-testnet-public-zone01</code>** - deploys, initializes and starts the root-validator of the public testnet using <code>secrets.json</code> in the deployer's folder.

**<code>deploy--init--start_seed-node-testnet-public-zone01</code>** - deploys, initializes and starts the 1st seed node of the public testnet using <code>secrets.json</code> in the deployer's folder.

**<code>deploy--init--start_sentry-node-testnet-public-zone01</code>** - deploys, initializes and starts the 1st sentry node of the public testnet using <code>secrets.json</code> in the deployer's folder.

**<code>deploy--init_validator-node-testnet-public-zone02</code>** - deploys and initializes the validator-02 of the public testnet using <code>secrets.json</code> in the deployer's folder. <em>Unlike the root-validator, the validator-02 is only initialized and NOT started, because it MUST be configured before it can be started. The configuration can be made once its seeds and sentries are up and running. More about this in Deployment procedure section</em>

**<code>deploy--config--start_validator-node-testnet-public-zone02</code>** - deploys, configures and starts the validator-02 of the public testnet using <code>secrets.json</code> in the deployer's folder.

**<code>deploy--init--start_seed-node-testnet-public-zone02</code>** - deploys, initializes and starts the 2nd seed node of the public testnet using <code>secrets.json</code> in the deployer's folder.

**<code>deploy--init--start_sentry-node-testnet-public-zone02</code>** - deploys, initializes and starts the 2nd sentry node of the public testnet using <code>secrets.json</code> in the deployer's folder.

**<code>deploy--init_validator-node-testnet-public-zone03</code>** - deploys and initializes the validator-03 of the public testnet using <code>secrets.json</code> in the deployer's folder. <em>Unlike the root-validator, the validator-03 is only initialized and NOT started, because it MUST be configured before it can be started. The configuration can be made once its seeds and sentries are up and running. More about this in Deployment procedure section</em>

**<code>deploy--config--start_validator-node-testnet-public-zone03</code>** - deploys, configures and starts the validator-03 of the public testnet using <code>secrets.json</code> in the deployer's folder.

**<code>deploy--init--start_seed-node-testnet-public-zone03</code>** - deploys, initializes and starts the 3rd seed node of the public testnet using <code>secrets.json</code> in the deployer's folder.

**<code>deploy--init--start_sentry-node-testnet-public-zone03</code>** - deploys, initializes and starts the 3rd sentry node of the public testnet using <code>secrets.json</code> in the deployer's folder.

**<code>deploy--init--start_root-node-testnet-private</code>** - deploys, initializes and starts the root-validator of the private testnet using <code>secrets.json</code> in the deployer's folder.

**<code>deploy--init--start_seed-node-testnet-private</code>** - deploys, initializes and starts the seed node of the private testnet using <code>secrets.json</code> in the deployer's folder.

**<code>deploy--init--start_sentry-node-testnet-private</code>** - deploys, initializes and starts the sentry node of the private testnet using <code>secrets.json</code> in the deployer's folder.

## orchestrator deployer

### Usage:
1. Configure <code>secrets.json</code> in this deployer as described above.
2. Configure the ENV variables in <code>parentDir/CudosBuilders/docker/orchestator</code>
- Copy <em>orchestrator.env.example</em> to:
    - <em>orchestrator.testnet.private.env</em> (for private testnet builds)
    - <em>orchestrator.testnet.public.zone01.env</em> (for public testnet builds of the root-validator)
    - <em>orchestrator.testnet.public.zone02.env</em> (for public testnet builds of the validator-02)
    - <em>orchestrator.testnet.public.zone03.env</em> (for public testnet builds of the validator-03)
- Fill the required fields as described in the "ENV files fields" section.

### List of npm commands regarding this deployer:

**<code>deploy--orchestrator-testnet-private</code>** - deploys the orchestrator of root-validator of the private testnet using <code>secrets.json</code> in the deployer's folder.

**<code>deploy--orchestrator-testnet-public-zone01</code>** - deploys the orchestrator of root-validator of the public testnet using <code>secrets.json</code> in the deployer's folder.

**<code>deploy--orchestrator-testnet-public-zone02</code>** - deploys the orchestrator of validator-02 of the public testnet using <code>secrets.json</code> in the deployer's folder.

**<code>deploy--orchestrator-testnet-public-zone03</code>** - deploys the orchestrator of validator-03 of the public testnet using <code>secrets.json</code> in the deployer's folder.

## tsl deployer

The deployer contains only a readme file that explains how the server should be configured in order to support the Domain and TSL of sentry nodes. Currently this has already been done for public testnet sentry nodes.

## utils deployer

### Usage:
1. Configure <code>secrets.json</code> in this deployer as described above.
2. Configure the ENV variables in <code>parentDir/CudosBuilders/docker/explorer</code>
- Copy <em>explorer.env.example</em> to:
    - <em>explorer.testnet.private.env</em> (for private testnet builds)
    - <em>explorer.testnet.public.env</em> (for public testnet builds)
- Fill the required fields as described in the "ENV files fields" section.
3. Configure the ENV variables in <code>parentDir/CudosBuilders/docker/faucet</code>
- Copy <em>faucet.env.example</em> to:
    - <em>faucet.testnet.private.env</em> (for private testnet builds)
    - <em>faucet.testnet.public.env</em> (for public testnet builds)
- Fill the required fields as described in the "ENV files fields" section.

### List of npm commands regarding this deployer:

**<code>deploy-utils-testnet-public</code>** - deploys utils (explorer + faucet) to public testnet using <code>secrets.json</code> in the deployer's folder.

**<code>deploy-utils-testnet-private</code>** - deploys utils (explorer + faucet) to private testnet using <code>secrets.json</code> in the deployer's folder.

## monitoring deployer

The setup uses prometheus, grafana and cosmos-exporter to set up monitoring of the nodes of the network and to all the validators liveness in the network

### List of npm commands regarding this deployer:

**<code>deploy--monitoring-testnet-public</code>** - deploys the monitoring to the public testnet using <code>secrets.json</code> in the deployer's folder.

# Setup docker (docker folder)

This folder contains docker specific files organized by build-target. They are used in build processes in local development as well as in deployment builds. 

## Build targets

The folder has following build-targets:

<em>**binary-builder**</em> - The cudos-node daemon used by full-node, root-node, seed-node, sentry-node and standalone-node.

<em>**config**</em> - Contains genesises, peers and seeds for local dev, public and private testnets. 

<em>**ethereum**</em> - Ethereum light or full node.

<em>**faucet**</em> - Faucet used by local dev, public and private testnets.

<em>**full-node**</em> - Cudos full node that connects to local chain, private or public testnets. It can be promoted to a validator.

<em>**gravity-bridge-ui**</em> - Gravity Bridge UI used to transfer funds between the Cosmos <-> Ethereum chains.

<em>**gravity-contract-deployer**</em> - Standalone build-target that has a sole purpose of deployment a new Gravity contract.

<em>**orchestartor**</em> - Orchestrator binary that must run along with the validator

<em>**root-node**</em> - Cudos root node that initializes a chain. It contains the root validator.

<em>**seed-node**</em> - Cudos seed node that connects to local chain, private or public testnets.

<em>**sentry-node**</em> - Cudos sentry node that connects to local chain, private or public testnets.

<em>**standalone-node**</em> - Standalone cudos daemon containing a single root-validator node. It can be used for test purposes.

<em>**monitoring**</em> - Monitoring containing prometheus, grafana and exporter. It can be used for moniting nodes of the network.

## Structure

<em>**config**</em> folder contains configuration files as described above. All other folders have idencical structure. The structure consists of one or more sets of the following files:

**.yml** - Docker compose file.

**.arg** - Docker compose build parameters. Usually a single .yml file could have several .args files. Each of them is used in a specific build-variant. For example: <em>init-full-node.yml</em> has <em>full-node.client.local01.arg</em>, <em>full-node.client.testnet.private01.arg</em> and few more.

**.env** - Env variables of the running container. An .arg file could have a corresponding .env file. For example <em>full-node.client.local01.arg</em> has <em>full-node.client.local01.env</em>.

Each set (.yml, .arg, .env) corresponds to a build-variant.

The **.env** file for each build-variant is not part of the repository, because it contains either private data or it is local configuration. In order to create corresponding **.env** file, you have to copy the **.env.example** and rename in accordance to **.arg** file that matches the build-variant that you need. You can refer to <em>ENV files fields</em> section for more information how to fill an **.env** file.

## Build process

Build process of each of the variants above starts with an **.yml** file that uses parameters defined in **.arg** file. The **.arg** file contains parameters for the docker-compose file as well as for the dockerfile itself. Even some of these arguments are passed as environmental variable to the container. **.env** file contains the environment variable of the container that are not used neither in docker-compose file nor in dockerfile.

Some of the build-targers have **users-*.override.yml**. This file is used along with main **.yml** file of each build-variant in order to specify the linux user and group that each container should use.

There are a lot of build-variants. In order to make the dev process easier and more efficient there is a set of predefined build-variants that are defined in .vscode folder (described below). This folder is suitable only for VSCode. If you are using different editor, you can open the <em>tasks.json</em> file in .vscode folder and see the corresponsing set of files (.yml, .arg, .env, .override.yml) that are used by the predefined build-variants. More information about the purposed of each build target will follow in <em>local dev procedure below</em>.

Some of these build-variats are used by npm commands described in <em>setup tools</em> section.

# Using predefined scripts (.vscode folder)

All the scripts in this folder are VS-code only. They can be invoked by pressing Control (CMD) + Shift + B. Their purpose is to ease the local docker build procedure by speeding up the docker's instance creation.

Each instance has two or three commands - <em>Build</em>, <em>Start</em> and <em>Destroy</em> used respective to build, start or destroy a docker instance. Some of the instances do not have <em>Start</em> command, because these is no point to call only <em>Start</em> without <em>Build</em> command for them.

Listing the entire list of commands here is useless, because of the following reasons:
1. Their names are quite descriptive
1. They are updated frequently
1. They are part of the <em>Local dev procedures</em> which will be described in sections later.

To give a brief overview of what these commands look like let's take the following examples of creating and starting a root node (node that initializes and starts the chain):

<code>Build INIT ROOT NODE in docker</code> - Builds chain binary in order to initialize the chain's data.

<code>Destroy INIT ROOT NODE in docker</code> - Destroys the above built docker container.

<code>Build START ROOT NODE in docker</code> - Builds chain binary in order to starts it by using previously initialized chain's data.

<code>Start START ROOT NODE in docker</code> - Starts previously built, by command above, docker instance.

<code>Destroy START ROOT NODE in docker</code> - Destroys the above built docker container.

More information about commands, how to use and configure them will follow in <em>Local dev procedures</em> section.

# Chain architecture

## Architecture and node types

Each chain starts with a initializator. It is so called <em>root-node</em>. This node must has a validator and this validator is created by default during the initialization of the chain. Validators are very important nodes and their IP address MUST not be disposed in a public space therefore all connections to validators MUST happen in a private network.

Once we have our <em>root-node</em> we can start connecting other nodes to it. Any node that is running in the chain is called <em>full-node</em>

In order to connect a node to the network we must expose at least one IP address of the chain. As said above, we must not expose our validators' IP addresses. That's why we MUST set 1 or more nodes that are connected to the validator in a private network and then we can safely expose these nodes' IP addresses. These type of nodes are called <em>sentry-node</em>. In short - <em>sentry-node</em> is a <em>full-node</em> that hide validator's existance.

Each node have a configuration parameter that makes the node a <em>seed-node</em>. <em>seed-node</em> is a regular <em>full/sentry-node</em> that scrapes the chain on a regular basis and stores a list of IP addresses of active nodes. When someone connects to a seed node, it respond with a list of active peers that the sender could connect it. 

## Connecting to a chain

So far we defined our 4 type of nodes - root, full, sentry and seed. Now let's see how they can connect to each other.

Each node has a unique pair of TENDERMINT_NODE_ID@IP:PORT. Each node's TENDERMINT_NODE_ID is printed in the console just after the node is started. Also it is saved in a file <em>tendermint.nodeid</em> in the data folder (see next section for more detail where data folder is).

We can connect to a network either by using list of <em>PERSISTENT_PEERS</em> or by using list of <em>SEEDS</em>. <em>PERSISTENT_PEERS</em> is a string of comma-separeted pairs of TENDERMINT_NODE_ID/IP. The same applies for <em>SEEDS</em>. It looks like <em>c22447781b7c5898bf277f173ee553a0e11bd427@cudos-start-root-node:26656</em>

If we use <em>PERSISTENT_PEERS</em> then our node will try to connect to them and as long as our node has connection to at least one of them then everything is fine. When our node loses a connection to all of the nodes in the <em>PERSISTENT_PEERS</em>  string then our node will not be part of the chain.

If we use <em>SEEDS</em> then our node will get the actual list of peers from the <em>SEEDS</em>. Then our node will connect to these peers. If our node could not connect to these peers then it will again ask <em>SEEDS</em> in order to obtain a new list of peers that our node will try to connect to.

Also each node MUST have a copy of <em>root-node</em>'s genesis.json file.

### Getting the TENDERMINT_NODE_ID@IP:PORT pair.

In order to establish a connection between two nodes you have to specify <em>PERSISTENT_PEERS</em> or <em>SEEDS</em>. In both cases you need TENDERMINT_NODE_ID@IP:PORT pair. TENDERMINT_NODE_ID can be checked in node's data dir: <em>/data/tendermint.nodeid</em>. The POST is usually 26656 unless you changed it intentionally. The IP address can be IPv4 (during testnet deployments) or a name (during local development in docker containers). This is usefull when working in a docker network where using the exact IPv4 address is not very convenient, because they are subject to change. That's why you can specify the container name as IP address. Container names are defined either in **.yml** file or in **.arg** file (as START_CONTAINER_NAME).

### Network setup example - 2 validators (root + full), 2 sentris, 1 seed

1. Init and start a <em>root-node</em>.
1. Copy /data/config/genesis.json and <em>root-node</em>'s pair (TENDERMINT_NODE_ID@IP:PORT).
1. Init the <em>seed-node</em>.
1. Replace copied genesis.json with <em>seed-node</em>'s /data/config/genesis.json.
1. Open /data/config/config.toml and set <em>root-node</em>'s pair (TENDERMINT_NODE_ID@IP:PORT) as <em>PERSISTENT_PEERS</em>.
1. Open /data/config/config.toml and set <em>root-node</em>'s pair (TENDERMINT_NODE_ID@IP:PORT) as <em>PRIVATE_PEER_IDS</em>.
1. Start the <em>seed-node</em>.
1. Copy <em>seed-node</em>'s pair (TENDERMINT_NODE_ID@IP:PORT).
1. Init the <em>sentry-node</em>.
1. Replace copied genesis.json with <em>sentry-node</em>'s /data/config/genesis.json.
1. Open /data/config/config.toml and set <em>seed-node</em>'s pair (TENDERMINT_NODE_ID@IP:PORT) as <em>SEEDS</em>.
1. Start the <em>sentry-node</em>.
1. Init the <em>full-node</em>.
1. Replace copied genesis.json with <em>full-node</em>'s /data/config/genesis.json.
1. Copy <em>full-node</em>'s pair (TENDERMINT_NODE_ID@IP:PORT).
1. Init the <em>sentry-node-02</em>.
1. Replace copied genesis.json with <em>sentry-node-02</em>'s /data/config/genesis.json.
1. Open /data/config/config.toml and set <em>seed-node</em>'s pair (TENDERMINT_NODE_ID@IP:PORT) as <em>SEEDS</em>.
1. Open /data/config/config.toml and set <em>full-node</em>'s TENDERMINT_NODE_ID as <em>PRIVATE_PEER_IDS</em>.
1. Start the <em>sentry-node-02</em>.
1. Copy <em>sentry-node-02</em>'s pair (TENDERMINT_NODE_ID@IP:PORT).
1. Open /data/config/config.toml of <em>full-node</em> and set <em>sentry-node</em>'s pair (TENDERMINT_NODE_ID@IP:PORT) as <em>PERSISTENT_PEERS</em>.
1. Start the <em>full-node</em>.
1. Create a validator.

For more information where to set <em>SEEDS</em>, <em>PERSISTENT_PEERS</em>, <em>PRIVATE_PEER_IDS</em> see the <em>Data folder</em> section.

## Data folder

Each build-variant of a node has a <em>data</em> folder. All blockchain information is stored date. Deleting this folder is equivalemnt of deleting a node.

As you can see in <em>Overview</em>, the location of <em>data</em> folder is <code>/parentDir/CudosData</code>. Each build-variant creates a sub-folder inside. The resulting structure is like <code>/parentDir/CudosData/{build-variant}</code>. The exact name of the build-variant's sub-folder is defined in the corresponding **.arg** file.

In the <code>/parentDir/CudosData/{build-variant}</code> folder you can find tendermint.nodeid.

In the <code>/parentDir/CudosData/{build-variant}/config</code> folder you can find genesis.json and config.toml. You can set <em>SEEDS</em>, <em>PERSISTENT_PEERS</em>, <em>PRIVATE_PEER_IDS</em> in config.toml. Search for <code>seeds = ""</code>, <code>persistent_peers = ""</code> and <code>private_peer_ids</code> in order to set the corresponding peers.

# Deployment procedure

This section describes the deployment procedure of the public and private testnets and how to use the deploy tools in <code>parentDir/CudosBuilders/tools</code>.

## Assumptions

1. You have access to the gcloud there all the instances are running.
2. You ssh key to access all the instances in gcloud. The ssh key is assigned to a user with sudo permissions.
3. You know the IP address of each instance.

## Private testnet

1. Deploy, init and start the root-node:

    <code>deploy--init--start_root-node-testnet-private</code>*

1. Download genesis.json, tendermint.nodeid, faucet.wallet and orch-01.wallet from the root-node.

1. Copy the downloaded genesis.json to <code>parentDir/CudosBuilders/config/genesis.testnet.private.json</code>

1. Deploy a new gravity smart contract.

    The deployment of this contract is done in the same way as in local dev procedure. The only difference is in the the **.env** file that corresponds to this build-variant. Refer to <em>Local dev procedure</em> for more information about the deployment of this contract.

1. Deploy orchestrator:

    <code>deploy--orchestrator-testnet-private</code>*

1. Deploy, init and start the seed-node.

    Set seed-node's <em>PERSISTENT_PEER</em> to be root-node<br />
    Set seed-node's <em>PRIVATE_PEER_IDS</em> to be root-node

    <code>deploy--init--start_seed-node-testnet-private</code>*

1. Download tendermint.nodeid from the seed-node.

1. Deploy, init and start the sentry-node.

    Set sentry-node's <em>PERSISTENT_PEER</em> to be root-node<br />
    Set sentry-node's <em>SEED</em> to be seed-node<br />
    Set sentry-node's <em>PRIVATE_PEER_IDS</em> to be root-node

    <code>deploy--init--start_sentry-node-testnet-private</code>*

1. Download tendermint.nodeid from the sentry-node.

1. Deploy utils (explorer + faucet).

    <code>deploy-utils-testnet-private</code>*

1. Deploy gravity bridge ui.

    <code>deploy-gravity-bridge-ui-testnet-private</code>*

1. Update <code>parentDir/CudosBuilders/config/seeds.testnet.private.config</code> with TENDERMINT_NODE_ID@IP:PORT pair of the seed-node.

## Public testnet

1. Deploy, init and start the root-node:

    <code>deploy--init--start_root-node-testnet-public-zone01</code>*

1. Download genesis.json, tendermint.nodeid, faucet.wallet, validator-02.wallet, validator-03.wallet, orch-01.wallet, orch-02.wallet and orch-03.wallet from the root-node.

1. Copy the downloaded genesis.json to <code>parentDir/CudosBuilders/config/genesis.testnet.public.json</code>

1. Deploy a new gravity smart contract.

    The deployment of this contract is done in the same way as in local dev procedure. The only difference is in the the **.env** file that corresponds to this build-variant. Refer to <em>Local dev procedure</em> for more information about the deployment of this contract.

1. Deploy orchestrator-01:

    <code>deploy--orchestrator-testnet-public-zone01</code>*

1. Deploy, init and start the seed-node-01.

    Set seed-node-01's <em>PERSISTENT_PEER</em> to be root-node<br />
    Set seed-node-01's <em>PRIVATE_PEER_IDS</em> to be root-node

    <code>deploy--init--start_seed-node-testnet-public-zone01</code>*

1. Download tendermint.nodeid from the seed-node-01.

1. Deploy, init and start the sentry-node-01.

    Set sentry-node-01's <em>PERSISTENT_PEER</em> to be root-node<br />
    Set sentry-node-01's <em>SEED</em> to be seed-node-01<br />
    Set sentry-node-01's <em>PRIVATE_PEER_IDS</em> to be root-node

    <code>deploy--init--start_sentry-node-testnet-public-zone01</code>*

1. Download tendermint.nodeid from the sentry-node-01.

1. Deploy and init the validator-node-02:

    <code>deploy--init_validator-node-testnet-public-zone02</code>*

1. Download the tendermint.nodeid from the validator-node-02.

1. Deploy, init and start the seed-node-02.

    Set seed-node-02's <em>PRIVATE_PEER_IDS</em> to be validator-node-02<br />
    Set seed-node-02's <em>PERSISTENT_PEER</em> to be sentry-node-01<br />
    Set seed-node-02's <em>SEED</em> to be seed-node-01

    <code>deploy--init--start_seed-node-testnet-public-zone02</code>*

1. Download tendermint.nodeid from the seed-node-02.

1. Deploy, init and start the sentry-node-02.

    Set sentry-node-02's <em>PRIVATE_PEER_IDS</em> to be validator-node-02<br />
    Set sentry-node-02's <em>PERSISTENT_PEER</em> to be sentry-node-01<br />
    Set sentry-node-02's <em>SEED</em> to be seed-node-01 and seed-node-02

    <code>deploy--init--start_sentry-node-testnet-public-zone02</code>*

1. Download tendermint.nodeid from the sentry-node-02.

1. Deploy, configure and start the validator-node-02:

    Set validator-node-02's <em>PERSISTENT_PEER</em> to be seed-node-02 and sentry-node-02<br />

    <code>deploy--config--start_validator-node-testnet-public-zone02</code>

1. Create a validator in validator-02. **

1. Register the orchestrator in validator-02. **

1. Deploy orchestrator-02:

    <code>deploy--orchestrator-testnet-public-zone02</code>*

1. Deploy and init the validator-node-03:

    <code>deploy--init_validator-node-testnet-public-zone03</code>*

1. Download the tendermint.nodeid from the validator-node-03.

1. Deploy, init and start the seed-node-03.

    Set seed-node-03's <em>PRIVATE_PEER_IDS</em> to be validator-node-03<br />
    Set seed-node-03's <em>PERSISTENT_PEER</em> to be sentry-node-01<br />
    Set seed-node-03's <em>SEED</em> to be seed-node-01

    <code>deploy--init--start_seed-node-testnet-public-zone03</code>*

1. Download tendermint.nodeid from the seed-node-03.

1. Deploy, init and start the sentry-node-03.

    Set sentry-node-03's <em>PRIVATE_PEER_IDS</em> to be validator-node-03<br />
    Set sentry-node-03's <em>PERSISTENT_PEER</em> to be sentry-node-01<br />
    Set sentry-node-03's <em>SEED</em> to be seed-node-01 and seed-node-03

    <code>deploy--init--start_sentry-node-testnet-public-zone03</code>*

1. Download tendermint.nodeid from the sentry-node-03.

1. Deploy, configure and start the validator-node-03:

    Set validator-node-03's <em>PERSISTENT_PEER</em> to be seed-node-03 and sentry-node-03<br />

    <code>deploy--config--start_validator-node-testnet-public-zone03</code>

1. Create a validator in validator-03. **

1. Register the orchestrator in validator-03. **

1. Deploy orchestrator-03:

    <code>deploy--orchestrator-testnet-public-zone03</code>*


1. Deploy utils (explorer + faucet).

    <code>deploy-utils-testnet-public</code>*

1. Deploy gravity bridge ui.

    <code>deploy-gravity-bridge-ui-testnet-public</code>*

1. Update <code>parentDir/CudosBuilders/config/seeds.testnet.public.config</code> with TENDERMINT_NODE_ID@IP:PORT pairs of the seed-node-01, seed-node-02, seed-node-03.

<em>*</em> **You MUST configure the corresponsing .env files before using the command. Refer to <em>Setup tools (tools folder)</em> section**

<em>**</em> **Refer to <em>Local dev procedure</em>  for more infromation.**

# Upgrade procedure

To be able to do an upgrade, first there needs to be an approved software upgrade proposal. Also there are two types of upgrade procedures. The first is being used when there are no breaking changes and the second - when there is.

**The update procedure in this document describes the abstract process. Commands here cannot be used as copy-paste solution. Each of them should be applied based on the specific upgrade and based on the currently running network infrastructure. For example the commands below are highly likely to be executed inside the docker container that runs the node.**

The upgrade consists of two phases - preparation and actual upgrade. During the preparation a software upgrade proposal is required in order to make the entire network to stop at specific height and then the network state could be exported. After the preparation step we must do either Soft upgrade or Hard fork which depends on the fact whether there are breaking changes or not.

**The steps below, after the preparation, should be applied by all validators simultaneously in order to avoid slashing.**

## Preparation

A software upgrade proposal is first being submitted. After being submitted it enters into a deposit period, during which a certain amount of tokens need to be deposited into it, so the voting period can start. After the voting period starts, only validators can vote and approve it. If the proposal is passed, the network stops at a specified block height, until the upgrade is made and network is restarted.

### 1. Submitting a software upgrade proposal

A proposal can be submitted with the following command in a node terminal:

```bash
cudos-noded tx gov submit-proposal software-upgrade <proposal_name> --upgrade-height <block_at_which_to_stop> --from <wallet_name> --deposit <amount_to_deposit_with_denomination> --title <proposal_title> --description <proposal_description> --keyring-backend <os or file or test> --chain-id <chain_id> -y
```

### 2. Depositing to a proposal

To get the ID of the proposal that we want to deposit into, enter the following command:

```bash
cudos-noded q gov proposals
```

This will return a list with all the proposals in which we can find the one we need and find the field "**proposal_id**" for it. Then to deposit funds into it, enter the following command:

```bash
cudos-noded tx gov deposit <proposal_id> <amount_with_denomination> --from <wallet_name> --keyring-backend <os or file or test> --chain-id <chain_id> -y
```

If the funds are enough, the proposal should enter in a voting status, which can again be seen with the command we used for the proposal ID.

### 3. Voting a proposal

To vote with yes to a proposal, use the following command:

```bash
cudos-noded tx gov vote <proposal_id> yes --from <walled_name> --keyring-backend <os or file or test> --chain-id <chain_id> -y
```

If enough votes with "yes" are sent, the proposal will be approved and the network will stop at the specified block height or time.

The chain will stop at specified height. When the chain stops we need to stop the nodes as well.

## Soft upgrade (without breaking changes)

It is being done by "in-place migration", described [here](https://docs.cosmos.network/master/core/upgrade.html).

In short - after the network stops we have to pull and build the new binary and start the chain again.

## Hard fork (with breaking changes)

After the network stops we must:

1. Export the current state.
1. Pull and build the new binary.
1. Migrate the state.
1. Run the network.

### 1. Exporting the network state

This is done with the following command on a **stopped** node:

```bash
cudos-noded export |& tee  <export_file_name.json>
```

Check the file to make sure it is populated with the network state.

### 2. Set the new binary

Pull and build the new binary based on the nodes' types that you are running.

### 3. Migrating the network state file

The exported file from before needs to be migrated, which basically populates it with the fields needed by the new version. This is done with the following command:

```bash
cudos-noded migrate <software_upgrade_proposal_name> <export_file_name.json> --chain-id <new_chain_id> |& tee <migrated_file_name.json>
```

All the necessary state changes are handled in the **migrate** command. However, Tendermint parameters are not handled in this command. You might need to update these parameters manually. Make sure that your genesis JSON files contains the correct values specific to your chain. If the cudos-noded migrate errors with a message saying that the genesis file cannot be parsed, these are the fields to check first.

**3.1 Reset the old state**

This is done with the following command:

```bash
cudos-noded unsafe-reset-all
```

**3.2 Move the new genesis.json to your daemon config directory.**

Either copy it manually or run command like the following example:

```bash
cp <migrated_file_name.json> ~/.cudos-noded/config/genesis.json
```

You can run the following command to check the software version, it should state the expected on at the end:

```bash
cudos-noded version --long
```

### 4. Start the network

Start the network with or any other equivalent command that you used to start the network with:

```bash
cudos-noded start
```

It should start from the the block it stopped before the upgrade without any error and with the state unchanged.

# Local dev procedure

## Stating a chain

1. Deside nodes architecture. In most cases <em>root-node</em> and a <em>sentry-node</em> are enough.
1. Init and start the <em>root-node</em> using pre-defined build-variants.
1. Configure, init and start desired nodes (full, sentry or seed) using pre-defined build-variants.

## Using predefined build-variants

### Overview

Each predefiend build-variant consists of two parts - docker action and build-variant name. Docker actions are <em>Build</em>, <em>Start</em>, <em>Destroy</em>, <em>Build-only</em>, etc.. They are always at the begining of the command. After that in UPPERCASE is the name of the build-variant. Each of them ends with <em>in docker</em>, because all of them are docker related.

<em>Build</em> Indicates that the docker-compose command ends with ...up --build. It means that the container will be built and then started.

<em>Start</em> Indicates that the docker-compose command ends with ...up. It means that the container will be started as it was before. If it does not exist then it will be built.

<em>Destroy</em> Removes the container.

<em>Build-only</em> Indicates that the docker-compose command ends with ...up. It means that the container will be built but NOT started.

Please refer to <em>ENV files fields</em> section for more information about how to fill the required **.env** files below. Mentioned **.env** file are missing in the repository and you must create them by copying the **.env.example** file.

The "CLIENT" in the name of the build-variant indicates that it is expected this node to be like a "client" to the local chain and thus using the <em>SHOULD_USE_GLOBAL_PEERS</em> as <em>TRUE</em>.

The "CONFIG" in the name indicates that this container is more like a script. Once it is built, it starts, executes some logic and shuts down. Such config containers are usual for full-nodes, because there is one extra step when creating a validator.

### Predefiend build-variants

<code>Build/Destroy INIT ROOT NODE in docker</code>. Container for initialization of a root node. It depends on **root-node.local.env** and the corresponding **.arg** file.

<code>Build/Destroy/Start START ROOT NODE in docker</code>. Container for starting the root node. The container MUST be initialized before. It depends on **root-node.local.env** and the corresponding **.arg** file.

<code>Build/Destroy INIT SEED NODE in docker</code>. Container for initialization of a seed node. It depends on **seed-node.local.env** and the corresponding **.arg** file. Its genesis file is in <em>parentDir/CudosBuilders/docker/config/genesis.local.json</em>. If <em>SHOULD_USE_GLOBAL_PEERS</em> is set to <em>TRUE</em> then the node connects to peers specified in <em>parentDir/CudosBuilders/docker/config/persistent-peers.local.json</em> and <em>parentDir/CudosBuilders/docker/config/seeds.local.json</em>. If <em>SHOULD_USE_STATE_SYNC</em> is set to <em>TRUE</em> then the node downloads the latest available state from trusted peers defined in <em>parentDir/CudosBuilders/docker/config/state-sync-rpc-servers.local.config</em>.

<code>Build/Destroy/Start START SEED NODE in docker</code>. Container for starting of a seed node. The container MUST be initialized before. It depends on **seed-node.local.env** and the corresponding **.arg** file. Its genesis file is in <em>parentDir/CudosBuilders/docker/config/genesis.local.json</em>.

<code>Build/Destroy INIT SENTRY NODE in docker</code>. Container for initialization of a sentry node. It depends on **sentry-node.local.env** and the corresponding **.arg** file. Its genesis file is in <em>parentDir/CudosBuilders/docker/config/genesis.local.json</em>. If <em>SHOULD_USE_GLOBAL_PEERS</em> is set to <em>TRUE</em> then the node connects to peers specified in <em>parentDir/CudosBuilders/docker/config/persistent-peers.local.json</em> and <em>parentDir/CudosBuilders/docker/config/seeds.local.json</em>. If <em>SHOULD_USE_STATE_SYNC</em> is set to <em>TRUE</em> then the node downloads the latest available state from trusted peers defined in <em>parentDir/CudosBuilders/docker/config/state-sync-rpc-servers.local.config</em>.

<code>Build/Destroy/Start START SENTRY NODE in docker</code>. Container for starting of a sentry node. The container MUST be initialized before. It depends on **sentry-node.local.env** and the corresponding **.arg** file. Its genesis file is in <em>parentDir/CudosBuilders/docker/config/genesis.local.json</em>.

<code>Build/Destroy/Start FAUCET in docker</code>. Container for starting the faucet. It depends on **faucet.local.arg** and the corresponding **.arg** file.

<code>Build/Destroy/Start EXPLORER in docker</code>. Container for starting the explorer in release build. It depends on **explorer.local.env** and the corresponding **.arg** file.

<code>Build EXPLORER DEV in docker</code>. Container for starting the explorer in dev build. It depends on **explorer.local.env** and the corresponding **.arg** file. In this mode, a volume is mounted from host inside docker so that any change in host's files results in re-building of the explorer.

<code>Build/Destroy INIT SEED NODE CLIENT LOCAL in docker</code>. Container for initialization of a seed node. It depends on **seed-node.client.local01.env** and the corresponding **.arg** file. Its genesis file is in <em>parentDir/CudosBuilders/docker/config/genesis.local.json</em>. If <em>SHOULD_USE_GLOBAL_PEERS</em> is set to <em>TRUE</em> then the node connects to peers specified in <em>parentDir/CudosBuilders/docker/config/persistent-peers.local.json</em> and <em>parentDir/CudosBuilders/docker/config/seeds.local.json</em>.

<code>Build/Destroy/Start START SEED NODE CLIENT LOCAL in docker</code>. Container for starting of a seed node. The container MUST be initialized before. It depends on **seed-node.client.local01.env** and the corresponding **.arg** file. Its genesis file is in <em>parentDir/CudosBuilders/docker/config/genesis.local.json</em>.

<code>Build/Destroy INIT SEED NODE CLIENT TESTNET PRIVATE in docker</code>. Container for initialization of a seed node. It depends on **seed-node.client.testnet.private01.env** and the corresponding **.arg** file. Its genesis file is in <em>parentDir/CudosBuilders/docker/config/genesis.testnet.private.json</em>. If <em>SHOULD_USE_GLOBAL_PEERS</em> is set to <em>TRUE</em> then the node connects to peers specified in <em>parentDir/CudosBuilders/docker/config/persistent-peers.testnet.private.json</em> and <em>parentDir/CudosBuilders/docker/config/seeds.testnet.private.json</em>. If <em>SHOULD_USE_STATE_SYNC</em> is set to <em>TRUE</em> then the node downloads the latest available state from trusted peers defined in <em>parentDir/CudosBuilders/docker/config/state-sync-rpc-servers.testnet.private.config</em>.

<code>Build/Destroy/Start START SEED NODE CLIENT TESTNET PRIVATE in docker</code>. Container for starting of a seed node. The container MUST be initialized before. It depends on **seed-node.client.testnet.private01.env** and the corresponding **.arg** file. Its genesis file is in <em>parentDir/CudosBuilders/docker/config/genesis.testnet.private.json</em>.

<code>Build/Destroy INIT SEED NODE CLIENT TESTNET PUBLIC in docker</code>. Container for initialization of a seed node. It depends on **seed-node.client.testnet.public01.env** and the corresponding **.arg** file. Its genesis file is in <em>parentDir/CudosBuilders/docker/config/genesis.testnet.public.json</em>. If <em>SHOULD_USE_GLOBAL_PEERS</em> is set to <em>TRUE</em> then the node connects to peers specified in <em>parentDir/CudosBuilders/docker/config/persistent-peers.testnet.public.json</em> and <em>parentDir/CudosBuilders/docker/config/seeds.testnet.public.json</em>. If <em>SHOULD_USE_STATE_SYNC</em> is set to <em>TRUE</em> then the node downloads the latest available state from trusted peers defined in <em>parentDir/CudosBuilders/docker/config/state-sync-rpc-servers.testnet.public.config</em>.

<code>Build/Destroy/Start START SEED NODE CLIENT TESTNET PUBLIC in docker</code>. Container for starting of a seed node. The container MUST be initialized before. It depends on **seed-node.client.testnet.public01.env** and the corresponding **.arg** file. Its genesis file is in <em>parentDir/CudosBuilders/docker/config/genesis.testnet.public.json</em>.

<code>Build/Destroy INIT SENTRY NODE CLIENT LOCAL in docker</code>. Container for initialization of a sentry node. It depends on **sentry-node.client.local01.env** and the corresponding **.arg** file. Its genesis file is in <em>parentDir/CudosBuilders/docker/config/genesis.local.json</em>. If <em>SHOULD_USE_GLOBAL_PEERS</em> is set to <em>TRUE</em> then the node connects to peers specified in <em>parentDir/CudosBuilders/docker/config/persistent-peers.local.json</em> and <em>parentDir/CudosBuilders/docker/config/seeds.local.json</em>. If <em>SHOULD_USE_STATE_SYNC</em> is set to <em>TRUE</em> then the node downloads the latest available state from trusted peers defined in <em>parentDir/CudosBuilders/docker/config/state-sync-rpc-servers.local.config</em>.

<code>Build/Destroy/Start START SENTRY NODE CLIENT LOCAL in docker</code>. Container for starting of a sentry node. The container MUST be initialized before. It depends on **sentry-node.client.local01.env** and the corresponding **.arg** file. Its genesis file is in <em>parentDir/CudosBuilders/docker/config/genesis.local.json</em>.

<code>Build/Destroy INIT SENTRY NODE CLIENT TESTNET PRIVATE in docker</code>. Container for initialization of a sentry node. It depends on **sentry-node.client.testnet.private01.env** and the corresponding **.arg** file. Its genesis file is in <em>parentDir/CudosBuilders/docker/config/genesis.testnet.private.json</em>. If <em>SHOULD_USE_GLOBAL_PEERS</em> is set to <em>TRUE</em> then the node connects to peers specified in <em>parentDir/CudosBuilders/docker/config/persistent-peers.testnet.private.json</em> and <em>parentDir/CudosBuilders/docker/config/seeds.testnet.private.json</em>. If <em>SHOULD_USE_STATE_SYNC</em> is set to <em>TRUE</em> then the node downloads the latest available state from trusted peers defined in <em>parentDir/CudosBuilders/docker/config/state-sync-rpc-servers.testnet.private.config</em>.

<code>Build/Destroy/Start START SENTRY NODE CLIENT PRIVATE in docker</code>. Container for starting of a sentry node. The container MUST be initialized before. It depends on **sentry-node.client.testnet.private01.env** and the corresponding **.arg** file. Its genesis file is in <em>parentDir/CudosBuilders/docker/config/genesis.testnet.private.json</em>.

<code>Build/Destroy INIT SENTRY NODE CLIENT TESTNET PUBLIC in docker</code>. Container for initialization of a sentry node. It depends on **sentry-node.client.testnet.public01.env** and the corresponding **.arg** file. Its genesis file is in <em>parentDir/CudosBuilders/docker/config/genesis.testnet.public.json</em>. If <em>SHOULD_USE_GLOBAL_PEERS</em> is set to <em>TRUE</em> then the node connects to peers specified in <em>parentDir/CudosBuilders/docker/config/persistent-peers.testnet.public.json</em> and <em>parentDir/CudosBuilders/docker/config/seeds.testnet.public.json</em>. If <em>SHOULD_USE_STATE_SYNC</em> is set to <em>TRUE</em> then the node downloads the latest available state from trusted peers defined in <em>parentDir/CudosBuilders/docker/config/state-sync-rpc-servers.testnet.public.config</em>.

<code>Build/Destroy/Start START SENTRY NODE CLIENT PUBLIC in docker</code>. Container for starting of a sentry node. The container MUST be initialized before. It depends on **sentry-node.client.testnet.public01.env** and the corresponding **.arg** file. Its genesis file is in <em>parentDir/CudosBuilders/docker/config/genesis.testnet.public.json</em>.

<code>Build/Destroy INIT FULL NODE CLIENT LOCAL in docker</code>. Container for initialization of a full node. It depends on **full-node.client.local01.env** and the corresponding **.arg** file. Its genesis file is in <em>parentDir/CudosBuilders/docker/config/genesis.local.json</em>. If <em>SHOULD_USE_GLOBAL_PEERS</em> is set to <em>TRUE</em> then the node connects to peers specified in <em>parentDir/CudosBuilders/docker/config/persistent-peers.local.json</em> and <em>parentDir/CudosBuilders/docker/config/seeds.local.json</em>. If <em>SHOULD_USE_STATE_SYNC</em> is set to <em>TRUE</em> then the node downloads the latest available state from trusted peers defined in <em>parentDir/CudosBuilders/docker/config/state-sync-rpc-servers.local.config</em>.

<code>Build/Destroy CONFIG FULL NODE CLIENT LOCAL in docker</code>. Container for configuration of a full node. The container MUST be initialized before. It depends on **full-node.client.local01.env** and the corresponding **.arg** file. Its genesis file is in <em>parentDir/CudosBuilders/docker/config/genesis.local.json</em>.

<code>Build/Destroy/Start START FULL NODE CLIENT LOCAL in docker</code>. Container for starting of a full node. The container MUST be initialized before. It depends on **full-node.client.local01.env** and the corresponding **.arg** file. Its genesis file is in <em>parentDir/CudosBuilders/docker/config/genesis.local.json</em>.

<code>Build/Destroy INIT FULL NODE CLIENT TESTNET PUBLIC in docker</code>. Container for initialization of a full node. It depends on **full-node.client.testnet.public01.env** and the corresponding **.arg** file. Its genesis file is in <em>parentDir/CudosBuilders/docker/config/genesis.testnet.public.json</em>. If <em>SHOULD_USE_GLOBAL_PEERS</em> is set to <em>TRUE</em> then the node connects to peers specified in <em>parentDir/CudosBuilders/docker/config/persistent-peers.testnet.public.json</em> and <em>parentDir/CudosBuilders/docker/config/seeds.testnet.public.json</em>. If <em>SHOULD_USE_STATE_SYNC</em> is set to <em>TRUE</em> then the node downloads the latest available state from trusted peers defined in <em>parentDir/CudosBuilders/docker/config/state-sync-rpc-servers.testnet.public.config</em>.

<code>Build/Destroy CONFIG FULL NODE CLIENT TESTNET PUBLIC in docker</code>. Container for configuration of a full node. The container MUST be initialized before. It depends on **full-node.client.testnet.public01.env** and the corresponding **.arg** file. Its genesis file is in <em>parentDir/CudosBuilders/docker/config/genesis.testnet.public.json</em>.

<code>Build/Destroy/Start START FULL NODE CLIENT TESTNET PUBLIC in docker</code>. Container for starting of a full node. The container MUST be initialized before. It depends on **full-node.client.testnet.public01.env** and the corresponding **.arg** file. Its genesis file is in <em>parentDir/CudosBuilders/docker/config/genesis.testnet.public.json</em>.

<code>Build/Destroy INIT FULL NODE CLIENT TESTNET PRIVATE in docker</code>. Container for initialization of a full node. It depends on **full-node.client.testnet.private01.env** and the corresponding **.arg** file. Its genesis file is in <em>parentDir/CudosBuilders/docker/config/genesis.testnet.private.json</em>. If <em>SHOULD_USE_GLOBAL_PEERS</em> is set to <em>TRUE</em> then the node connects to peers specified in <em>parentDir/CudosBuilders/docker/config/persistent-peers.testnet.private.json</em> and <em>parentDir/CudosBuilders/docker/config/seeds.testnet.private.json</em>. If <em>SHOULD_USE_STATE_SYNC</em> is set to <em>TRUE</em> then the node downloads the latest available state from trusted peers defined in <em>parentDir/CudosBuilders/docker/config/state-sync-rpc-servers.testnet.private.config</em>.

<code>Build/Destroy CONFIG FULL NODE CLIENT TESTNET PRIVATE in docker</code>. Container for configuration of a full node. The container MUST be initialized before. It depends on **full-node.client.testnet.testnet01.env** and the corresponding **.arg** file. Its genesis file is in <em>parentDir/CudosBuilders/docker/config/genesis.testnet.private.json</em>.

<code>Build/Destroy/Start START FULL NODE CLIENT TESTNET PRIVATE in docker</code>. Container for starting of a full node. The container MUST be initialized before. It depends on **full-node.client.testnet.private01.env** and the corresponding **.arg** file. Its genesis file is in <em>parentDir/CudosBuilders/docker/config/genesis.testnet.private.json</em>.

<code>Build/Build-only/Destroy/Start BINARY BUILDER in docker</code>. Container for building the binary of the chain. All other node related containers depend on it. It does not depends on any **.env** files. Its **.arg** file is <em>binary-builder.arg</em>

<code>Build/Destroy/Start STANDALONE NODE in docker</code>. Container for starting a single-node network for test purposes. It does not depend on any **.env** or **.arg** files.

<code>Build/Destroy/Start ORCHESTRATOR LOCAL 01 DEBUG in docker</code>. Container for orchestrator in debug mode. It depends on **orchestrator.local01.env** and the corresponding **.arg** file. A volume is mounted from host inside docker. So any change in host's files will result in same files being changed inside the container too. A re-build should be manually triggered after any such change by openning a bash shell inside docker container and executing the following command.
```bash
cd /usr/src/orchestrator && cargo build && cd /home/orchestrator/bin/ && cp /usr/src/orchestrator/target/debug/gbt ./gbt && ./orchestrator-run.sh
```
This command should also be executed once the container starts in order to start the orchestrator.

<code>Build/Destroy/Start ORCHESTRATOR LOCAL 01 RELEASE in docker</code>. Container for orchestrator in release mode. It depends on **orchestrator.local01.env** and the corresponding **.arg** file. 

<code>Build/Destroy/Start ORCHESTRATOR LOCAL 02 RELEASE in docker</code>. Container for orchestrator in release mode. It depends on **orchestrator.local02.env** and the corresponding **.arg** file. 

<code>Build/Destroy/Start ORCHESTRATOR LOCAL 03 RELEASE in docker</code>. Container for orchestrator in release mode. It depends on **orchestrator.local03.env** and the corresponding **.arg** file. 

<code>Build/Destroy/Start ORCHESTRATOR CLIENT TESTNET PRIVATE RELEASE in docker</code>. Container for orchestrator in release mode. It depends on **orchestrator.testnet.private01.env** and the corresponding **.arg** file. 

<code>Build/Destroy/Start CONTRACT DEPLOYER in docker</code>. Container that acts like a script. It starts and deploys the gravity smart contract. It depends on **gravity-contract-deployer.env** and the corresponding **.arg** file. 

<code>Build/Destroy ETHEREUM LIGHT NODE in docker</code>. Container for Ethereum light node.

<code>Build/Destroy ETHEREUM FULL NODE in docker</code>. Container for Ethereum full node. <em>It could take more than 12h to sync the network</em>.

<code>Build/Destroy/Start GRAVITY BRIDGE UI DEV in docker</code>. Container for Gravity bridge UI. It depends on **gravity-bridge-ui.dev.env** and the corresponding **.arg** file. In this mode, a volume in mounted from host inside docker so that any change in host's files results in re-building of the Gravity bridge UI.

<code>Build/Destroy/Start GRAVITY BRIDGE UI TESTNET PRIVATE</code>. Container for Gravity bridge UI. It depends on **gravity-bridge-ui.testnet.private.env** and the corresponding **.arg** file. 

## Create validator

The initial validator (root-validator) is created automatically when the chain starts. All other validators must be created explicitly. To create a validator you need access to <code>cudos-noded</code>. The usual way to access it is to open a bash terminal inside the docker container where you would like to create the validator. 

Prepare the following before the actual creation:

1. Account with at least 1 CUDOS. <em>Its name in the example below is validator</em>.
2. $STATE env variable. It holds amount of tokens that you are willing to stake. You must stake at least 1 CUDOS in order to activete your validator. For example: <code>export STAKE="2000000000000000000acudos"</code>
3. $CHAIN_ID env variable. The ID of the chain, which was specified during chain initialization. You can refer to **root-node's env file** to see the exact name that you set.
4. Check if you have $MONIKER env variable. It should be available. If not, check the **.env** file of the node.

Execute the command below and your validator will be created.


```bash
cudos-noded tx staking create-validator --amount=$STAKE \
    --from=validator \
    --pubkey=$(cudos-noded tendermint show-validator) \
    --moniker=$MONIKER \
    --chain-id=$CHAIN_ID \
    --commission-rate="0.10" \
    --commission-max-rate="0.20" \
    --commission-max-change-rate="0.01" \
    --min-self-delegation="1" \
    --gas="auto" \
    --gas-prices="0.025acudos" \
    --gas-adjustment="1.80" \
    --keyring-backend="os" \
    -y
```

## Register orchestrator

The orchestrator of the root-validator is registered automatically but all other orchestrators must be registered explicitly. In order to do so you will need:

1. Account that has enough funds to sign transactions. <em>Few CUDOS are fine</em>.
2. $VALIDATOR_ADDRESS env variable. It should hold an address starting with "cudosvaloper1". To get this address run <code>cudos-noded q staking validators</code> and find the operator_address of your validator.
3. $ORCH_ADDRESS env variable. It should contain the public wallet address of the account in point 1. It should starts with "cudos1".
4. $ETH_ADDRESS. Ethereum public address of a wallet that will be used to sign the transactions on ethereum side of the network. It should starts with "0x".

Once you have all that you can register your orchestrator using:

```bash
cudos-noded tx gravity set-orchestrator-address $VALIDATOR_ADDRESS $ORCH_ADDRESS $ETH_ADDRESS --from validator --keyring-backend "os" --chain-id $CHAIN_ID
```

It is very import to sign the transaction with the validator's account (--from parameter) that was used while creating your validator.

Usually the command for registering the orchestrator is executed on the same cudos-noded where the validator was created at. So you are supposed to have the <em>validator</em> account.

## Starting a chain

Let's start a chain with a root-node and a sentry-node.

1. Build INIT ROOT NODE in docker.
1. Build START ROOT NODE in docker.
1. Copy <em>/data/config.genesis.json<em> to <em>parentDir/CudosBuilders/docker/config/genesis.local.json</em>.
1. Open <em>/data/tendermint.nodeid</em> and copy the TENDERMINT_NODE_ID. Paste it as <em>PERSISTENT_PEERS</em> and <em>PRIVATE_PEER_IDS</em> in **sentry.local01.env**.
1. Build INIT SENTRY NODE in docker.
1. Build START SENTRY NODE in docker.

# ENV files fields

Always copy the example .env.example file. You could leave the default values as they are and just add the required fields as described below in this section.

Please note the port of each endpoint. It can be used as indicator which endpoint is required.

## Explorer

- <code>MONGO_URL</code> - MongoDB connection string. It could be empty for dev builds.
- <code>ROOT_URL</code> - The URL where explorer will be accessed from. For example: ROOT_URL=http://localhost.

## Faucet

- <code>CREDIT_AMOUNT</code> - Default credit amount in acudos. It can safely be as MAX_CREDIT.
- <code>MAX_CREDIT</code> - Max credit amount in acudos.
- <code>NODE</code> - Cosmos URL. For example: NODE="http://localhost:26657".
- <code>MNEMONIC</code> - Mnemonic phrase of wallet that will be used to send tokens from.
- <code>GOOGLE_API_KEY</code> - Google Api Key for captcha enterprise.
- <code>CAPTCHA_SITE_KEY</code> - Google Site key for captcha enterprice.
- <code>GOOGLE_PROJECT_ID</code> - gcloud project id.

## Full node

- <code>MONIKER</code> - Name of the node.
- <code>PERSISTENT_PEERS</code> - List of comma separated persistent_peers in format <node_id@ip:26656>. Persistent peers are nodes that current node is always connected to.
- <code>SEEDS</code> - List of comma separated seeds in format <node_id@ip:26656>. Seeds are nodes that periodicly checks the network for active peers. When someone connects to them, they just send the list of the peers so that the recipient will connect to the returned peers.
- <code>SHOULD_USE_GLOBAL_PEERS</code> - Indicates whether this node should use peers from <code>parentDir/CudosBuilders/config</code> or this node should use the peers defined in this file.
- <code>SHOULD_USE_STATE_SYNC</code> - Indicates whether this node should use statesync in order to sync the chain. Using this method the node will download blockchain's state from a trusted peer thus syncing will be almost instant.

## Gravity bridge ui

- <code>URL</code> - The URL where UI will be accessed. For example: URL=http://localhost.
- <code>CHAIN_ID</code> - ID of the Cosmos chain.
- <code>RPC</code> - Endpoint of Cosmos chain. For example: RPC=http://localhost:26657.
- <code>API</code> - Endpoint of Cosmos chain api. For example: API=http://localhost:1317.
- <code>ERC20_CONTRACT_ADDRESS</code> - Ethereum token contract address.
- <code>BRIDGE_CONTRACT_ADDRESS</code> - Gravity Bridge contract address.
- <code>ETHEREUM_RPC</code> - Address of Ethereum full node. For example: http://12.13.14.15:8545. Do not use infura node.

## Gravity contract deployer

- <code>COSMOS_NODE</code> - The endpoint of Cosmos chain. For example: COSMOS_NODE="http://localhost:26657"
- <code>ETH_NODE</code> - The endpoint of eth full node. For example: ETH_NODE="http://localhost:8545"
- <code>ETH_PRIV_KEY_HEX</code> - The private key of Ethereum wallet that will be used to sign the transaction for contract creation. It can be any Ethereum address that has enough tokens (~0.02ETH). Format is hex without leading "0x". For example: ETH_PRIV_KEY_HEX="a2b......"

## Orchestrator

- <code>FEES</code> - Amount of cudos that will be required by this validator in order to sign any operation. For example: FEES="1acudos"
- <code>GRPC</code> - The endpoint of Cosmos chain. For example: COSMOS_NODE="http://localhost:9090"
- <code>ETHRPC</code> - The endpoint of eth full node. For example: ETH_NODE="http://localhost:8545"
- <code>CONTRACT_ADDR</code> - Gravity Bridge contract address.
- <code>COSMOS_ORCH_MNEMONIC</code> - Mnemonic phrase of orchestrator wallet.
- <code>ETH_PRIV_KEY_HEX</code> - The private key of Ethereum wallet that will be used to sign the transactions for sending funds from Cosmos -> Ethereum. This wallet has been used to register the validator. Format is hex without leading "0x". For example: ETH_PRIV_KEY_HEX="a2b......".

## Root node

- <code>MONIKER</code> - Name of the node.
- <code>CHAIN_ID</code> - Random string without space.
- <code>ORCH_ETH_ADDRESS</code> - Ethereum address of a wallet that will be used to sign the transactions for sending funds from Cosmos -> Ethereum. <em>This is the same wallet which adress should be used later on in orchestrator.env.example -> ETH_PRIV_KEY_HEX</em>.

## Seed node

- <code>MONIKER</code> - Name of the node.
- <code>PERSISTENT_PEERS</code> - List of comma separated persistent_peers in format <node_id@ip:26656>. Persistent peers are nodes that current node is always connected to.
- <code>PRIVATE_PEERS</code> - List of comma separated private peers in format <node_id@ip:26656>. Private peers are nodes that current node do not expose to anyone.
- <code>SHOULD_USE_GLOBAL_PEERS</code> - Indicates whether this node should use peers from <code>parentDir/CudosBuilders/config</code> or this node should use the peers defined in this file.
- <code>SHOULD_USE_STATE_SYNC</code> - Indicates whether this node should use statesync in order to sync the chain. Using this method the node will download blockchain's state from a trusted peer thus syncing will be almost instant.

## Sentry node

- <code>MONIKER</code> - Name of the node.
- <code>PERSISTENT_PEERS</code> - List of comma separated persistent_peers in format <node_id@ip:26656>. Persistent peers are nodes that current node is always connected to.
- <code>PRIVATE_PEERS</code> - List of comma separated private peers in format <node_id@ip:26656>. Private peers are nodes that current node do not expose to anyone.
- <code>SEEDS</code> - List of comma separated seeds in format <node_id@ip:26656>. Seeds are nodes that periodicly checks the network for active peers. When someone connects to them, they just send the list of the peers so that the recipient will connect to the returned peers.
- <code>SHOULD_USE_GLOBAL_PEERS</code> - Indicates whether this node should use peers from <code>parentDir/CudosBuilders/config</code> or this node should use the peers defined in this file.
- <code>SHOULD_USE_STATE_SYNC</code> - Indicates whether this node should use statesync in order to sync the chain. Using this method the node will download blockchain's state from a trusted peer thus syncing will be almost instant.
- <code>TLS_ENABLED</code> - This variable is used to indicate whether the sentry node will have an HTTPs domain. For example: TLS_ENABLED=true.
- <code>TLS_DOMAIN</code> - (Can be skipped if <code>TLS_ENABLED</code> is false). The domain of the sentry node.
- <code>TLS_DOCKER_PATH</code> - (Can be skipped if <code>TLS_ENABLED</code> is false). Path to letsencrypt.