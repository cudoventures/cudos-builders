export WALLET_MNEMONIC=""
export WALLET_PASSWORD=""
export STAKE="1acudos"

(echo $WALLET_MNEMONIC; echo $WALLET_PASSWORD; echo $WALLET_PASSWORD) | cudos-noded keys add validator --recover --keyring-backend="os"

echo $WALLET_PASSWORD | cudos-noded tx staking create-validator --amount=$STAKE \
    --from=validator \
    --pubkey=$(cudos-noded tendermint show-validator) \
    --moniker=$MONIKER \
    --chain-id=cudos-network \
    --commission-rate="0.10" \
    --commission-max-rate="0.20" \
    --commission-max-change-rate="0.01" \
    --min-self-delegation="1" \
    --gas="auto" \
    --gas-prices="0.025acudos" \
    --gas-adjustment="1.80" \
    --keyring-backend="os" \
    -y