FROM golang:buster

ARG USER_ID
ARG USER_NAME
ARG GROUP_ID
ARG GROUP_NAME

RUN apt update

RUN apt install -y jq build-essential nano

RUN if [ $USER_NAME != 'root' ]; then \
        groupadd --gid ${GROUP_ID} ${GROUP_NAME}; \
        useradd --no-log-init --create-home --shell /bin/bash --uid ${USER_ID} --gid ${GROUP_ID} ${USER_NAME}; \
    fi && \
    mkdir -p /usr/cudos

WORKDIR /usr/cudos

COPY ./CudosBuilders/docker/debug-node-ethermint/.env ./env-debug.sh

COPY ./CudosBuilders/docker/debug-node-ethermint/scripts/init.sh ./init-debug.sh
COPY ./CudosBuilders/docker/debug-node-ethermint/scripts/start.sh ./start.sh

RUN echo "\n$(cat ./env-debug.sh)" >> ./init.sh && \
    echo "\n$(cat ./init-debug.sh)" >> ./init.sh && \
    rm -f ./init-debug.sh && \
    chmod +x ./init.sh && \
    chmod +x ./start.sh

RUN chown -R ${USER_NAME}:${GROUP_NAME} /usr/cudos

USER ${USER_NAME}


CMD ["sleep", "infinity"]
