FROM golang:buster as builder

ARG CUDOS_HOME

RUN git clone https://github.com/cosmos/gaia.git && \
    cd gaia && \
    git checkout v4.2.1 && \
    make install

FROM rust:buster

RUN apt-get update

RUN apt-get install cargo git -y

WORKDIR /root/.hermes/

RUN git clone https://github.com/informalsystems/ibc-rs.git && \
    cd ibc-rs && \
    git checkout v0.9.0 && \
    cargo build --release --bin hermes

RUN alias hermes='cargo run --release --bin hermes --'

COPY ./CudosBuilders/docker/hermes-ibc-relayer/config/test-config.toml config.toml

COPY --from=builder /go/bin/gaiad /usr/local/bin/gaiad

ENV CUDOS_HOME=${CUDOS_HOME}


CMD ["sleep", "./ibc-rs/scripts/dev-env ~/.hermes/config.toml ibc-0 ibc-1"]