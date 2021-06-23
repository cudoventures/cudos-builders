# FROM rust:latest as cargo-build

# RUN apt-get update

# RUN apt-get install musl-tools -y

# WORKDIR /usr/src

# RUN git clone https://github.com/cosmos/gravity-bridge.git

# CMD ["sleep", "infinity"]

# RUN cargo run --bin register-delegate-keys -- --validator-phrase='replace refuse right nut wasp silly muffin juice mistake husband tortoise wedding rent unable high few dove nasty inmate romance anxiety shell relax brass' --cosmos-grpc="http://34.123.153.6:26657" --fees=acudos --address-prefix=cudos

FROM node:15.11-alpine3.13

RUN apk update
RUN apk add --no-cache python3 make g++ curl git 

WORKDIR /usr/src

RUN git clone https://github.com/cosmos/gravity-bridge.git

WORKDIR /usr/src/gravity-bridge/solidity

RUN npm ci
RUN chmod -R +x scripts

RUN npm run typechain

# CMD ["sleep", "infinity"]

CMD npx ts-node \
    contract-deployer.ts \
    --cosmos-node="http://cudos-start-sentry-node-01:26657" \
    --eth-node="https://rinkeby.infura.io/v3/b26d9ad356394786b08d6e227c97fda6" \
    --eth-privkey="711531b5e21921f66b7a6f7483d755f1c23abfb24b8faf9b6770a179a9a49562" \
    --contract=artifacts/contracts/Gravity.sol/Gravity.json \
    --test-mode=false
