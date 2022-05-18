To run the tests from  `/tools-nodejs/stress-tests` run `npm i`.
Then copy, rename (without example) and fill the env files and then `npm run test`

# IBC tests
## TEST
The purpose of this test is to spam two IBC connected cosmos-sdk networks and check if the balance of the escrow of the client on the src chain equals the minted denom on the destination network (both networks are checked as a source and a destination).

To run the tests, fill `.env` file, make sure the wallets have enough funds and use `npm run balance`.

The tests are comprised of several runs of number of sends to both Cudos sides. After the sends the amounts of locked tokens in the IBC module and the minted tokens on the destination chain are compared. They should be the same.

In some cases with a bigger number of tests or bigger amount of messages per Tx, the node the sxcript sends Txs through might reject them or return zero balance error for some address. This is due to some Txs hanging in the local mempool. The script continues though and after the hanging transactions pass it should return the correct balances for the module and total ibc denom amount.

## TIPS
1. To get ibc module address for a certain channel: 
`cudos-noded query ibc-transfer escrow-address <port> <channel id>`

# GRAVITY tests
The tests are comprised of several runs of number of sends to both ETH and Cudos sides. After the sends the sum of the contract and module balances is evaluated. It should be the same ase before, otherwise there would be some burned or minted new coins, which is not expected.

# GENERAL tests
So far there is just one test that just spams a send transactions just to load the network.
