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
    mkdir -p /usr/cudos && \
    chown ${USER_NAME}:${GROUP_NAME} /usr/cudos

WORKDIR /usr/cudos

COPY ./CudosBuilders/docker/debug-node/init.sh ./

RUN chown ${USER_NAME}:${GROUP_NAME} ./init.sh

USER ${USER_NAME}

CMD ["sleep", "infinity"]
