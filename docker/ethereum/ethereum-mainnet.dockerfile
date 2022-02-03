FROM ethereum/client-go:v1.10.6

RUN apk add --no-cache curl bash

ENTRYPOINT geth -datadir '/var/ethereum-full' --syncmode 'fast' --http --http.port '8545' --http.addr '0.0.0.0' --http.corsdomain '*' --http.vhosts '*' --http.api personal,eth,net,web3
