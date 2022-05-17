**Outdated!**
=

# Deployer nodes - overview

This deployer is responsible of the deployments of root, seed, sentry and full nodes.

# Configure

Please refer to these [docs](../readme.md#configure)

# Usage:
1. Configure <code>secrets.json</code> in this deployer as described above.
2. Configure the ENV variables in <code>parentDir/CudosBuilders/docker/root-node</code> (if you are going to build a root-node)
- Copy <em>root-node.env.example</em> to:
    - <em>root-node.testnet.private.env</em> (for root-validator of the private testnet builds)
    - <em>root-node.testnet.public.zone01.env</em> (for root-validator of the public testnet builds)
- Fill the required fields as described in the "ENV files fields" section.
3. Configure the ENV variables in <code>parentDir/CudosBuilders/docker/seed-node</code> (if you are going to build a seed-node)
- Copy <em>seed-node.env.example</em> to:
    - <em>seed-node.testnet.private.env</em> (for 1st seed node of the private testnet builds)
    - <em>seed-node.testnet.public.zone01.env</em> (for 1st seed node of the public testnet builds)
    - <em>seed-node.testnet.public.zone02.env</em> (for 2nd seed node of the public testnet builds)
    - <em>seed-node.testnet.public.zone03.env</em> (for 3th seed node of the public testnet builds)
- Fill the required fields as described in the "ENV files fields" section.
4. Configure the ENV variables in <code>parentDir/CudosBuilders/docker/sentry-node</code> (if you are going to build a sentry-node)
- Copy <em>sentry-node.env.example</em> to:
    - <em>sentry-node.testnet.private.env</em> (for 1st sentry node of the private testnet builds)
    - <em>sentry-node.testnet.public.zone01.env</em> (for 1st sentry node of the public testnet builds)
    - <em>sentry-node.testnet.public.zone02.env</em> (for 2nd sentry node of the public testnet builds)
    - <em>sentry-node.testnet.public.zone03.env</em> (for 3th sentry node of the public testnet builds)
- Fill the required fields as described in the "ENV files fields" section.
5. Configure the ENV variables in <code>parentDir/CudosBuilders/docker/full-node</code> (if you are going to build a validator different from the root one)
- Copy <em>full-node.env.example</em> to:
    - <em>full-node.testnet.public.zone02.env</em> (for 2nd full node of the public testnet builds)
    - <em>full-node.testnet.public.zone03.env</em> (for 3th full node of the public testnet builds)
- Fill the required fields as described in the "ENV files fields" section.

# List of npm commands:

All of the NPM commands below are available once you navigate to <code>parentDir/CudosBuilders/tools-nodejs</code> directory.

**<code>deploy--init--start_root-node-testnet-public-zone01</code>** - deploys, initializes and starts the root-validator of the public testnet using <code>secrets.json</code> in the deployer's folder.

**<code>deploy--init--start_seed-node-testnet-public-zone01</code>** - deploys, initializes and starts the 1st seed node of the public testnet using <code>secrets.json</code> in the deployer's folder.

**<code>deploy--init--start_sentry-node-testnet-public-zone01</code>** - deploys, initializes and starts the 1st sentry node of the public testnet using <code>secrets.json</code> in the deployer's folder.

**<code>deploy--init_validator-node-testnet-public-zone02</code>** - deploys and initializes the validator-02 of the public testnet using <code>secrets.json</code> in the deployer's folder. <em>Unlike the root-validator, the validator-02 is only initialized and NOT started, because it MUST be configured before it can be started. The configuration can be made once its seeds and sentries are up and running. More about this in Deployment procedure section</em>

**<code>deploy--config--start_validator-node-testnet-public-zone02</code>** - deploys, configures and starts the validator-02 of the public testnet using <code>secrets.json</code> in the deployer's folder.

**<code>deploy--init--start_seed-node-testnet-public-zone02</code>** - deploys, initializes and starts the 2nd seed node of the public testnet using <code>secrets.json</code> in the deployer's folder.

**<code>deploy--init--start_sentry-node-testnet-public-zone02</code>** - deploys, initializes and starts the 2nd sentry node of the public testnet using <code>secrets.json</code> in the deployer's folder.

**<code>deploy--init_validator-node-testnet-public-zone03</code>** - deploys and initializes the validator-03 of the public testnet using <code>secrets.json</code> in the deployer's folder. <em>Unlike the root-validator, the validator-03 is only initialized and NOT started, because it MUST be configured before it can be started. The configuration can be made once its seeds and sentries are up and running. More about this in Deployment procedure section</em>

**<code>deploy--config--start_validator-node-testnet-public-zone03</code>** - deploys, configures and starts the validator-03 of the public testnet using <code>secrets.json</code> in the deployer's folder.

**<code>deploy--init--start_seed-node-testnet-public-zone03</code>** - deploys, initializes and starts the 3rd seed node of the public testnet using <code>secrets.json</code> in the deployer's folder.

**<code>deploy--init--start_sentry-node-testnet-public-zone03</code>** - deploys, initializes and starts the 3rd sentry node of the public testnet using <code>secrets.json</code> in the deployer's folder.

**<code>deploy--init--start_root-node-testnet-private</code>** - deploys, initializes and starts the root-validator of the private testnet using <code>secrets.json</code> in the deployer's folder.

**<code>deploy--init--start_seed-node-testnet-private</code>** - deploys, initializes and starts the seed node of the private testnet using <code>secrets.json</code> in the deployer's folder.

**<code>deploy--init--start_sentry-node-testnet-private</code>** - deploys, initializes and starts the sentry node of the private testnet using <code>secrets.json</code> in the deployer's folder.
