FROM golang:buster

# RUN apk add --no-cache jq make bash g++
WORKDIR /usr/cudos

COPY ./CudosNode ./

COPY ./CudosBuilders/docker/full-node/config-full-node.sh ./

COPY ./CudosBuilders/docker/config ./external-config

ARG GENESIS_FILENAME

RUN mv "./external-config/${GENESIS_FILENAME}" ./external-config/genesis.json && \
    make && \
    chmod +x ./config-validator-client-full-node.sh && \
    sed -i 's/\r$//' ./config-validator-client-full-node.sh

# CMD ["sleep", "infinity"]
CMD ["/bin/bash", "./config-validator-client-full-node.sh"]
