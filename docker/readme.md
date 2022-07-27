# Overview

This folder contains docker specific files organized by build-target. They are used in build processes in local development as well as in deployment builds. 

## Build targets

The folder has following build-targets:

<em>**binary-builder**</em> - The cudos-node daemon used by full-node, root-node, seed-node, sentry-node and standalone-node.

<em>**config**</em> - Contains genesises, peers and seeds for local dev, public and private testnets. 

<em>**debug-node**</em> - Cudos node that uses local source files resulting in easy debug capabilities

<em>**ethereum**</em> - Ethereum light or full node.

<em>**faucet**</em> - Faucet used by local dev, public and private testnets.

<em>**full-node**</em> - Cudos full node that connects to local chain, private or public testnets. It can be promoted to a validator.

<em>**gravity-bridge-ui**</em> - Gravity Bridge UI used to transfer funds between the Cosmos <-> Ethereum chains.

<em>**cudos-nft-minting-ui**</em> - Cudos NFT Minting UI is used as GUI of the NFT features of the CUDOS network/

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

### users-override

In most docker instances in this project host file system is mounted inside the docker. This could cauce a permission errors unless it is correctly handled. That's why there are configuration files where you MUST specify your host account details in order linux user that is created inside docker container to match the host one. Some of the build-targers have **users-*.override.yml**. This file is used along with main **.yml** file of each build-variant in order to specify the linux user and group that each container should use.

In order to configure the users, make a duplicate of **users-*.override.yml.example** and rename it to **users-*.override.yml.example**. By default the user and group ids are set to **0** and corresponding names are set to **root**. Please fill your host's user and group details.

### build-variants

There are a lot of build-variants. In order to make the dev process easier and more efficient there is a set of predefined build-variants that are defined in .vscode folder (described below). This folder is suitable only for VSCode. If you are using different editor, you can open the <em>tasks.json</em> file in .vscode folder and see the corresponsing set of files (.yml, .arg, .env, .override.yml) that are used by the predefined build-variants. More information about the purposed of each build target will follow in <em>local dev procedure below</em>.

Some of these build-variats are used by npm commands described in <em>setup tools</em> section.
