# Testnet deployment

## Prerequirements for deploying
    SSH key for accessing Google Cloud Infrastructure
    npm i (in ./CudosBuilders/tools)
    prepare secrets.json based on secrets.json.example in each module where available (deployer-root-node, deployer-utils, etc.)

## Deployment root node
    npm run deploy-root-node-testnet or npm run deploy-and-init-root-node-testnet

## Deployment seed node
1. Download genesis.json from root-node to ./CudosBuilders/genesis.testnet.json
2. Download tendermint.nodeid from root-node
3. Modify seed-node.testnet.env using correct IP address of root-node and its tendermint id, which can be found in tendermint.nodeid, as PERSISTENT_PEERS
4. Modify seed-node.testnet.env using its tendermint id, which can be found in tendermint.nodeid, as PRIVATE_PEERS
    npm run deploy-seed-node-testnet or npm run deploy-and-init-seed-node-testnet

## Deployment sentry node
1. Download genesis.json from root-node to ./CudosBuilders/genesis.testnet.json
2. Download tendermint.nodeid from root-node
3. Download tendermint.nodeid from seed-node
4. Modify sentry-node.testnet.env using correct IP address of root-node and its tendermint id, which can be found in tendermint.nodeid, as PERSISTENT_PEERS
5. Modify sentry-node.testnet.env using its tendermint id, which can be found in tendermint.nodeid, as PRIVATE_PEERS
6. Modify sentry-node.testnet.env using correct IP address of seed-node and its tendermint id, which can be found in tendermint.nodeid, as SEEDS
    npm run deploy-sentry-node-testnet or npm run deploy-and-init-sentry-node-testnet

# Deploy utils
1. Download faucet.wallet from root-node
2. Modify faucet.testnet.env using mnemonic from downloaded faucet.wallet
3. Make sure all values in faucet.testnet.env are not empty

1. Copy genesis time to settings.json in explorer
2. Copy node id to notion
3. Download faucet.wallet from cudos-root-node
4. Copy faucet mnemonic in /project-faucet-cli/run-testnet.sh
5. Download cudos-noded binary from cudos-root-node and copy it to /project-faucet-cli/bin/cudos-noded
6. Upload binary and genesis to notion

        npm run deploy-utils


