FROM mongo:latest

ARG USER_ID
ARG USER_NAME
ARG GROUP_ID
ARG GROUP_NAME

RUN if [ $USER_NAME != 'root' ]; then \
        groupadd --gid ${GROUP_ID} ${GROUP_NAME}; \
        useradd --no-log-init --create-home --shell /bin/bash --uid ${USER_ID} --gid ${GROUP_ID} ${USER_NAME}; \
    fi

ENV USER_NAME=${USER_NAME}
ENV GROUP_NAME=${GROUP_NAME}

CMD ["/bin/bash", "-c", "chown -R ${USER_NAME}:${GROUP_NAME} /data/db && ls -la /data/db && su ${USER_NAME} -c \"docker-entrypoint.sh mongod\""]