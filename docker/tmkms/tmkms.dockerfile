
FROM rust:1.63 as builder

ARG USER_ID
ARG USER_NAME
ARG GROUP_ID
ARG GROUP_NAME

RUN if [ $USER_NAME != 'root' ]; then \
        addgroup -gid ${GROUP_ID} $GROUP_NAME; \
        adduser --disabled-password -gecos "" -uid ${USER_ID} -gid ${GROUP_ID} ${USER_NAME}; \
    fi

RUN apt-get update

USER ${USER_NAME}

WORKDIR /usr/cudos

RUN git clone https://github.com/iqlusioninc/tmkms.git && \
    cd tmkms && \
    git checkout v0.12.2 && \
    cargo build --release --features=tx-signer,softsign

RUN cp /usr/cudos/tmkms/target/release/tmkms /usr/bin/tmkms

RUN tmkms init /usr/cudos/tmkms

# RUN mv /usr/cudos/tmkms/state/cosmoshub-3-consensus.json /usr/cudos/tmkms/state/cudos-consensus.json

COPY ./CudosBuilders/docker/tmkms/tmkms.toml /usr/cudos/tmkms/tmkms.toml


CMD ["sleep", "infinity"]