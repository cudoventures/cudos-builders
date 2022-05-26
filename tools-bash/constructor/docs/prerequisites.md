
## Install prerequisites

You can run your node in different operating systems such as Debian 10, Ubuntu, WSL, and macOS Catalina version 10.15.4 or above. If you are installing docker for the first time, please check the next section, “Notes for Installing Docker for the First Time”.

The first step is to ensure that you have set up all requirements and prerequisites as the following:

- Install [Docker](https://docs.docker.com/engine/install/) 20.10.6 or above
- Install [Docker Compose](https://www.devopsroles.com/how-to-install-docker-compose-on-ubuntu/) 1.29.x using step 3 and step 4 from the linked article
- Install [Git](https://github.com/git-guides/install-git)
- Install a code editor such as Nano, Atom, etc.
- Install JQ to extract data from JSON documents:
```
apt update
apt install -y jq
```

Missing any of the prerequisites above can lead to errors and being unable to run your node. It is recommended to have the latest version of Docker and Docker compose installed. If you already installed them, you can check the version by running the following commands in your terminal:
```
sudo docker -v
sudo docker-compose -v
```
## Notes for installing docker for the first time

<em>Follow the docker install procedure for your OS</em>

* [Get docker](https://docs.docker.com/get-docker/)
* [Install compose](https://docs.docker.com/compose/install/)

## Ports

A node is using several ports in order to function properly.
Here is a list of ports and their descriptions:

- **1317:** API port.
- **9090:** gRPC port.
- **26656:** P2P port used by transferring internal data between nodes.
- **26657:** Tendermint RPC server. Reference: <a href="https://docs.tendermint.com/master/rpc/">https://docs.tendermint.com/master/rpc/</a>
- **26660:** Port for Prometheus monitoring.

Full/Seed nodes use the following ports: **26656, 26657, 26660**.

Sentry nodes use the following ports: **1317, 9090, 26656, 26657, 26660**.

The Docker instance is binding the above ports to your host machine automatically, so you just have to open the above ports on your machine where the Cudos nodes are running.
