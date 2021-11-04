FROM binary-builder

ARG CUDOS_HOME

COPY ./CudosBuilders/docker/full-node/config-full-node.sh ./

COPY ./CudosBuilders/docker/config ./external-config

RUN chmod +x ./config-full-node.sh && \
    sed -i 's/\r$//' ./config-full-node.sh

ENV CUDOS_HOME=${CUDOS_HOME}

CMD ["/bin/bash", "-c", "./config-full-node.sh"]
