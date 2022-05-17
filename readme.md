# Overview

This project contains a set of building scripts for CudosNetwork. It depends on 6 other projects which should be downloaded manually. Here is the list:
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

# CudosBuilders structure

<em>.vscode</em> - Contains predefined set of commands for VSCode only. They can be triggered by Control(or Cmd)+Shift+B.

<em>docker</em> - Contains configuration, docker, docker-compose files for all build variants of the cudos network.

<em>public-docs</em> - Contains documentation about local dev and DRnet

<em>tools-nodejs</em> - Contains scripts for network deployment and management using Node.js

<em>tools-bash</em> - Contains scripts for network deployment and management using Bash

<em>workspace</em> - Contains VS Code specific files for building a devcontainer including an example of .dockerignore file

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

<em>The versions of docker and docker-compose are just an example. It is quite likely to work with older/newer versions too.</em>

# Use cases

## Join a network

Use these [docs](./tools-bash/client/readme.md) to connect to one of the already existing networks.

## Prepare to join launching network

Follow [these docs](./tools-bash/constructor/readme.md) if you want to be part of the network right at its start.

## Launch a network

Follow [these docs](./tools-bash/launcher/readme.md) in order to prepare the root-validator and its compaion nodes for starting a new network

## Start/Upgrade an IBC relayer

The [docs](./tools-bash/relayer/) in this section will guide you through the process of starting or upgrading the Hermes IBC relayer that is used for Osmosis comunication.

## Network upgrade

Use this [docs](./tools-bash/upgrade/) when you want to upgrade a node that was started either with the constructor script or with the client script.

## Start a local node for testing purposes

Using the debug-node is the best for local dev. Refer to its [docs](./docker/debug-node/readme.md) for more information.

## Start a local network for testing purposes

You can use one of following methods in order to create a blockchain

1. Use these [docs](./public-docs/local-network/local-network.md) for starting a local network for testing.
1. Use these [docs](./tools-nodejs/deployer-network/readme.md) to start a network by using a configuration file.

## Utility scripts

There are several utility scripts with varios use cases like starting a complete blockchain network by using a single config file. For more information refer to [tool-nodejs](./tools-nodejs/readme.md) section.

## Setup the dev workspace

The dev workspace is best suited for you if you plan to develop a new features to the CudosNetwork ecosystem. You can find more information to do it [here](./workspace/readme.md).

# Wiki

The [wiki](./wiki.md) section describes the underlying architecture and features of the CudosBuilders repo.





