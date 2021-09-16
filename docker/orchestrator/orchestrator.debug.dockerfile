
FROM rust:1.54 as cargo-build

RUN apt-get update

WORKDIR /home/orchestrator/bin/

COPY ./CudosBuilders/docker/orchestrator/orchestrator-run.sh .

RUN addgroup -gid 1000 gbt && \
    adduser --disabled-password -uid 1000 -gid 1000 gbt && \
    chown gbt:gbt ./orchestrator-run.sh && \
    chmod +x ./orchestrator-run.sh && \
    sed -i 's/\r$//' ./orchestrator-run.sh

CMD ["sleep", "infinity"]

# CMD ["/bin/bash", "-c", "./orchestrator-run.sh"]
