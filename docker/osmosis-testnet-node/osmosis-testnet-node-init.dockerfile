FROM osmosis-testnet-node-binary-builder

ARG USER_ID
ARG USER_NAME
ARG GROUP_ID
ARG GROUP_NAME
ARG OSMOSIS_HOME

RUN if [ $USER_NAME != 'root' ]; then \
        addgroup -gid ${GROUP_ID} $GROUP_NAME; \
        adduser --disabled-password -gecos "" -uid ${USER_ID} -gid ${GROUP_ID} ${USER_NAME}; \
    fi

WORKDIR /usr/osmosis

COPY ./CudosBuilders/docker/osmosis-testnet-node/scripts/osmosis-testnet-node-run.sh .

ENV OSMOSIS_HOME=${OSMOSIS_HOME}

CMD ["sleep", "infinity"]

# CMD ["/bin/bash", "-c", "./osmosis-testnet-node-run.sh"]
