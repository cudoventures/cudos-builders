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

ARG USER_ID
ARG USER_NAME
ARG GROUP_ID
ARG GROUP_NAME
ARG CUDOS_HOME

RUN if [ $USER_NAME != 'root' ]; then \
        addgroup -gid $GROUP_ID $GROUP_NAME; \
        adduser --disabled-password -gecos "" -uid $USER_ID -gid $GROUP_ID $USER_NAME; \
    fi

CMD ["/bin/bash", "-c", "chown -R $USER_NAME:$GROUP_NAME $CUDOS_HOME && su $USER_NAME -c \"cudos-noded start\""] 