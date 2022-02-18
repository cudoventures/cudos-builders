# Phase 4 instructions Step 1

This section describes the first steps needed for validator setup as part of the Phase 4 testnet launch.

## Prerequisites
Check all the needed prerequisites [here](./prerequisites.md).
### Setup the environment
You need to have a local copy of our build tools.Create your main Cudos directory. On the first row you can define where all Cudos data will be stored.

```
export CUDOS_DIR="/usr/cudos"
mkdir $CUDOS_DIR

cd $HOME
git clone --branch cudos-master https://github.com/CudoVentures/cudos-builders.git CudosBuilders
```

## Nodes initialization

### Initialize the Validator
Go into the newly created CudosBuilders directory and make sure the init.sh can be executed.
```
cd CudosBuilders
sudo chmod +x ./tools-bash/constructor/src/init.sh

```
Copy the init.env.example and rename it to init.env. 
```
cd ./tools-bash/constructor/config

cp init.env.example init.env
```

Example content of the file:

```
PARAM_SOURCE_DIR="<CudosData dir>" 
PARAM_VALIDATOR_MNEMONIC="<KEY>" 
PARAM_KEYRING_OS_PASS="<PASS>"
PARAM_VALIDATOR_LEDGER_TYPE="default"
PARAM_VALIDATOR_LEDGER_ACCOUNT_NAME=""
PARAM_COMMISSION_RATE="0.10" 
PARAM_COMMISSION_MAX_RATE="0.20" 
PARAM_COMMISSION_MAX_CHANGE_RATE="0.01" 
```

**PARAM_SOURCE_DIR** is where the repos will be cloned and the binary compiled. It should be an existing and empty folder. The same you created above.

**PARAM_VALIDATOR_MNEMONIC** is the private key of the account you want to use for your validator.

**PARAM_KEYRING_OS_PASS** is the password of your keyring.

**PARAM_VALIDATOR_LEDGER_TYPE** is the type of the ledger you are using. Use "default" or "ledger". If set to "ledger" the PARAM_VALIDATOR_LEDGER_ACCOUNT_NAME should be specified.

**PARAM_VALIDATOR_LEDGER_ACCOUNT_NAME** is you ledger account. Only applicable if PARAM_VALIDATOR_LEDGER_TYPE="ledger", otherwise leave as "".

**PARAM_COMMISSION_RATE** is commision rate of the validator. Must be between 0 and the validator's PARAM_COMMISSION_MAX_RATE.

**PARAM_COMMISSION_MAX_RATE**  Can't be changed later.

**PARAM_COMMISSION_MAX_CHANGE_RATE** Can't be changed later.

NOTE: It is advisable you do NOT use your mainnet mnemonic for the test phase.


Copy the node.env.example and rename it to node.env. 
```
cd ./tools-bash/constructor/config

cp node.env.example node.env
```

Example content of the node.env file:

```
MONIKER="<name of the node>"
```


**Now it's time to init your node.**

```
export WORKING_DIR="<whatever it is>"
cd ${WORKING_DIR}/CudosBuilders/tools-bash/constructor
./src/init.sh clustered-validator-node

```

The command will use the configuration you have setup in the previous step and build the needed binaries. Successful run should print something like:
<img src="./init-full.png">

<!--
If you see any additional messages or error please refer to the troubleshooting section.
-->

## Genesis submission

Once your validator is running you should get it's genesis. It is located under ${CUDOS_DIR}/tools-bash/constructor/exports on your machine. To get the file of the you can use

```
GENESIS=$(ls ${CUDOS_DIR}/tools-bash/constructor/exports)
cat $GENESIS

```
Once you get the file contents submit them as a json file in https://github.com/CudoVentures/cudos-gentx. The name of the file should match the moniker of your validator node.

# Things to keep in mind
1. The folder you use for a node needs to be created and empty. You will get errors otherwise.
2. If you are running more than one node on the same server, you might not be able to create the docker because they will try to open the same ports.

<!--
# Troubleshooting
-->