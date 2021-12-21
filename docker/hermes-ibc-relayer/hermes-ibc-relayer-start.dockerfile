FROM hermes-ibc-relayer-binary-builder

ARG USER_ID
ARG USER_NAME
ARG GROUP_ID
ARG GROUP_NAME

RUN if [ $USER_NAME != 'root' ]; then \
        addgroup -gid ${GROUP_ID} $GROUP_NAME; \
        adduser --disabled-password -gecos "" -uid ${USER_ID} -gid ${GROUP_ID} ${USER_NAME}; \
    fi

USER ${USER_NAME}:${GROUP_NAME}

# CMD ["sleep", "infinity"]
CMD ["/bin/bash", "-c", "hermes start"]
