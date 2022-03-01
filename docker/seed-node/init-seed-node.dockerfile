FROM binary-builder

ARG CUDOS_HOME
ARG GENESIS_FILENAME
ARG SEEDS_FILENAME
ARG PERSISTENT_PEERS_FILENAME
ARG STATE_SYNC_RPC_SERVERS_FILENAME
ARG LOGGING_DRIVER

RUN apt update && apt install -y jq

COPY ./CudosBuilders/docker/seed-node/init-seed.sh ./

COPY ./CudosBuilders/docker/config ./external-config

RUN mv "./external-config/${PERSISTENT_PEERS_FILENAME}" ./external-config/persistent-peers.config && \
    mv "./external-config/${SEEDS_FILENAME}" ./external-config/seeds.config && \
    mv "./external-config/${GENESIS_FILENAME}" ./external-config/genesis.json && \
    mv "./external-config/${STATE_SYNC_RPC_SERVERS_FILENAME}" ./external-config/state-sync-rpc-servers.config && \
    chmod +x ./init-seed.sh && \
    sed -i 's/\r$//' ./init-seed.sh

ENV CUDOS_HOME=${CUDOS_HOME}
ENV LOGGING_DRIVER=${LOGGING_DRIVER}

CMD ["/bin/bash", "-c", "./init-seed.sh"]
