## Run local networks with relayer for testing
Steps to start two local networks for testing transfering funds from one to another.
1. Run the two networks 
2. Get a wallet address of each network with funds in it. It will be used for relayer transations - to create channel and transfer tokens.
3. In "hermes-ibc-relayer.local.env" - set the two wallet seeds, and the two chain configurations
4. Start the ibc-relayer with command define in tasks.json - or (Command + Shift + B) -> Build HERMES-IBC-RELAYER local in docker
5. Send some tokens between the chains with the following command as an example:
```
$ cudos-noded tx ibc-transfer transfer transfer channel-0 cudos15hkd2zzyug7v2cv30kq55h5zquegjwm348vg33 1000acudos --chain-id cudos-local-network --from faucet --keyring-backend os
```
## Run local network + cosmos testnet with relayer for testing 
Steps to start a relayer between a local network and a running cosmos testnet.
1. Run a network locally.
2. Get a wallet address of each network with funds in it. It will be used for relayer transations - to create channel and transfer tokens.
3. In "hermes-ibc-relayer.local.env" - set the two wallet seeds, the two network IDs and the two netwrok addresses
4. Start the ibc-relayer with command define in tasks.json - or (Command + Shift + B) -> Build HERMES-IBC-RELAYER local in docker
5. Send some tokens between the chains with the following command as an example:
```
$ cudos-noded tx ibc-transfer transfer transfer channel-0 cudos15hkd2zzyug7v2cv30kq55h5zquegjwm348vg33 1000acudos --chain-id cudos-local-network --from faucet --keyring-backend os
```
## Calculations 

When channels are created it takes from both accounts.

When a token transaction is created it takes only from the account on the netwrok FROM which the tokens are sent.

## Transfering tokens
The most used feature of IBC is to send tokens from one blockchain to another. When sending a token to another blockchain, a token voucher is generated on the other (target) blockchain.

The value that tokens represent can be transferred across chains, but the token itself cannot. When sending the tokens with IBC to another blockchain:

   1. Blockchain A locks the tokens and relays proof to blockchain B
   2. Blockchain B mints its own representative tokens in the form of voucher replacement tokens
   3. Blockchain B sends the voucher tokens back to blockchain A
   4. The voucher tokens are destroyed (burned) on blockchain B
   5. The locked tokens on blockchain A are unlocked

The only way to unlock the locked tokens on blockchain A is to send the voucher token back from blockchain B. The result is that the voucher token on blockchain B is burned. The burn process purposefully takes the tokens out of circulation.

The voucher tokens introduced in the asset transfer are called IBC Denominations (IBC denom). The voucher tokens are the result of a token transfer using IBC from one blockchain to another. The format of the voucher token is:

```
ibc/DENOMHASH
```
The denom is hashed because:
   1. The hash contains paths that track the token on multiple hops from other blockchains to your account.
   2. This path could potentially be unbearably long when directly printing the path.
   3. The Cosmos SDK has a 64-character limit on the denomination of the token.

The tradeoff of using a hash is that you must query a node to find out what the actual path and denomination is. This query is called the denomtrace.

To query the original denom and learn the channel from which the tokens came use the cudos-noded subcommands:
```
cudos-noded q ibc-transfer denom-trace <denom-hash> 
```

Example response:
```
denom_trace:
  base_denom: moon
  path: transfer/channel-14
```

From the command output, you now know that there is an IBC port transfer and channel channel-14. But to know the IBC light client behind the port and channel, you need to perform another query.

Why is it called a light client? Because it is a light client of the other chain, keeping track of its blockhashes. The ibc channel client-state transfer command explains the details of the denom path.
```
cudos-noded q ibc channel client-state transfer channel-14
```
For more info:
http://tutorials.cosmos.network/understanding-ibc-denoms/

## Definitions

1. Clients - Each client object contains information about the consensus state of the counterparty ledger.
2. Connections - Each connection object contains a specific pair of named identifiers agreed to by both ledgers in a handshake protocol, which uniquely identifies a connection between the two ledgers.
3. Channels -   Each channel, specific to a pair of modules, contains information concerning negotiated encoding and multiplexing options and state and sequence numbers. 

