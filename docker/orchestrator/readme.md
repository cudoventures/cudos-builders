#To send eth-to-cosmos transaction from orchestrator binary example

./gbt client eth-to-cosmos \
--ethereum-key="<ethereum private key from which to send tokens" \
--gravity-contract-address="$CONTRACT_ADDR" \
--amount="<amount>"  \
--destination="<cosmos destination address to which to send the tokens>" \
--token-contract-address="<ERC20 contract of the token on the ethereum network>" \
--ethereum-rpc="<ethereum node rpc>"

##To send cosmos-to-eth transaction from orchestrator binary example

./gbt client cosmos-to-eth \
--amount="<amount_and_denomination>" \
--cosmos-grpc="$GRPC" \
--cosmos-phrase="<cosmos mnemonic of the sender address>" \
--eth-destination="<ethereum address to which to send the tokens>" \
--fees="<amount_and_denomination>"


## Local run

cd /usr/src/cosmos-gravity-bridge/orchestrator && cargo build && cd /home/orchestrator/bin/ && cp /usr/src/cosmos-gravity-bridge/orchestrator/target/debug/gbt ./gbt && ./orchestrator-run.sh