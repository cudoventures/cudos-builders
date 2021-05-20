# Testnet deployment

## Prerequirements for deploying
    SSH key for accessing Google Cloud Infrastructure
    npm i (in ./CudosBuilders/tools)
    prepare secrets.json based on secrets.json.example in each module where available (deployer-root-node, deployer-utils, etc.)

## Deployment root node
    npm run deploy-root-node-testnet or npm run deploy-and-init-root-node-testnet

## Deployment seed node
1. Copy genesis.json from root-node to ./CudosBuilders/genesis.testnet.json using SSH
    npm run deploy-seed-node-testnet or npm run deploy-and-init-seed-node-testnet

## Deployment sentry node
    npm run deploy-sentry-node-testnet or npm run deploy-and-init-sentry-node-testnet

# Deploy utils
1. Copy genesis time to settings.json in explorer
2. Copy node id to notion
3. Download faucet.wallet from cudos-root-node
4. Copy faucet mnemonic in /project-faucet-cli/run-testnet.sh
5. Download cudos-noded binary from cudos-root-node and copy it to /project-faucet-cli/bin/cudos-noded
6. Upload binary and genesis to notion

        npm run deploy-utils


