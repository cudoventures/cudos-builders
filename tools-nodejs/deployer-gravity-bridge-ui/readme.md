**Outdated!**
=

# Configure

Please refer to these [docs](../readme.md#configure)

# Usage:
1. Configure <code>secrets.json</code> in this deployer as described above.
2. Configure the ENV variables in <code>parentDir/CudosBuilders/docker/gravity-bridge-ui</code>
- Copy <em>gravity-bridge-ui.env.example</em> to:
    - <em>gravity-bridge-ui.testnet.private.env</em> (for private testnet builds)
    - <em>gravity-bridge-ui.testnet.public.env</em> (for public testnet builds)
- Fill the required fields as described in the "ENV files fields" section.

# List of npm commands:

All of the NPM commands below are available once you navigate to <code>parentDir/CudosBuilders/tools-nodejs</code> directory.

**<code>deploy-gravity-bridge-ui-testnet-public</code>** - deploys gravity-bridge-ui to public testnet using <code>secrets.json</code> in the deployer's folder.

**<code>deploy-gravity-bridge-ui-testnet-private</code>** - deploys gravity-bridge-ui to private testnet using <code>secrets.json</code> in the deployer's folder.
