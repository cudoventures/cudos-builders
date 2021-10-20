FROM binary-builder

ARG USER_ID
ARG USER_NAME
ARG GROUP_ID
ARG GROUP_NAME
ARG CUDOS_HOME
ARG GENESIS_FILENAME
ARG SEEDS_FILENAME
ARG PERSISTENT_PEERS_FILENAME

RUN if [ $USER_NAME != 'root' ]; then \
        groupadd --gid ${GROUP_ID} ${GROUP_NAME}; \
        useradd --no-log-init --create-home --shell /bin/bash --uid ${USER_ID} --gid ${GROUP_ID} ${USER_NAME}; \
    fi

RUN apt update && apt install -y jq

COPY ./CudosBuilders/docker/full-node/init-full-node.sh ./

COPY ./CudosBuilders/docker/config ./external-config

RUN mv "./external-config/${GENESIS_FILENAME}" ./external-config/genesis.json && \
    mv "./external-config/${SEEDS_FILENAME}" ./external-config/seeds.config && \
    mv "./external-config/${PERSISTENT_PEERS_FILENAME}" ./external-config/persistent-peers.config && \
    chmod +x ./init-full-node.sh && \
    sed -i 's/\r$//' ./init-full-node.sh

ENV USER_NAME=${USER_NAME}
ENV GROUP_NAME=${GROUP_NAME}
ENV CUDOS_HOME=${CUDOS_HOME}

CMD ["/bin/bash", "-c", "chown -R ${USER_NAME}:${GROUP_NAME} ${CUDOS_HOME} && su ${USER_NAME} -c ./init-full-node.sh"]
