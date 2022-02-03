FROM binary-builder

ARG CUDOS_HOME

RUN apt update && apt install -y jq

COPY ./CudosBuilders/docker/root-node/scripts/init-root.sh ./

RUN chmod +x ./init-root.sh && \
    sed -i 's/\r$//' ./init-root.sh

ENV CUDOS_HOME=${CUDOS_HOME}

CMD ["/bin/bash", "-c", "./init-root.sh"]
