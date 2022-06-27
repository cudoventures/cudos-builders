
FROM node:16-alpine as builder

RUN apk add --update alpine-sdk

WORKDIR /usr/nft-minting-ui

COPY ./CudosNftMintingUI ./source

RUN rm -rf ./source/node_modules

ARG ENV_FILE

COPY ./CudosBuilders/docker/nft-minting-ui/$ENV_FILE ./source/config/.env.production

RUN cd ./source && \
    npm i && \
    npm run prod && \
    cp ./config/.env.production ./builds/prod/config/.env

FROM node:16-alpine

WORKDIR /usr/nft-minting-ui

COPY --from=builder /usr/nft-minting-ui/source/builds/prod .

COPY --from=builder /usr/nft-minting-ui/source/node_modules ./node_modules

CMD ["node", "./src/ServerCluster.js"]
