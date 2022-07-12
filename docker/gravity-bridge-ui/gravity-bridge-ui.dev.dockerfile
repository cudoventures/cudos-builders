FROM node:16-buster

ARG USER_ID
ARG USER_NAME
ARG GROUP_ID
ARG GROUP_NAME
ARG ENV_FILE

RUN if [ $USER_NAME != 'root' ]; then \
        groupmod -g 2000 node; \
        usermod -u 2000 -g 2000 node; \
        groupadd --gid ${GROUP_ID} ${GROUP_NAME}; \
        useradd --no-log-init --create-home --shell /bin/bash --uid ${USER_ID} --gid ${GROUP_ID} ${USER_NAME}; \
    fi

COPY ./CudosBuilders/docker/gravity-bridge-ui/$ENV_FILE /tmp/.env

# RUN apk add --update alpine-sdk

RUN chown ${USER_NAME}:${GROUP_NAME} /tmp/.env && \
    mkdir -p /usr/src/gravity-bridge-ui/node_modules && \
    chown -R ${USER_NAME}:${GROUP_NAME} /usr/src/gravity-bridge-ui/node_modules

WORKDIR /usr/src/gravity-bridge-ui

USER ${USER_NAME}

CMD ["/bin/bash", "-c", "cp /tmp/.env ./config/.env && npm i && npm run dev"] 
