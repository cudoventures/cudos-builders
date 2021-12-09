FROM rust:buster

ARG USER_ID
ARG USER_NAME
ARG GROUP_ID
ARG GROUP_NAME
ARG HERMES_HOME

RUN if [ $USER_NAME != 'root' ]; then \
        addgroup -gid ${GROUP_ID} $GROUP_NAME; \
        adduser --disabled-password -gecos "" -uid ${USER_ID} -gid ${GROUP_ID} ${USER_NAME}; \
    fi

WORKDIR /usr/hermes

RUN apt-get update

RUN apt-get install cargo -y

RUN cargo install ibc-relayer-cli --bin hermes --locked

COPY ./CudosBuilders/docker/hermes-ibc-relayer/config/config.toml .

COPY ./CudosBuilders/docker/hermes-ibc-relayer/scripts/hermes-ibc-relayer-run.sh .

# RUN chmod +x ./hermes-ibc-relayer-run.sh && \
#     chown -R ${USER_NAME}:${GROUP_NAME} ./ && \
#     sed -i 's/\r$//' ./hermes-ibc-relayer-run.sh

USER ${USER_NAME}:${GROUP_NAME}

ENV HERMES_HOME=${HERMES_HOME}

CMD ["sleep", "infinity"]

# CMD ["/bin/bash", "-c", "./hermes-ibc-relayer-run.sh"]
