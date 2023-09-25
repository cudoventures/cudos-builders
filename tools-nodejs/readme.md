# Tools-NodeJS overview

This folder contains several sripts written in Node.js. In order to execute any of them you will need a proper nodejs workspace. You can use the global workspace as [described](../workspace/readme.md).

# Configure

Most of the deployers in this folder has a file named <code>secrecs.json.example</code> Duplicate this file and rename it to <code>secrets.json</code> In it you will find predefined instances' names. Let's call them **targets**. Do not change them, just add the corresponding parameters in the empty variables. Each target needs a host, port, username, privateKey, keyPass (if available) and serverPath. If you are deploying to currently running testnets, leave the serverPath as it is - <code>/usr/cudos</code>

# NPM

All of the NPM commands below are available once you navigate to <code>parentDir/CudosBuilders/tools</code> directory.

# Scripts

## network deployer

[Go to docs](./tools-nodejs/deployer-network/readme.md)
