# Wiki - overview

This section describes the underlying architecture and features of the CudosBuilders repo.

# Chain architecture

## Architecture and node types

Each chain starts with a initializator. It is so called <em>root-node</em>. This node must has a validator and this validator is created by default during the initialization of the chain. Validators are very important nodes and their IP address MUST not be disposed in a public space therefore all connections to validators MUST happen in a private network.

Once we have our <em>root-node</em> we can start connecting other nodes to it. Any node that is running in the chain is called <em>full-node</em>

In order to connect a node to the network we must expose at least one IP address of the chain. As said above, we must not expose our validators' IP addresses. That's why we MUST set 1 or more nodes that are connected to the validator in a private network and then we can safely expose these nodes' IP addresses. These type of nodes are called <em>sentry-node</em>. In short - <em>sentry-node</em> is a <em>full-node</em> that hide validator's existance.

Each node have a configuration parameter that makes the node a <em>seed-node</em>. <em>seed-node</em> is a regular <em>full/sentry-node</em> that scrapes the chain on a regular basis and stores a list of IP addresses of active nodes. When someone connects to a seed node, it respond with a list of active peers that the sender could connect it. 

## Ports

A node is using several ports in order to function propertly.

<em>You are not supposed to specify these ports anywhere. They are configured in the dockerfiles. You could only need to open the ports if you are trying to run a network on a multiple machines. In this case you must open the corresponding ports on the host machines.</em>

Here is a list of ports and their descriptions:

- **1317:** API port
- **9090:** gRPC port
- **26656:** P2P port used by transfering internal data between nodes.
- **26657:** Tendermint RPC server. Reference: <a href="https://docs.tendermint.com/master/rpc/">https://docs.tendermint.com/master/rpc/</a>
- **26660:** Port for prometheus monitoring

Full/Seed nodes use the following points: **26656, 26657, 26660**

Sentry nodes use the following ports: **1317, 9090, 26656, 26657, 26660**

## Data folder

Each build-variant of a node has a <em>data</em> folder. All blockchain information is stored date. Deleting this folder is equivalemnt of deleting a node.

As you can see in <em>Overview</em>, the location of <em>data</em> folder is <code>/parentDir/CudosData</code>. Each build-variant creates a sub-folder inside. The resulting structure is like <code>/parentDir/CudosData/{build-variant}</code>. The exact name of the build-variant's sub-folder is defined in the corresponding **.arg** file.

The data folder could potencially grow in size. So if you are running a build-variant in a cloud or similar environment, where main disk storage is usually limited, make you have a symbolic link from <code>/parentDir/CudosData/{build-variant}</code> to a mounted volume that has >= 500GB.

In the <code>/parentDir/CudosData/{build-variant}</code> folder you can find tendermint.nodeid.

In the <code>/parentDir/CudosData/{build-variant}/config</code> folder you can find genesis.json, config.toml and app.toml.
