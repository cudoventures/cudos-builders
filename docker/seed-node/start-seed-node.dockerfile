FROM binary-builder

ARG CUDOS_HOME
ARG LOGGING_DRIVER

ENV CUDOS_HOME=${CUDOS_HOME}
ENV LOGGING_DRIVER=${LOGGING_DRIVER}

CMD ["/bin/bash", "-c", "cudos-noded start  --state-sync.snapshot-interval 2000 --state-sync.snapshot-keep-recent 2"] 
