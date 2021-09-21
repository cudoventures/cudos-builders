
FROM rust:1.54 as cargo-build

ARG USER_ID
ARG USER_NAME
ARG GROUP_ID
ARG GROUP_NAME

RUN if [ $USER_NAME != 'root' ]; then \
        addgroup -gid ${GROUP_ID} $GROUP_NAME; \
        adduser --disabled-password -gecos "" -uid ${USER_ID} -gid ${GROUP_ID} ${USER_NAME}; \
    fi

RUN apt-get update

WORKDIR /home/orchestrator/bin/

COPY ./CudosBuilders/docker/orchestrator/orchestrator-run.sh .

RUN chmod +x ./orchestrator-run.sh && \
    chown -R ${USER_NAME}:${GROUP_NAME} ./ && \
    sed -i 's/\r$//' ./orchestrator-run.sh

USER ${USER_NAME}:${GROUP_NAME}

CMD ["sleep", "infinity"]

# CMD ["/bin/bash", "-c", "cd /usr/src/orchestrator && cargo build && cd /home/orchestrator/bin/ && cp /usr/src/orchestrator/target/debug/gbt ./gbt && ./orchestrator-run.sh"]
