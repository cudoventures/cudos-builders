FROM binary-builder

ARG CUDOS_HOME
ARG LOGGING_DRIVER

RUN apt update && apt install -y jq

COPY ./CudosBuilders/docker/root-node/scripts/init-root.sh ./

RUN chmod +x ./init-root.sh && \
    sed -i 's/\r$//' ./init-root.sh

ENV CUDOS_HOME=${CUDOS_HOME}
ENV LOGGING_DRIVER=${LOGGING_DRIVER}

CMD ["/bin/bash", "-c", "./init-root.sh"]
