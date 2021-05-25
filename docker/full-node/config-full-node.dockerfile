FROM golang:buster

# RUN apk add --no-cache jq make bash g++
WORKDIR /usr/cudos

COPY ./CudosNode ./

COPY ./CudosBuilders/docker/full-node/config-full-node.sh ./

COPY ./CudosBuilders/docker/config ./external-config

RUN make && \
    chmod +x ./config-full-node.sh && \
    sed -i 's/\r$//' ./config-full-node.sh

# CMD ["sleep", "infinity"]
CMD ["/bin/bash", "./config-full-node.sh"]
