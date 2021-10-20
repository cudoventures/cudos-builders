FROM binary-builder

ARG USER_ID
ARG USER_NAME
ARG GROUP_ID
ARG GROUP_NAME
ARG CUDOS_HOME

RUN if [ $USER_NAME != 'root' ]; then \
        groupadd --gid ${GROUP_ID} ${GROUP_NAME}; \
        useradd --no-log-init --create-home --shell /bin/bash --uid ${USER_ID} --gid ${GROUP_ID} ${USER_NAME}; \
    fi

RUN apt update && apt install -y jq

COPY ./CudosBuilders/docker/root-node/init-root.sh ./

RUN chmod +x ./init-root.sh && \
    sed -i 's/\r$//' ./init-root.sh

ENV USER_NAME=${USER_NAME}
ENV GROUP_NAME=${GROUP_NAME}
ENV CUDOS_HOME=${CUDOS_HOME}

CMD ["/bin/bash", "-c", "chown -R ${USER_NAME}:${GROUP_NAME} ${CUDOS_HOME} && su ${USER_NAME} -c ./init-root.sh"]
