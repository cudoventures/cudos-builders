FROM golang:buster

ARG USER_ID
ARG USER_NAME
ARG GROUP_ID
ARG GROUP_NAME
ARG OSMOSIS_HOME

RUN if [ $USER_NAME != 'root' ]; then \
        addgroup -gid ${GROUP_ID} $GROUP_NAME; \
        adduser --disabled-password -gecos "" -uid ${USER_ID} -gid ${GROUP_ID} ${USER_NAME}; \
    fi

RUN apt-get update

RUN apt-get install git build-essential ufw curl jq snapd cargo -y

WORKDIR ${OSMOSIS_HOME}

RUN git clone https://github.com/osmosis-labs/osmosis && \
    cd osmosis && \
    git checkout v4.2.0 && \
    make install

COPY ./CudosBuilders/docker/osmosis-testnet-node/scripts/osmosis-testnet-node-run.sh ${OSMOSIS_HOME}/osmosis-testnet-node-run.sh

# RUN chmod +x ./osmosis-testnet-node-run.sh && \
#     chown -R ${USER_NAME}:${GROUP_NAME} ./ && \
#     sed -i 's/\r$//' ./osmosis-testnet-node-run.sh

# USER ${USER_NAME}:${GROUP_NAME}

ENV OSMOSIS_HOME=${OSMOSIS_HOME}

CMD ["sleep", "infinity"]

# CMD ["/bin/bash", "-c", "./osmosis-testnet-node-run.sh"]
