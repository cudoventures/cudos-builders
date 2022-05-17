**Outdated!**
=

# Configure

Please refer to these [docs](../readme.md#configure)

# Usage:
1. Configure <code>secrets.json</code> in this deployer as described above.
2. Configure the ENV variables in <code>parentDir/CudosBuilders/docker/explorer</code>
- Copy <em>explorer.env.example</em> to:
    - <em>explorer.testnet.private.env</em> (for private testnet builds)
    - <em>explorer.testnet.public.env</em> (for public testnet builds)
- Fill the required fields as described in the "ENV files fields" section.
3. Configure the ENV variables in <code>parentDir/CudosBuilders/docker/faucet</code>
- Copy <em>faucet.env.example</em> to:
    - <em>faucet.testnet.private.env</em> (for private testnet builds)
    - <em>faucet.testnet.public.env</em> (for public testnet builds)
- Fill the required fields as described in the "ENV files fields" section.

# List of npm commands regarding this deployer:

All of the NPM commands below are available once you navigate to <code>parentDir/CudosBuilders/tools-nodejs</code> directory.

**<code>deploy-utils-testnet-public</code>** - deploys utils (explorer + faucet) to public testnet using <code>secrets.json</code> in the deployer's folder.

**<code>deploy-utils-testnet-private</code>** - deploys utils (explorer + faucet) to private testnet using <code>secrets.json</code> in the deployer's folder.
