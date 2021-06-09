
FROM rust:latest as cargo-build

RUN apt-get update

WORKDIR /usr/src

RUN git clone https://github.com/cosmos/gravity-bridge.git

WORKDIR /usr/src/gravity-bridge/orchestrator

RUN cargo build --release

FROM debian:buster

WORKDIR /home/orchestrator/bin/

COPY --from=cargo-build /usr/src/gravity-bridge/orchestrator/target/release/orchestrator .

COPY ./CudosBuilders/docker/orchestrator/run.sh .

RUN addgroup -gid 1000 orchestrator && \
    adduser --disabled-password -uid 1000 -gid 1000 orchestrator && \
    chown orchestrator:orchestrator ./orchestrator && \
    chown orchestrator:orchestrator ./run.sh && \
    chmod +x ./orchestrator && \
    chmod +x ./run.sh && \
    sed -i 's/\r$//' ./run.sh

# CMD ["sleep", "infinity"]

CMD ["/bin/bash", "-c", "./run.sh"]
