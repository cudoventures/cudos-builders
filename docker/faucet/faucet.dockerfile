FROM golang:buster as builder

# RUN apk add --no-cache jq make bash g++

RUN apt update

RUN apt install -y jq build-essential

WORKDIR /usr/cudos-node-builder

COPY ./CudosNode ./

RUN make

WORKDIR /usr/cudos-faucet-cli-builder

COPY ./CudosFaucet ./

RUN make

FROM golang:buster

WORKDIR /usr/faucet-cli

# RUN apk add --no-cache bash

COPY --from=builder /go/pkg/mod/github.com/!cosm!wasm/wasmvm@v0.14.0/api/libwasmvm.so /usr/lib

COPY --from=builder /go/bin/cudos-noded /go/bin/cudos-noded

COPY --from=builder /go/bin/faucet /go/bin/faucet

# CMD ["sleep", "infinity"]
CMD ["/bin/bash", "-c", "rm -Rf ./cudos-data && faucet"]