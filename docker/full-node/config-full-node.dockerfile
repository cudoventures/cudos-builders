FROM binary-builder

ARG USER_ID
ARG USER_NAME
ARG GROUP_ID
ARG GROUP_NAME
ARG CUDOS_HOME

RUN if [ $USER_NAME != 'root' ]; then \
        addgroup -gid ${GROUP_ID} $GROUP_NAME; \
        adduser --disabled-password -gecos "" -uid ${USER_ID} -gid ${GROUP_ID} ${USER_NAME}; \
    fi

COPY ./CudosBuilders/docker/full-node/config-full-node.sh ./

COPY ./CudosBuilders/docker/config ./external-config

RUN chmod +x ./config-full-node.sh && \
    sed -i 's/\r$//' ./config-full-node.sh

ENV USER_NAME=${USER_NAME}
ENV GROUP_NAME=${GROUP_NAME}
ENV CUDOS_HOME=${CUDOS_HOME}

CMD ["/bin/bash", "-c", "chown -R ${USER_NAME}:${GROUP_NAME} ${CUDOS_HOME} && su ${USER_NAME} -c ./config-full-node.sh"]
