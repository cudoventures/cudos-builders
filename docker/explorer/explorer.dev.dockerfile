FROM node:15.14-buster

ARG USER_ID
ARG USER_NAME
ARG GROUP_ID
ARG GROUP_NAME
ARG CUDOS_HOME
ARG GENESIS_TIME
ARG FAUCET_URL
ARG INTERNAL_RPC_URL
ARG INTERNAL_API_URL
ARG EXTERNAL_RPC_URL
ARG EXTERNAL_API_URL
ARG EXTERNAL_STAKING_URL
ARG CHAIN_NAME
ARG CHAIN_ID

RUN if [ $USER_NAME != 'root' ]; then \
        groupmod -g 2000 node; \
        usermod -u 2000 -g 2000 node; \
        addgroup -gid ${GROUP_ID} $GROUP_NAME; \
        adduser --disabled-password -gecos "" -uid ${USER_ID} -gid ${GROUP_ID} ${USER_NAME}; \
        echo "export PATH=\$PATH:/home/${USER_NAME}/.meteor" > /home/${USER_NAME}/.bashrc; \
    else \
        echo "export PATH=\$PATH:/root/.meteor\nexport METEOR_ALLOW_SUPERUSER=true" > /root/.bashrc; \
    fi

RUN apt update && \
    apt install jq build-essential libudev-dev zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libreadline-dev libffi-dev wget python3 -y

WORKDIR /usr/src/explorer

COPY ./CudosExplorer/default_settings.json /usr/src/explorer/default_settings.json

RUN cd /usr/src/explorer && \
    cat ./default_settings.json | jq --arg CHAIN_NAME "$CHAIN_NAME" '.public.chainName = $CHAIN_NAME' > ./default_settings.tmp && mv ./default_settings.tmp ./default_settings.json && \
    cat ./default_settings.json | jq --arg CHAIN_ID "$CHAIN_ID" '.public.chainId = $CHAIN_ID' > ./default_settings.tmp && mv ./default_settings.tmp ./default_settings.json && \
    cat ./default_settings.json | jq --arg GENESIS_TIME "$GENESIS_TIME" '.public.genesisTime = $GENESIS_TIME' > ./default_settings.tmp && mv ./default_settings.tmp ./default_settings.json && \
    cat ./default_settings.json | jq --arg FAUCET_URL "$FAUCET_URL" '.public.faucetUrl = $FAUCET_URL' > ./default_settings.tmp && mv ./default_settings.tmp ./default_settings.json && \
    cat ./default_settings.json | jq --arg EXTERNAL_RPC_URL "$EXTERNAL_RPC_URL" '.public.urls.rpc = $EXTERNAL_RPC_URL' > ./default_settings.tmp && mv ./default_settings.tmp ./default_settings.json && \
    cat ./default_settings.json | jq --arg EXTERNAL_API_URL "$EXTERNAL_API_URL" '.public.urls.api = $EXTERNAL_API_URL' > ./default_settings.tmp && mv ./default_settings.tmp ./default_settings.json && \
    cat ./default_settings.json | jq --arg EXTERNAL_STAKING_URL "$EXTERNAL_STAKING_URL" '.public.urls.staking = $EXTERNAL_STAKING_URL' > ./default_settings.tmp && mv ./default_settings.tmp ./default_settings.json && \
    cat ./default_settings.json | jq --arg INTERNAL_RPC_URL "$INTERNAL_RPC_URL" '.remote.rpc = $INTERNAL_RPC_URL' > ./default_settings.tmp && mv ./default_settings.tmp ./default_settings.json && \
    cat ./default_settings.json | jq --arg INTERNAL_API_URL "$INTERNAL_API_URL" '.remote.api = $INTERNAL_API_URL' > ./default_settings.tmp && mv ./default_settings.tmp ./default_settings.json && \
    sed -i ':a;N;$!ba;s/\n//g' ./default_settings.json && \
    sed -i 's/ //g' ./default_settings.json && \
    cp ./default_settings.json ./settings.json && \
    chown ${USER_NAME}:${GROUP_NAME} ./settings.json && \
    mkdir -p /usr/local/explorer/.meteor/local && \
    chown ${USER_NAME}:${GROUP_NAME} /usr/local/explorer/.meteor/local


WORKDIR /usr/local/explorer

USER ${USER_NAME}

RUN curl https://install.meteor.com/ | sh

CMD ["/bin/bash", "-c", "source ~/.bashrc && meteor npm install && rm -rf ./.meteor/local/* && meteor --settings /usr/src/explorer/settings.json"]