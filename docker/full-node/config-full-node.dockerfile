# FROM golang:buster
FROM node-builder

# RUN apk add --no-cache jq make bash g++
# WORKDIR /usr/cudos

# COPY ./CudosNode ./CudosNode

# COPY ./CudosGravityBridge ./CudosGravityBridge

COPY ./CudosBuilders/docker/full-node/config-full-node.sh ./

COPY ./CudosBuilders/docker/config ./external-config

# RUN cd ./CudosNode && \
#     make && \
#     cd .. \
#     chmod +x ./config-full-node.sh && \
#     sed -i 's/\r$//' ./config-full-node.sh

RUN chmod +x ./config-full-node.sh && \
    sed -i 's/\r$//' ./config-full-node.sh

# CMD ["sleep", "infinity"]
CMD ["/bin/bash", "./config-full-node.sh"]
