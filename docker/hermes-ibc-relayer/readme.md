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
## Fees 

When channels are created, transaction fees are taken from both accounts that are registered with the relayer.

When a token transaction is created, transaction fees are taken only from the relayer account on the netwrok FROM which the tokens are sent.

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

## Upgrades on chain with IBC implementation
Upgrading the chain has two main things that need considering. If there is a soft fork, or a hardfork without breaking changes to the IBC module, the upgrade can be done using the standard procedure.
If the changes are breaking to the IBC module, a special case of upgrade proposal needs to be made. 
Here is a list of the breaking changes:
   1. Changing the Chain-ID: Supported
   2. Changing the UnbondingPeriod: Partially Supported, chains may increase the unbonding period with no issues. However, decreasing the unbonding period may irreversibly break some counterparty clients. Thus, it is not recommended that chains  
      reduce the unbonding period.
   3. Changing the height (resetting to 0): Supported, so long as chains remember to increment the revision number in their chain-id.
   4. Changing the ProofSpecs: Supported, this should be changed if the proof structure needed to verify IBC proofs is changed across the upgrade. Ex: Switching from an IAVL store, to a SimpleTree Store
   5. Changing the UpgradePath: Supported, this might involve changing the key under which upgraded clients and consensus states are stored in the upgrade store, or even migrating the upgrade store itself.
   6. Migrating the IBC store: Unsupported, as the IBC store location is negotiated by the connection.
   7. Upgrading to a backwards compatible version of IBC: Supported
   8. Upgrading to a non-backwards compatible version of IBC: Unsupported, as IBC version is negotiated on connection handshake.
   9. Changing the Tendermint LightClient algorithm: Partially Supported. Changes to the light client algorithm that do not change the ClientState or ConsensusState struct may be supported, provided that the counterparty is also upgraded to      support the new light client algorithm. Changes that require updating the ClientState and ConsensusState structs themselves are theoretically possible by providing a path to translate an older ClientState struct into the new ClientState    struct; however this is not currently implemented.

IBC upgrade proposal is implemented for that purpose. It holds in its Plan an upgraded state of the client that is responsible for this chain on other chains. 
This is done so that when the upgrade proposal passes, the counterparty chains can upgrade their clients with the latest consensus state.

In order to successfully do a ibc-upgrade, you first need to get the latest client state from a counterparty chain. It can be done with the following example command:
```
cudos-noded q ibc client state 07-tendermint-0 --output json
````
This will output the state in a JSON format, which now you can include in the proposal. To do this, edit the fields that you are going to change (i.e. UnbondingPeriod), zero out ````trusting_period``` and also change the block heights according to the proposal plan you are going to make. Frozen height ```revision_height``` needs to be set to 1 block previous to the freeze. So if you plan the upgrade on block 300, enter 299 for the frozen height ```revision_height```. As for the ```latest_height``` ```revision_height```, it needs to be set to 1 block after the upgrade. So from the previous example - to 301.

After the state is set, save it on a node on the chain you are going to upgrade. then proposa a ibc-upgrade proposal with the following example command:
```
cudos-noded tx gov submit-proposal ibc-upgrade <upgrade_name> 300 /usr/cudos/client_state.json --deposit 100000000acudos --title <proposal_title> --description <proposal_description> --from <wallet_for_transaction> --keyring-backend os --chain-id cudos-local-network -y
```

Then the proposal needs to be voted. When it passes, and the chain halts, it is time to upgrade the clients for this chain on all counterparty chains. This can be done one by one from the relayer, or all at once by the following example command:
```
hermes upgrade clients <chain_id_upgraded_network>
```
When the transactions on the upgrade pass, it is time to do all the normal operations after an upgrade, like the installment of the new binary, exporting the genesis, reseting the data, migrating the genesis and replacing the old one with the migrated one.

Then change the chain-id in the config.toml file for the upgraded chain, if needed.

When all of that is done, you can start the Hermes relayer and it should connect to both networks and pass the health checks without any errors.

## Definitions

1. Clients - Each client object contains information about the consensus state of the counterparty ledger.
2. Connections - Each connection object contains a specific pair of named identifiers agreed to by both ledgers in a handshake protocol, which uniquely identifies a connection between the two ledgers.
3. Channels -   Each channel, specific to a pair of modules, contains information concerning negotiated encoding and multiplexing options and state and sequence numbers. 

