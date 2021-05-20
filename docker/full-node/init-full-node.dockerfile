FROM golang:buster

# RUN apk add --no-cache jq make bash g++

RUN apt update

RUN apt install -y jq build-essential

WORKDIR /usr/cudos

COPY ./CudosNode ./

COPY ./CudosBuilders/docker/full-node/init-full-node.sh ./

COPY ./CudosBuilders/docker/config ./external-config

ARG GENESIS_FILENAME

RUN mv "./external-config/${GENESIS_FILENAME}" ./external-config/genesis.json && \
    make && \
    chmod +x ./init-full-node.sh && \
    sed -i 's/\r$//' ./init-full-node.sh

# CMD ["sleep", "infinity"]
CMD ["/bin/bash", "./init-full-node.sh"]
