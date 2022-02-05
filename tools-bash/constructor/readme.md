# Constructor
## Overview
The purpose of the constructor is to init and start nodes on a predefined network.

## Params setting
All the parameters that an user needs to set are in the .env files in the config folder.
To set them, copy the .env.example files and fill them.

1. Init.env
    1. PARAM_SOURCE_DIR is where the repos will be wodnloaded and the binary compiled. It should be an existing and empty folder.
    2. PARAM_VALIDATOR_MNEMONIC is the mnemonic of the wallet that will be used to create a validator.
    3. PARAM_KEYRING_OS_PASS is the password of the store where the keyring will pe kept. You will need this to later access the wallet and sign with it.

2. node.env
    1. MONIKER is the name of the node that you are setting as it will be seen in the network.
    2. PERSISTENT_PEERS are peers that your node will try to connect to. They are in the format "xyz.....@<ip_or_domain_naim>:<port>"
    3. PRIVATE_PEERS are usually the root nodes. Those are node ids that you don't want to send to expose to the public. You can connect to them, but not send them when asked through the PEX.
    4. SEEDS are in the same format as PERSISTENT_PEERS but for seed nodes.
    5. SHOULD_USE_GLOBAL_PEERS - if this is set to true, the script will look for a file with global peers in it and use it instead of the ones you set in here.
    6. SHOULD_USE_STATE_SYNC - if set to true your node will try to use state sync, which is a lot faster way to sync, but requires some of the peers you are connected to provide this service.

3. start.env
    1. PARAMS_PERSISTENT_PEERS contains PERSISTENT_PEERS in the format "xyz.....@<ip_or_domain_naim>:<port>" separated by comas.
    2. PARAMS_SEED is same as the above, but for seed nodes.
    3. PARAMS_PRIVATE_PEER_IDS is the node ids of the nodes you would like not to send to the network, when requested through the PEX.

## Init node
To setup a node you first need to initialize it. This will build the binary, make a node init and then set all the params inside the app.toml and config.toml config files.

When you first clone the repo, the scripts you need to execute might not be executable. So if you are under linux, you would need to make them executable.
```
sudo chmod +x cudos-builders/tools-bash/constructor/src/init.sh
```
To init the node you would have to execute init.sh in th constructor/src folder, but from contructor folder. So it would be something like this:
```
cd cudos-builders/tools-bash/constructor
./src/init.sh <the type of node you want to init>
```
Types of nodes are: full-node|seed-node|sentry-node|clustered-validator-node|standalone-validator-node

## Start node
To start a node it first needs to be innitialized from the step above. This will setup a docker container with the node started inside of it.

To do this, you need to make the start script executable again:
```
sudo chmod +x cudos-builders/tools-bash/constructor/src/start.sh
```

After that, to start the node, run (again from the constructor folder):
```
./src/start.sh <the type of node you want to init>
```

## Things to keep in mind
1. The folder you use for a node needs to be created and empty. You will get errors otherwise.
2. If you are running more than one node on a same server, you might not be able to create the docker, because they will try to ppen the same ports.


# TO DO
1. Check validators' node ports in .docker-compose
1. Add Ledger to init script
