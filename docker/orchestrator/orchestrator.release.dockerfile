
FROM rust:1.54 as cargo-build

RUN apt-get update

WORKDIR /usr/src

COPY ./CudosGravityBridge/orchestrator ./

RUN cargo build --release

FROM debian:buster

WORKDIR /home/orchestrator/bin/

COPY --from=cargo-build /usr/src/target/release/gbt .

COPY ./CudosBuilders/docker/orchestrator/orchestrator-run.sh .

RUN addgroup -gid 1000 gbt && \
    adduser --disabled-password -uid 1000 -gid 1000 gbt && \
    chown gbt:gbt ./gbt && \
    chown gbt:gbt ./orchestrator-run.sh && \
    chmod +x ./gbt && \
    chmod +x ./orchestrator-run.sh && \
    sed -i 's/\r$//' ./orchestrator-run.sh

# CMD ["sleep", "infinity"]

CMD ["/bin/bash", "-c", "./orchestrator-run.sh"]
