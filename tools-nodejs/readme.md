# Tools-NodeJS overview

This folder contains several sripts written in Node.js. In order to execute any of them you will need a proper nodejs workspace. You can use the global workspace as [described](../workspace/readme.md).

# Configure

Most of the deployers in this folder has a file named <code>secrecs.json.example</code> Duplicate this file and rename it to <code>secrets.json</code> In it you will find predefined instances' names. Let's call them **targets**. Do not change them, just add the corresponding parameters in the empty variables. Each target needs a host, port, username, privateKey, keyPass (if available) and serverPath. If you are deploying to currently running testnets, leave the serverPath as it is - <code>/usr/cudos</code>

# NPM

All of the NPM commands below are available once you navigate to <code>parentDir/CudosBuilders/tools</code> directory.

# Scripts

## ethereum deployer

[Go to docs](./tools-nodejs/deployer-ethereum/readme.md)

## network deployer

[Go to docs](./tools-nodejs/deployer-network/readme.md)

## nodes deployer

[Go to docs](./tools-nodejs/deployer-nodes/readme.md)

## orchestrator deployer

[Go to docs](./tools-nodejs/deployer-orchestrator/readme.md)

## tsl deployer

The deployer contains only a [readme](./tools-nodejs/deployer-tls/readme.md) file that explains how the server should be configured in order to support the Domain and TSL of sentry nodes. Currently this has already been done for public testnet sentry nodes.

## monitoring deployer

[Go to docs](./tools-nodejs/deployer-monitoring/readme.md)
