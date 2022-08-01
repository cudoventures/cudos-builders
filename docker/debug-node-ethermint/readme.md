# Overview

The purpose of the debug-node is to start a debug-friendly environment.

# Config

1. Prepare the repos as [described](../../readme.md#overview).

1. Setup the workspace using these [docs](../../workspace/readme.md).

1. Prepare the .env

    Make a duplicate of <em>.env.example</em> and rename it to <em>.env</em>. Fill the corresponding variables.

    - <code>DEBUG_CHAIN_ID</code> - Random string without space.
    - <code>ZERO_GAS_PRICE</code> - You can use this variable to set the gas prices to 0acudos thus making the debugging easier. <em>Example: ZERO_GAS_PRICE="true"</em>
    - <code>OPEN_ALL_PORTS</code> - By default only few [ports](../../wiki.md#ports) are open. You can open all ports by setting this variable to true thus making the debugging easier<em>Example: OPEN_ALL_PORTS="true"</em>

1. Prepare the users configuration using the [docs](../readme.md#users-override)

# Usage

1. Config the debug-node as described above

1. Build the node using the shell command
    ```
    docker-compose --env-file ./debug-node.arg -f ./debug-node.yml -f ./users-debug-node.override.yml -p cudos-start-debug-node up --build
    ```
    or by using the VS-code command **Build START DEBUG NODE in docker**

1. Attach shell to the debug-node's container

1. Once the shell is attached you can:

    - Build the binary by using

        ```
        cd ./CudosNode
        make install
        ```

    - Initialize the node by using

        ```
        ./init.sh
        ```

# Remarks

This container is mounting folder from your host filesystem to docker container. So you can modify the file on your file system and then just rebuild & reinit the node inside the container.
