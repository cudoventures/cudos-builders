
FROM nikolaik/python-nodejs:python3.9-nodejs16-alpine

RUN apk add --update alpine-sdk

WORKDIR /usr/gravity-bridge-ui

ARG ENV_FILE

COPY ./CudosBuilders/docker/gravity-bridge-ui/$ENV_FILE /tmp/.env

ENTRYPOINT mv /tmp/.env ./config/.env && npm i && npm run dev