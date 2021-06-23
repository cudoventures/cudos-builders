./gbt --address-prefix="$ADDRESS_PREFIX" orchestrator \
    --fees="$FEES" \
    --cosmos-grpc="$GRPC" \
    --ethereum-rpc="$ETHRPC" \
    --gravity-contract-address="$CONTRACT_ADDR" \
    --ethereum-key="${ETH_PRIV_KEY_HEX}" \
    --cosmos-phrase="$COSMOS_ORCH_MNEMONIC"