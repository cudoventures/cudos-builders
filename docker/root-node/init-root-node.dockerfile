FROM golang:buster

# RUN apk add --no-cache jq make bash g++

RUN apt update && \
    apt install -y jq build-essential

WORKDIR /usr/cudos

COPY ./CudosNode ./

COPY ./CudosBuilders/docker/root-node/init-root.sh ./

RUN make && \
    chmod +x ./init-root.sh && \
    sed -i 's/\r$//' ./init-root.sh

CMD ["/bin/bash", "./init-root.sh"]
