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
4. Copy genesis time to default_settings.json in explorer

        npm run deploy-utils


