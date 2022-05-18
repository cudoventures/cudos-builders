# Nodes Deployer - Overview

This deployer is capable is starting an entire blockchain. To do so you must specify the network's topology and nodes' role in a file. Please pay attension to the **Remarks** at the end of next section.

# Topology and roles

The best way to define the topology and the roles is to duplicate the <code>parentDir/CudosBuilders/tools-nodejs/deployer-network/config/topology.json.example</code> and rename it to <code>topology.json</code>.

**<code>topology.json</code> is a json file has the following structure:**

```json
{
    "computers": Computer[], // Defines each computer where a node will be deployed.
    "nodes": Node[], // Defines the topology of the network.
    "params": Params, // Global params used by nodes.
}
```

**Computer** object:

Each **computer** defined in the <code>topology.json</code> is accessed by a username. This user should be able to execute **sudo** commands without asking for a password, e.g. it should be in <em>sudoer</em> group. More information can be found <a href="https://www.cyberciti.biz/faq/linux-unix-running-sudo-command-without-a-password/">here</a>

```json
{
    "id": string, // The id of the computer. It is used as a unique identifier of the machine.
    "ip": string, // The IP of the computer or "auto". If set to "auto" then a local docker instance will be created.
    "port": number, // The SSH service port. Usually it is 22.
    "user": string, // The SSH service user. It is optional if "ip" is "auto".
    "sshKey": string, // Optional - Absolute path of the sshKey if available
    "pass": string // The password of the sshKey or user. It can be empty string.
}
```

**Node** object:
```json
{
    "rootValidator": Validator, // Defines the root validator, e.g. the one that starts the network.
    "validators": Validator[], // Defines the validatora other than the root one.
    "seeds": Seed[], // Defines the seed nodes and how they are attached to validators.
    "sentries": Sentry[], // Defines the sentry nodes and how they are attached to validators.
}
```

**Validator** object:
```json
{
    "computerId": string, // The id of the computer where this node will run.
    "validatorId": string, // The id of the current validator. It is used as a unique identifier of the validator.
    "orchEthAddress": string, // The address of a ethereum wallet starting with 0x. (1)
    "ethPrivKey": string // The private key of the "orchEthAddress". (1)
}
```

**Seed** object:
```json
{
    "computerId": string, // The id of the computer where this node will run.
    "validatorId": string, // The id of the current validator where this seed will be attached to.
}
```

**Sentry** object:
```json
{
    "computerId": string, // The id of the computer where this node will run.
    "validatorId": string, // The id of the current validator where this sentry will be attached to.
}
```

**Params** object:
```json
{
    "gravity": ParamsGravity // Defines gravity parameters
}
```

**ParamsGravity** object:
```json
{
    "ethrpc": string, // Ethereum full node endpoint. (1)
    "contractDeploerEthPrivKey": string // Hex-formated private key of a ethereum wallet. It will be used for the gravity contract deployment. (1)
    "etherscanApiKey": string // Etherscan API Key
}
```

(1) It can be empty if the chain is started without **gravity** module or if this validator is not the root-validator.

**<em>Remarks:</em>**
- Each **computer** instance can be used only by a single node.
- The network should have at least **rootValidator**.
- Each **validator** must have at least one **seed** and one **sentry**.
- You must either use only local docker instances (with "ip": "auto") or only remote machines (with "ip": "<some ip address>")

# List of npm commands

**<code>network</code>** - starts the network using the topology defined in <code>parentDir/CudosBuilders/tools-nodejs/deployer-network/config/topology.json</code>. It has 4 parameters:

- topology: A relative path to topology.json based on **tools** folder.
- gravity: 0 (disables the module) or 1 (enabled the module)
- docker-source: <em>remote</em> (downloads the source code from the github) or <em>local</em> (uses local version of the source code)

The parameters are passed in the following way:

<code>npm run network -- --topology ./deployer-network/config/topology.json --gravity 1 --docker-source local</code>
