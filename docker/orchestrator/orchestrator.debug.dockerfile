
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

RUN mkdir -p /usr/src/orchestrator/target && chown ${USER_NAME}:${GROUP_NAME} /usr/src/orchestrator/target && \
    mkdir -p /usr/src/orchestrator/cosmos_gravity/target && chown ${USER_NAME}:${GROUP_NAME} /usr/src/orchestrator/cosmos_gravity/target && \
    mkdir -p /usr/src/orchestrator/ethereum_gravity/target && chown ${USER_NAME}:${GROUP_NAME} /usr/src/orchestrator/ethereum_gravity/target && \
    mkdir -p /usr/src/orchestrator/gbt/target && chown ${USER_NAME}:${GROUP_NAME} /usr/src/orchestrator/gbt/target && \
    mkdir -p /usr/src/orchestrator/gravity_utils/target && chown ${USER_NAME}:${GROUP_NAME} /usr/src/orchestrator/gravity_utils/target && \
    mkdir -p /usr/src/orchestrator/orchestrator/target && chown ${USER_NAME}:${GROUP_NAME} /usr/src/orchestrator/orchestrator/target && \
    mkdir -p /usr/src/orchestrator/relayer/target && chown ${USER_NAME}:${GROUP_NAME} /usr/src/orchestrator/relayer/target

USER ${USER_NAME}

CMD ["sleep", "infinity"]

# CMD ["/bin/bash", "-c", "cd /usr/src/orchestrator && cargo build && cd /home/orchestrator/bin/ && cp /usr/src/orchestrator/target/debug/gbt ./gbt && ./orchestrator-run.sh"]
