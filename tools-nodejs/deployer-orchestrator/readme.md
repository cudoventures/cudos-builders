**Outdated!**
=

# Configure

Please refer to these [docs](../readme.md#configure)

# Usage:
1. Configure <code>secrets.json</code> in this deployer as described above.
2. Configure the ENV variables in <code>parentDir/CudosBuilders/docker/orchestator</code>
- Copy <em>orchestrator.env.example</em> to:
    - <em>orchestrator.testnet.private.env</em> (for private testnet builds)
    - <em>orchestrator.testnet.public.zone01.env</em> (for public testnet builds of the root-validator)
    - <em>orchestrator.testnet.public.zone02.env</em> (for public testnet builds of the validator-02)
    - <em>orchestrator.testnet.public.zone03.env</em> (for public testnet builds of the validator-03)
- Fill the required fields as described in the "ENV files fields" section.

# List of npm commands:

All of the NPM commands below are available once you navigate to <code>parentDir/CudosBuilders/tools-nodejs</code> directory.

**<code>deploy--orchestrator-testnet-private</code>** - deploys the orchestrator of root-validator of the private testnet using <code>secrets.json</code> in the deployer's folder.

**<code>deploy--orchestrator-testnet-public-zone01</code>** - deploys the orchestrator of root-validator of the public testnet using <code>secrets.json</code> in the deployer's folder.

**<code>deploy--orchestrator-testnet-public-zone02</code>** - deploys the orchestrator of validator-02 of the public testnet using <code>secrets.json</code> in the deployer's folder.

**<code>deploy--orchestrator-testnet-public-zone03</code>** - deploys the orchestrator of validator-03 of the public testnet using <code>secrets.json</code> in the deployer's folder.
