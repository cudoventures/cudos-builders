# Configuration for deployment
Duplicate `secrecs.json.example` and rename it to `secrets.json`. In it you will find predefined instances' names. Let's call them targets. Do not change them, just add the corresponding parameters in the empty variables. Each target needs a host, port, username, privateKey, keyPass (if available) and serverPath. If you are deploying to currently running testnets, leave the serverPath as it is - /usr/cudos
## ENV files fields

Always copy the example .env.example file. You could leave the default values as they are and just add the required fields as described below in this section.

Please note the port of each endpoint. It can be used as indicator which endpoint is required.

 - `CREATE_CHANNEL="false"` - set to true if setting it up for the first time. This will send transactions to create clients, connections and channels on both networks.
 - `REST_ENABLED="false"`- if REST for the ibc-relayer should be enabled, we don't use it so far
 - `REST_HOST="127.0.0.1"`- self explanatory
 - `REST_PORT="3000"`- self explanatory
 - `TELEMETRY_ENABLED="true"`- same as for the REST, but for telemetry
 - `TELEMETRY_HOST="127.0.0.1"`- self explanatory
 - `TELEMETRY_PORT="3001"`- self explanatory
 - `CHAIN_ID_0=""` - the chain ID of the first network the relayer is going to connect to. Keep in mind the twe chain IDs **MUST** be different 
 - `RPC_ADDR_0="http:\/\/127.0.0.1:26657"` - RPC address for the first network, keep in mind the escaping `/`
 - `GRPC_ADDR_0="http:\/\/127.0.0.1:9090"`- same as abov but for GRPC
 - `WEBSOCKET_ADDR_0="ws:\/\/127.0.0.1:26657\/websocket"` - same as above but for websocket
 - `ACCOUNT_PREFIX_0=""` - account prefix for the addresses on the first network. i.e. `cudos` or `cosmos`
 - `GAS_PRICE_0=""` - gas price to use on the first network. Must be above the minimum gas-price.
 - `GAS_DENOM_0=""`- denomination of the coins, used to pay gas - i.e. `acudos` or `uosmo`
 - `MNEMONIC_0=""` - mnemonic for a wallet with funds to be used by the relayer
 - `TRUSTING_PERIOD_0=""` - trusting period must be lower than 2/3 of unbonding period.

 The rest are similar to the described above, but for the second network
 - `CHAIN_ID_1=""`
 - `RPC_ADDR_1="http:\/\/127.0.0.1:26657"`
 - `GRPC_ADDR_1="http:\/\/127.0.0.1:9090"`
 - `WEBSOCKET_ADDR_1="ws:\/\/127.0.0.1:26657\/websocket"`
 - `ACCOUNT_PREFIX_1=""`
 - `GAS_PRICE_1=""`
 - `GAS_DENOM_1=""`
 - `MNEMONIC_1=""`
 - `TRUSTING_PERIOD_1=""`

# IBC-Relayer deployer
## Usage:
1. Configure secrets.json in this deployer as described above.
2. Copy and rename `hermes-ibc-relayer.env.example` in parentDir/CudosBuilders/docker/hermes-ibc-relayer to:
    - `hermes-ibc-relayer.private.env` (for private testnet builds)
    - `hermes-ibc-relayer.public.env` (for public testnet builds)
    - `hermes-ibc-relayer.mainnet.env` (for public testnet builds)
3. Fill the required fields as described in the "ENV files fields" section.
4. Run `npm install`

## List of npm commands regarding this deployer:

- `deploy--init-ibc-relayer-testnet-public` - deploys rebuilder and initializing docker container on **public testnet**. Keep in mind that if you hace the param `INIT` set to **false** in the `.env` file, this will setup all the configurations but will not create new client, channel, connections
- `deploy--start-ibc-relayer-testnet-public` - deploys the starter container and starts the relayer itself.
- `deploy--init-ibc-relayer-testnet-private` - similarly to the first, but for private testnet
- `deploy--start-ibc-relayer-testnet-private` - similarly to the second, but for private testnet
- `deploy--init-ibc-relayer-mainnet` - similarly to the first, but for private testnet
- `deploy--start-ibc-relayer-mainnet` - similarly to the second, but for private testnet
