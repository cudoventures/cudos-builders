
FROM nikolaik/python-nodejs:python3.9-nodejs16-alpine as builder

RUN apk add --update alpine-sdk

WORKDIR /usr/gravity-bridge-ui

COPY ./CudosGravityBridgeUI ./source

RUN rm -rf ./source/node_modules

ARG ENV_FILE

COPY ./CudosBuilders/docker/gravity-bridge-ui/$ENV_FILE ./source/config/.env.production

RUN cd ./source && \
    npm i && \
    npm run prod && \
    cp ./config/.env.production ./builds/prod/config/.env

FROM node:16-alpine

WORKDIR /usr/gravity-bridge-ui

COPY --from=builder /usr/gravity-bridge-ui/source/builds/prod .

COPY --from=builder /usr/gravity-bridge-ui/source/node_modules ./node_modules

CMD ["node", "./src/ServerCluster.js"]