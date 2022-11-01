# Overview

The goal of this project is to upgrade a running blockchain node which has stopped because of an accepted software upgrade proposal.

You must create an SSH connection from a machine (<em>host computer</em>) to the machine where the node is running (<em>target computer</em>).

All the executions below MUST happen on <em>target computer</em>. Nothing is executed on the <em>host computer</em> itself.

## Prerequirements on host computer

SSH Connection to the machine where a CUDOS node is running

## Prerequirements on target machine

Enough free space to make a backup. The backup will be as large sa your current <em>CudosData</em> folder.

Docker must be installed

Docker-compose must be installed

JQ must be installed

Git must be installed

Python3 must be installed

## Genesal usage

1. Connect to <em>target computer</em> using SSH
1. Clone cudos-builders repo somewhere (usually in your home directory) 
```
git clone --branch v1.0.1 https://github.com/CudoVentures/cudos-builders.git CudosBuilders
```
1. Create config files according to **Config** section below
1. Execute the script according to **Usage** section below

# Config

All of the config files are in ./upgrade/config folder.

**Important: Do not leave any comments in any .env file**

## Step 1

Go to the `upgrade` folder 
```
cd CudosBuilders/tools-bash/upgrade
cp ./config/node.env.example ./config/node.env 
```

Edit the ./config/node.env file. You can use
```
nano ./config/node.env 
```

or
```
vim ./config/node.env 
```

 Prepare the `node.env` based on `node.env.example`. It contains the following variables:

1. **PARAM_NODE_NAME:** the name of the node that is going to be upgraded. Possible values are: root-node, seed-node, sentry-node or full-node. <em>Example: PARAM_NODE_NAME="sentry-node"</em>
1. **PARAM_SOURCE_DIR:** A dir where repos were initially cloned during initial setup of the node, usually we use something like "/usr/cudos" <em>Example: PARAM_SOURCE_DIR="/usr/cudos"</em>
1. **PARAM_HAS_ORCHESTRATOR:** **Optional** indicates whether this node has an orchestrator or not. This param is designed for CUDOS orchestrator operator. You can leave it empty if your not sure what this it is about.<em>Example: PARAM_HAS_ORCHESTRATOR="false"</em>

# Usage

There are 2 main scripts - <em>node</em> and <em>backup</em>.
**Important**: The side effect of executing any of these scripts will be a folder, defined in PARAM_SOURCE_DIR at node.env on <em>target computer</em>
**Important**: Execute these scripts only when all config files are ready.
**Important**: All of the scripts below must be executed from ./upgrade folder.
**Important**: Make sure that <em>./src/backup.sh</em> and <em>./src/node.sh</em> have execute permission. 
## Backup
Backup script has four usages:
### Create a backup
The command below creates a backup of current source files and data files.
```
sudo ./src/backup.sh create
```
### Restore a backup
The command restores a backup that has been created using <em>Create a backup</em>
```
sudo ./src/backup.sh restore
```
### Validate a backup
The command validates whether a created backup using <em>Create a backup</em> is valid
```
sudo ./src/backup.sh validate
```
### Clean a backup
The command deletes previously created backup using <em>Create a backup</em>
```
sudo ./src/backup.sh clean
```

## Node

Node script has following usages:

### Validate the config/setup
The command check for installed binaries, config files, repos, etc.
```
sudo ./src/node.sh validate
```

### Perform an upgrade
The command upgrades a node
```
sudo ./src/node.sh upgrade
```

## Launch sequence

1. Create a backup
    
    <em>Note:</em> Creating of a backup could take a lot of time. It is very important to do it ONCE upgrade hight has been reached NOT before that. Make sure there is no error messages in the console. If something went wrong you can always re-create the backup. Make sure that the backup is correct (You can check it using <em>Validate a backup</em>) before proceeding to the next step.
2. Validate
    <em>Note:</em> The validate command will print the information about current node. Read it carefully and proceed with the next step only if this information is valid. If it is not valid, please contact CUDOS and make the appropriate changes. If the changes invole any of the previously backup-ed files, you must re-create the backup.
3. Upgrade
    <em>Note: </em> The upgrade could take up to 20min. If there is any error message during the upgrade you must restore a backup (using <em>Restore a backup</em>) and start over.
