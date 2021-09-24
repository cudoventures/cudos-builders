# Overview

This project contains a set of building scripts for CudosNetwork. It depends on 5 other projects and should be downloaded manually. Here is the list:
1. CudosNode (https://github.com/CudoVentures/cudos-node)
2. CudosGravityBridge (https://github.com/CudoVentures/cosmos-gravity-bridge)
3. CudosGravityBridgeUI (https://github.com/CudoVentures/cudos-gravity-bridge-ui)
4. CudosExplorer (https://github.com/CudoVentures/big-dipper)
5. CudosFaucet (https://github.com/CudoVentures/faucet)

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

In the above directory structure, the folders' names are REQUIRED. Carefully rename everyone project to match the folder names above. Create an empty folder CudosData in <code>parentDir</code>

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

Most of the deployers below has a file named <code>secrecs.json.example</code> Duplicate this file and rename it to <code>secrets.json</code> In it you will find predefined instances' names. Let's call them **targets**. Do not change them, just add the corresponding parameters in the empty variables. Each target needs a host, port, username, privateKey, keyPass (if available) and serverPath. If you are deploying to currently running testnets, lease the serverPath as it is - <code>/usr/cudos</code>

## Ethereum deployer

### Usage:
1. Configure <code>secrets.json</code> in this deployer as described above.
2. Use some of the npm commands.

### List of npm commands regarding this deployer:

**<code>deploy--ethereum-rinkeby</code>** - deploys the rinkeby ethereum full node to gcloud using <code>secrets.json</code> in the deployer's folder.

## Gravity bridge ui deployer

### Usage:
1. Configure <code>secrets.json</code> in this deployer as described above.
2. Configure the ENV variables in <code>parentDir/CudosBuilders/gravity-bridge-ui</code>
- Copy <em>gravity-bridge-ui.env.example</em> to:
    - <em>gravity-bridge-ui.dev.env</em> (for dev builds)
    - <em>gravity-bridge-ui.testnet.private.env</em> (for private testnet builds)
    - <em>gravity-bridge-ui.testnet.public.env</em> (for public testnet builds)
- Fill the required fields as described in the "ENV files fields" section.

### List of npm commands regarding this deployer:

**<code>deploy-gravity-bridge-ui-testnet-public</code>** - deploys gravity-bridge-ui to public testnet using <code>secrets.json</code> in the deployer's folder.

**<code>deploy-gravity-bridge-ui-testnet-private</code>** - deploys gravity-bridge-ui to private testnet using <code>secrets.json</code> in the deployer's folder.

## network deployer

To do

## nodes deployer

To do

## orchestrator deployer

To do

## tsl deployer

To do

## utils deployer

To do

# Setup docker (docker folder)

To do

# Using predefined scripts (.vscode folder)

To do

# ENV files fields

Always copy the example .env.example file. You could leave the default values as they are and just add the required fields as described below in this section.

## Explorer

- <code>MONGO_URL</code> - MongoDB connection string. It could be empty for dev builds.
- <code>ROOT_URL</code> - The URL where explorer will be access from. For example ROOT_URL=http://localhost

 ## Faucet

- <code>CREDIT_AMOUNT</code> - Default credit amount in acudos. It can safely be as MAX_CREDIT
- <code>MAX_CREDIT</code> - Max credit amount in acudos.
- <code>NODE</code> - Cosmos URL. For example NODE="http://localhost:26657"
- <code>MNEMONIC</code> - Mnemonic phrase of wallet that will be used to send tokens from.
- <code>GOOGLE_API_KEY</code> - Google Api Key for captcha enterprise
- <code>CAPTCHA_SITE_KEY</code> - Google Site key for captcha enterprice
- <code>GOOGLE_PROJECT_ID</code> - gcloud project id

## Gravity bridge ui

- <code>URL</code> - The URL where UI will be accessed. For example URL=http://localhost
- <code>CHAIN_ID</code> - ID of the cosmos chain.
- <code>RPC</code> - Endpoint of cosmos chain. For example RPC=http://localhost:26657
- <code>API</code> - Endpoint of cosmos chain api. For example API=http://localhost:1317
- <code>ERC20_CONTRACT_ADDRESS</code> - Ethereum token contract address
- <code>BRIDGE_CONTRACT_ADDRESS</code> - Gravity Bridge contract address
- <code>ETHEREUM_RPC</code> - Address of Ethereum full node. For example http://12.13.14.15:8545. Do not use infura node.



- <code></code> - 