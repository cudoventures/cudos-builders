# FROM golang:buster as builder

# # RUN apk add --no-cache jq make bash g++

# RUN apt update

# RUN apt install -y jq build-essential

# WORKDIR /usr/cudos-builder

# COPY ./CudosNode ./CudosNode

# COPY ./CudosGravityBridge ./CudosGravityBridge

# RUN cd ./CudosNode && make

# RUN FOLDER=$(ls /go/pkg/mod/github.com/\!cosm\!wasm/ | grep wasmvm@v) && ln -s /go/pkg/mod/github.com/\!cosm\!wasm/${FOLDER} /go/pkg/mod/github.com/\!cosm\!wasm/wasmvm

# # CMD ["sleep", "infinity"]

# FROM golang:buster

# WORKDIR /usr/cudos

# # RUN apk add --no-cache bash

# COPY --from=builder /go/pkg/mod/github.com/!cosm!wasm/wasmvm/api/libwasmvm.so /usr/lib

# COPY --from=builder /go/bin/cudos-noded /go/bin/cudos-noded

FROM binary-builder

CMD ["/bin/bash", "-c", "cudos-noded start"] 