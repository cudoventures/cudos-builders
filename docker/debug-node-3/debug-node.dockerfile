FROM golang:1.18.6-buster

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

COPY ./CudosBuilders/docker/root-node/root-node.local.env ./init.sh

COPY ./CudosBuilders/docker/debug-node-3/.env ./env-debug.sh

COPY ./CudosBuilders/docker/root-node/scripts/init-root.sh ./init-root.sh

COPY ./CudosBuilders/docker/debug-node-3/scripts/init-debug.sh ./init-debug.sh

RUN echo "\n$(cat ./env-debug.sh)" >> ./init.sh && \
    echo "\n$(cat ./init-root.sh)" >> ./init.sh && \
    echo "\n$(cat ./init-debug.sh)" >> ./init.sh && \
    rm -f ./init-root.sh && \
    chmod +x ./init.sh

RUN chown -R ${USER_NAME}:${GROUP_NAME} /usr/cudos

USER ${USER_NAME}


CMD ["sleep", "infinity"]
