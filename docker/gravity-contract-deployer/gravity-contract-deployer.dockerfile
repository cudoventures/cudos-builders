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

WORKDIR /usr/src/cosmos-gravity-bridge/solidity

COPY ./CudosGravityBridge/solidity ./

RUN npm ci
RUN chmod -R +x scripts

RUN npm run typechain

# CMD ["sleep", "infinity"]

CMD npx ts-node \
    contract-deployer.ts \
    --cosmos-node="${COSMOS_NODE}" \
    --eth-node="${ETH_NODE}" \
    --eth-privkey="${ETH_PRIV_KEY_HEX}" \
    --contract=artifacts/contracts/Gravity.sol/Gravity.json \
    --test-mode=false
    --cudos-access-control="${CUDOS_ACCESS_CONTROL_ADDRESS}"
