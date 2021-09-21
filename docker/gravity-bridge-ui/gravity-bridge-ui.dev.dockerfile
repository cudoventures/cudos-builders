
FROM nikolaik/python-nodejs:python3.9-nodejs16-alpine

ARG USER_ID
ARG USER_NAME
ARG GROUP_ID
ARG GROUP_NAME
ARG ENV_FILE

RUN if [ $USER_NAME != 'root' ]; then \
        addgroup -g ${GROUP_ID} $GROUP_NAME; \
        adduser -D -g "" -u ${USER_ID} -G ${GROUP_NAME} ${USER_NAME}; \
    fi

COPY ./CudosBuilders/docker/gravity-bridge-ui/$ENV_FILE /tmp/.env

RUN apk add --update alpine-sdk

RUN chown ${USER_NAME}:${GROUP_NAME} /tmp/.env && \
    mkdir -p /usr/src/gravity-bridge-ui/node_modules && \
    chown -R ${USER_NAME}:${GROUP_NAME} /usr/src/gravity-bridge-ui/node_modules

WORKDIR /usr/src/gravity-bridge-ui

USER ${USER_NAME}:${GROUP_NAME}

ENTRYPOINT mv /tmp/.env ./config/.env && npm i && npm run dev