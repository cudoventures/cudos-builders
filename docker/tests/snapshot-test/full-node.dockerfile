FROM golang:buster as builder

# RUN apk add --no-cache jq make bash g++

RUN apt update

RUN apt install -y jq build-essential

WORKDIR /usr/cudos-builder

COPY ./CudosNode ./

RUN make

FROM golang:buster

WORKDIR /usr/cudos

# RUN apk add --no-cache bash

COPY --from=builder /go/pkg/mod/github.com/!cosm!wasm/wasmvm@v0.14.0/api/libwasmvm.so /usr/lib

COPY --from=builder /go/bin/cudos-noded /go/bin/cudos-noded

COPY ./CudosBuilders/docker/config ./external-config

RUN mv "./external-config/genesis.local.json" ./external-config/genesis.json && \
    mv "./external-config/seeds.local.config" ./external-config/seeds.config && \
    mv "./external-config/persistent-peers.local.config" ./external-config/persistent-peers.config

COPY ./CudosBuilders/docker/snapshot-test/start-node.sh ./start-node.sh

RUN chmod +x ./start-node.sh

CMD ["sleep", "infinity"]
