# FROM golang:buster
FROM binary-builder

# RUN apk add --no-cache jq make bash g++

RUN apt update && apt install -y jq

# RUN apt update

# RUN apt install -y jq build-essential

# WORKDIR /usr/cudos

# COPY ./CudosNode ./CudosNode

# COPY ./CudosGravityBridge ./CudosGravityBridge

COPY ./CudosBuilders/docker/sentry-node/init-sentry.sh ./

COPY ./CudosBuilders/docker/config ./external-config

ARG GENESIS_FILENAME
ARG SEEDS_FILENAME
ARG PERSISTENT_PEERS_FILENAME

RUN mv "./external-config/${PERSISTENT_PEERS_FILENAME}" ./external-config/persistent-peers.config && \
    mv "./external-config/${SEEDS_FILENAME}" ./external-config/seeds.config && \
    mv "./external-config/${GENESIS_FILENAME}" ./external-config/genesis.json && \
    # cd ./CudosNode && \
    # make && \
    # cd .. \
    chmod +x ./init-sentry.sh && \
    sed -i 's/\r$//' ./init-sentry.sh

# CMD ["sleep", "infinity"]
CMD ["/bin/bash", "./init-sentry.sh"]
