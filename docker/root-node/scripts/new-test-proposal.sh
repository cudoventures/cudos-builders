LATEST_HEADER=$(($(cudos-noded q block |jq -r ".block.header.height") + 130))

echo 123123123 | cudos-noded tx gov submit-proposal ibc-upgrade \
    val \
    250 \
    /usr/cudos/client_state.json \
    --title val \
    --description val \
    --deposit 10000000acudos \
    --from faucet --keyring-backend os --chain-id cudos-local-network -y

sleep 10s

ID_LINE=$(cudos-noded q gov proposals |grep proposal_id | tail -1)
PROPOSAL_ID=${ID_LINE:16:1}

echo 123123123 | cudos-noded tx gov vote ${PROPOSAL_ID} yes --from root-validator-01 --keyring-backend os --chain-id cudos-local-network -y