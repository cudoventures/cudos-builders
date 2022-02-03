FROM binary-builder

ARG CUDOS_HOME
ARG EXPOSE_IP
ARG GENESIS_FILENAME
ARG SEEDS_FILENAME
ARG PERSISTENT_PEERS_FILENAME
ARG STATE_SYNC_RPC_SERVERS_FILENAME

RUN apt update && apt install -y jq

COPY ./CudosBuilders/docker/sentry-node/init-sentry.sh ./

COPY ./CudosBuilders/docker/config ./external-config

RUN mv "./external-config/${PERSISTENT_PEERS_FILENAME}" ./external-config/persistent-peers.config && \
    mv "./external-config/${SEEDS_FILENAME}" ./external-config/seeds.config && \
    mv "./external-config/${GENESIS_FILENAME}" ./external-config/genesis.json && \
    mv "./external-config/${STATE_SYNC_RPC_SERVERS_FILENAME}" ./external-config/state-sync-rpc-servers.config && \
    chmod +x ./init-sentry.sh && \
    sed -i 's/\r$//' ./init-sentry.sh

ENV CUDOS_HOME=${CUDOS_HOME}
ENV EXTERNAL_ADDRESS=${EXPOSE_IP}:26656

CMD ["/bin/bash", "-c", "./init-sentry.sh"]