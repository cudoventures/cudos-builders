# Constructor Instructions Step 1

This section describes the first steps needed for validator setup as part of the genesis of the Cudos network.

Please note that this process must be run as the root user.

## Prerequisites
Check all the needed prerequisites [here](./prerequisites.md).
### Setup the environment
The constructor script will clone copies of the Cudos repositories into /usr/cudos, so this directory must be empty but present before the script is run.
Please be aware that the following commands will remove and then recreate the /usr/cudos directory.

```bash
  rm -rf /usr/cudos
  mkdir /usr/cudos
```

Clone the CudosBuilders repository into the root home directory
```bash
  cd $HOME
  git clone --branch v1.0.0 https://github.com/CudoVentures/cudos-builders.git CudosBuilders
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
cp ./tools-bash/constructor/config/init.env.example ./tools-bash/constructor/config/init.env
```
Enter the newly copied file with the command below:
```
nano ./tools-bash/constructor/config/init.env
```
Fill the parameters as described bellow. Please look at the description for each parameter and fill it based on your needs.
<p>This is an example content of the file.</p>

```
PARAM_SOURCE_DIR="/usr/cudos" 
PARAM_VALIDATOR_MNEMONIC="<KEY>" 
PARAM_KEYRING_OS_PASS="<PASS>"
PARAM_COMMISSION_RATE="0.10" 
PARAM_COMMISSION_MAX_RATE="0.20" 
PARAM_COMMISSION_MAX_CHANGE_RATE="0.01" 
```

**PARAM_SOURCE_DIR** is where the repos will be cloned and the binary compiled. It should be an existing and empty folder. (Please leave set to `/usr/cudos`) 

**PARAM_VALIDATOR_MNEMONIC** is the private key of the account you want to use for your validator.

**PARAM_KEYRING_OS_PASS** is the password that *you must create* that you will use to lock your keystore.

**PARAM_COMMISSION_RATE** is commission rate of the validator. Must be between 0 and the validator's PARAM_COMMISSION_MAX_RATE. The value is in percentage, where 0.10 means 10%.

**PARAM_COMMISSION_MAX_RATE**  Can't be changed later. The value is in percentage, where 0.20 means 20%.

**PARAM_COMMISSION_MAX_CHANGE_RATE** Can't be changed later. The value is in percentage, where 0.01 means 1%.

NOTE: It is advisable you do NOT use your mainnet mnemonic for the test phase.


Copy the node.env.example and rename it to node.env. 
```
cp ./tools-bash/constructor/config/node.env.example ./tools-bash/constructor/config/node.env
```
Enter the newly copied file with the command below:
```
nano ./tools-bash/constructor/config/node.env
```
Then enter the following:

```
MONIKER="<name of the node, it MUST contains only lowercase english letters and/or a dash>"
PERSISTENT_PEERS=""
SEEDS=""

SHOULD_USE_GLOBAL_PEERS="false"
SHOULD_USE_STATE_SYNC="false"

MONITORING_ENABLED="false"

EXTERNAL_ADDRESS=""
ADDR_BOOK_STRICT="true"
```


**Now it's time to init your node.**

```
cd ${HOME}/CudosBuilders/tools-bash/constructor
sudo ./src/init.sh clustered-validator-node
```

The command will use the configuration you have setup in the previous step and build the needed binaries. Successful run should print something like:
<img src="./init-full.png">

<!--
If you see any additional messages or error please refer to the troubleshooting section.
-->

## Genesis submission

Once your validator has been successfully initialised, the genesis gentx file must be sent to Cudo for inclusion in the final genesis.

Please enclose the following:

- The result of the md5sum command below
- The json file in its original state with its original name

```bash
md5sum ${HOME}/CudosBuilders/tools-bash/constructor/exports/genesis*.json
```

Please then send the **json** file as an attachment (without changing its name), with the output of the md5sum command in the body, of a mail to the Cudos team at [services@cudoventures.com](mailto:services@cudoventures.com).

<!--
# Troubleshooting
-->
