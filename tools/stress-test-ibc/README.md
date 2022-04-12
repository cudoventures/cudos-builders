# TEST
To run the tests, fill `.env` file, make sure the wallets have enough funds and use `npm run balance`.

The tests are comprised of several runs of number of sends to both Cudos sides. After the sends the amounts of locked tokens in the IBC module and the minted tokens on the destination chain are compared. They should be the same.

# TIPS
1. To get ibc module address for a certain channel: 
`cudos-noded query ibc-transfer escrow-address <port> <channel id>`