
## Run local networks with relayer for testing 
Steps to start two local networks for testing transfering funds from one to another.
1. Run the two networks 
2. Get a wallet address of each network that will be use for relayer funds - to create channel
3. In "ibc-relayer.local.env" - set the two wallet seeds for each one
4. Start the ibc-relayer with command define in tasks.json - or (Command + Shift + B) -> Build IBC-RELAYER local in docker
5. Open shell for ibc-relayer
6. Execute following commands
```
cd scripts
```
If you want to manually rebuild the relayer
```
chmod +x ./make_relayer.sh
```
Start relayer for local 
```
chmod +x ./ibc-relayer-run-local.sh
./ibc-relayer-run-local.sh
```

See if the chains are ready to relay over
```
rly chains list
```

See the current status of the path you will relay over
```
rly paths list
```

See balances of each wallet address that are define in chains/local
```
rly q balance cudos-local-network
rly q balance cudos-local-network-2
```

Send some tokens between the chains
```
$ rly tx transfer cudos-local-network cudos-local-network-2 40000acudos $(rly chains address cudos-local-network-2)
$ rly tx relay-packets transfer-local -d
$ rly tx relay-acknowledgements transfer-local -d
```

Check balances of networks
```
rly q balance cudos-local-network
rly q balance cudos-local-network-2
```

Send the tokens back to the account on cudos-local-network
```
rly tx transfer cudos-local-network-2 cudos-local-network 40000acudos/27A6394C3F9FF9C9DCF5DFFADF9BB5FE9A37C7E92B006199894CF1824DF9AC7C $(rly chains addr cudos-local-network)
rly tx relay-packets transfer-local -d
rly tx relay-acknowledgements transfer-local -d
```

## Run local networks + cosmos testnet with relayer for testing 




## Calculations 

1000000999999992193960000 - 999999992193960000 = 1000000000000000000000000
1000000000000000000000000 - 999999999999997272350000 acudos = 2727640000 + 1000

10000 - Tax for relayer

When clients, connections, channels are created it takes from both accounts ammount: 2727640000

---- 

## Definitions

1. Clients - Each client object contains information about the consensus state of the counterparty ledger.
2. Connections - Each connection object contains a specific pair of named identifiers agreed to by both ledgers in a handshake protocol, which uniquely identifies a connection between the two ledgers.
3. Channels -   Each channel, specific to a pair of modules, contains information concerning negotiated encoding and multiplexing options and state and sequence numbers. 

