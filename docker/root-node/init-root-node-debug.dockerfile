FROM node-builder

# RUN apk add --no-cache jq make bash g++

RUN apt update && apt install -y jq

# RUN apt update && \
#     apt install -y jq build-essential

# WORKDIR /usr/cudos

# COPY ./CudosNode ./CudosNode

# COPY ./CudosGravityBridge ./CudosGravityBridge

COPY ./CudosBuilders/docker/root-node/init-root-6-decimals-debug.sh ./

# RUN cd ./CudosNode && \
#     make && \
#     cd .. \
#     chmod +x ./init-root-6-decimals-debug.sh && \
#     sed -i 's/\r$//' ./init-root-6-decimals-debug.sh

RUN chmod +x ./init-root-6-decimals-debug.sh && \
    sed -i 's/\r$//' ./init-root-6-decimals-debug.sh

CMD ["/bin/bash", "./init-root-6-decimals-debug.sh"]
