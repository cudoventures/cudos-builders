Run fast sync test on local network 

1. Start root-node - from tasks.json

2. Start sentry-node - from tasks.json


3. Config envs files:
Create folder "envs" in snapshot-test with names:

!!!YOU NEED CHANGE IDS OF NOTES!!!

- snapshot-node-01.env

```
CUDOS_HOME=/usr/cudos/cudos-data
MONIKER=snapshot01
PERSISTENT_PEERS=c4a1e17fd899bcb71aacc6406996094dfd4cdb58@cudos-start-sentry-node-01:26656
SEEDS=
SHOULD_USE_GLOBAL_PEERS=false
```
- snapshot-node-02.env
```
CUDOS_HOME=/usr/cudos/cudos-data
MONIKER=snapshot01
PERSISTENT_PEERS=c4a1e17fd899bcb71aacc6406996094dfd4cdb58@cudos-start-sentry-node-01:26656
SEEDS=
SHOULD_USE_GLOBAL_PEERS=false
```
- fast-sync-node-03.env
```
CUDOS_HOME=/usr/cudos/cudos-data
MONIKER=fastsync01
PERSISTENT_PEERS=c4a1e17fd899bcb71aacc6406996094dfd4cdb58@cudos-start-sentry-node-01:26656,0a5a04ea5b9ed2afc084799da2c229d0e861f128@cudos-full-node-01:26656,9e519846d6f94c8442601710b707855bb41d5b17@cudos-full-node-02:26656
SEEDS=
SHOULD_USE_GLOBAL_PEERS=false
```

Log in the cudos-full-node-01 and cudos-full-node-02 and execute to get the id of the node:
``
cudos-noded tendermint show-node-id
``


4. Start snapshots-nodes and fast-sync node
``
docker-compose -f ./docker-compose.yml -p cudos-snapshots-test up --build
``

5. Wait to sync atleast till 100 

Get sync state height:

curl -s http://localhost:60601/commit | jq "{height: .result.signed_header.header.height, hash: .result.signed_header.commit.block_id.hash}"

curl -s http://localhost:60602/commit | jq "{height: .result.signed_header.header.height, hash: .result.signed_header.commit.block_id.hash}"

curl -s http://35.232.27.92:26657/block | jq -r '.result.block.header.height + "\n" + .result.block_id.hash'

curl -s http://35.232.27.92:26657/commit | jq "{height: .result.signed_header.header.height, hash: .result.signed_header.commit.block_id.hash}"

curl -s http://35.232.27.92:26657/block_search | jq "{height: .result.signed_header.header.height, hash: .result.signed_header.commit.block_id.hash}"

block_search

Example response:
``
"height": "497",
"hash": "F112080FE87895C799F74A41CE10048C8B357DA385CB9F0CC768A94171BC10F7"
``

6. We can then configure Tendermint to use state sync in config.toml of fast-sunc-node-03 in data folder: 

[statesync]
enable = true
rpc_servers = "cudos-full-node-01:26657,cudos-full-node-02:26657"
trust_height = 497
trust_hash = "F112080FE87895C799F74A41CE10048C8B357DA385CB9F0CC768A94171BC10F7"
trust_period = "336h"  # 2/3 of unbonding time

7. Enter in fast-sunc-node-03 container and start cudos-noded

``
cudos-noded start
``

