FROM binary-builder

# RUN apk add --no-cache jq make bash g++

RUN apt update && apt install -y jq

# WORKDIR /usr/cudos

# COPY ./CudosNode ./CudosNode

# COPY ./CudosGravityBridge ./CudosGravityBridge

COPY ./CudosBuilders/docker/root-node/init-root.sh ./

# RUN cd ./CudosNode && \
#     make && \
#     cd .. \
#     chmod +x ./init-root.sh && \
#     sed -i 's/\r$//' ./init-root.sh

RUN chmod +x ./init-root.sh && \
    sed -i 's/\r$//' ./init-root.sh

CMD ["/bin/bash", "./init-root.sh"]
