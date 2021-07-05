FROM ethereum/client-go:stable

RUN apk add --no-cache curl

ENTRYPOINT geth --rinkeby --syncmode "light" --http --http.port "8545" --http.addr "0.0.0.0" --http.corsdomain "*" --http.vhosts "*" --http.api personal,eth,net,web3