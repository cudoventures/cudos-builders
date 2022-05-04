FROM hermes-ibc-relayer-binary-builder

ARG USER_ID
ARG USER_NAME
ARG GROUP_ID
ARG GROUP_NAME

RUN if [ $USER_NAME != 'root' ]; then \
        addgroup -gid ${GROUP_ID} $GROUP_NAME; \
        adduser --disabled-password -gecos "" -uid ${USER_ID} -gid ${GROUP_ID} ${USER_NAME}; \
    fi

WORKDIR /usr/hermes

COPY ./CudosBuilders/docker/hermes-ibc-relayer/config/config.toml .

COPY ./CudosBuilders/docker/hermes-ibc-relayer/scripts/hermes-ibc-relayer-init.sh .

# RUN chmod +x ./hermes-ibc-relayer-run.sh && \
#     chown -R ${USER_NAME}:${GROUP_NAME} ./ && \
#     sed -i 's/\r$//' ./hermes-ibc-relayer-run.sh

USER ${USER_NAME}

CMD ["/bin/bash", "-c", "./hermes-ibc-relayer-init.sh"]
