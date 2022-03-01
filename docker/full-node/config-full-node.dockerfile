FROM binary-builder

ARG CUDOS_HOME
ARG LOGGING_DRIVER

COPY ./CudosBuilders/docker/full-node/config-full-node.sh ./

COPY ./CudosBuilders/docker/config ./external-config

RUN chmod +x ./config-full-node.sh && \
    sed -i 's/\r$//' ./config-full-node.sh

ENV CUDOS_HOME=${CUDOS_HOME}
ENV LOGGING_DRIVER=${LOGGING_DRIVER}

CMD ["/bin/bash", "-c", "./config-full-node.sh"]
