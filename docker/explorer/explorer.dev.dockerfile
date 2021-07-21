FROM node:15.14-buster as builder

RUN apt update

RUN apt install jq build-essential libudev-dev zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libreadline-dev libffi-dev wget python3 -y

# ENV METEOR_ALLOW_SUPERUSER=true
RUN curl https://install.meteor.com/ | sh

WORKDIR /usr/src/

COPY ./CudosExplorer/default_settings.json /usr/src/default_settings.json

ARG GENESIS_TIME
ARG FAUCET_URL
ARG INTERNAL_RPC_URL
ARG INTERNAL_API_URL
ARG EXTERNAL_RPC_URL
ARG EXTERNAL_API_URL
ARG CHAIN_NAME
ARG CHAIN_ID

RUN cd /usr/src/ && \
    cat ./default_settings.json | jq --arg CHAIN_NAME "$CHAIN_NAME" '.public.chainName = $CHAIN_NAME' > ./default_settings.tmp && mv ./default_settings.tmp ./default_settings.json && \
    cat ./default_settings.json | jq --arg CHAIN_ID "$CHAIN_ID" '.public.chainId = $CHAIN_ID' > ./default_settings.tmp && mv ./default_settings.tmp ./default_settings.json && \
    cat ./default_settings.json | jq --arg GENESIS_TIME "$GENESIS_TIME" '.public.genesisTime = $GENESIS_TIME' > ./default_settings.tmp && mv ./default_settings.tmp ./default_settings.json && \
    cat ./default_settings.json | jq --arg FAUCET_URL "$FAUCET_URL" '.public.faucetUrl = $FAUCET_URL' > ./default_settings.tmp && mv ./default_settings.tmp ./default_settings.json && \
    cat ./default_settings.json | jq --arg EXTERNAL_RPC_URL "$EXTERNAL_RPC_URL" '.public.urls.rpc = $EXTERNAL_RPC_URL' > ./default_settings.tmp && mv ./default_settings.tmp ./default_settings.json && \
    cat ./default_settings.json | jq --arg EXTERNAL_API_URL "$EXTERNAL_API_URL" '.public.urls.api = $EXTERNAL_API_URL' > ./default_settings.tmp && mv ./default_settings.tmp ./default_settings.json && \
    cat ./default_settings.json | jq --arg INTERNAL_RPC_URL "$INTERNAL_RPC_URL" '.remote.rpc = $INTERNAL_RPC_URL' > ./default_settings.tmp && mv ./default_settings.tmp ./default_settings.json && \
    cat ./default_settings.json | jq --arg INTERNAL_API_URL "$INTERNAL_API_URL" '.remote.api = $INTERNAL_API_URL' > ./default_settings.tmp && mv ./default_settings.tmp ./default_settings.json && \
    sed -i ':a;N;$!ba;s/\n//g' ./default_settings.json && \
    sed -i 's/ //g' ./default_settings.json && \
    cp ./default_settings.json ./settings.json


WORKDIR /usr/explorer

RUN ln -s /usr/src/settings.json /usr/explorer/settings.json

CMD meteor npm install --allow-superuser && meteor --settings /usr/src/settings.json --allow-superuser 