FROM ethereum/client-go:v1.10.4

RUN apk add --no-cache curl bash

ENTRYPOINT geth --rinkeby --rpc.calltimeout 0 -datadir '/var/ethereum-light' --syncmode "light" --http --http.port "8545" --http.addr "0.0.0.0" --http.corsdomain "*" --http.vhosts "*" --http.api personal,eth,net,web3