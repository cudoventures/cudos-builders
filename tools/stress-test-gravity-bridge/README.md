# TEST
To run the tests, fill `.env. file, make sure the wallets have enough funds and use `npm run balance`.

The tests are comprised of several runs of number of sends to both ETH and Cudos sides. After the sends the sum of the contract and module balances is evaluated. It should be the same ase before, otherwise there would be some burned or minted new coins, which is not expected.