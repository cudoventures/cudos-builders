## Run local networks with relayer for testing
Steps to start two local networks for testing transfering funds from one to another.
1. Run the two networks 
2. Get a wallet address of each network that will be use for relayer funds - to create channel
3. In "hermes-ibc-relayer.local.env" - set the two wallet seeds as well as the two network IDs
4. Start the ibc-relayer with command define in tasks.json - or (Command + Shift + B) -> Build HERMES-IBC-RELAYER local in docker
5. Send some tokens between the chains
```
$ cudos-noded tx ibc-transfer transfer transfer channel-0 cudos13tms6ed6e5e3lgs0svggf23rs2090nlmcspcqv 1000acudos --chain-id cudos-local-network --from faucet --keyring-backend os