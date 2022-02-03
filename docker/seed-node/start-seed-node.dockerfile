FROM binary-builder

ARG CUDOS_HOME

ENV CUDOS_HOME=${CUDOS_HOME}

CMD ["/bin/bash", "-c", "cudos-noded start  --state-sync.snapshot-interval 2000 --state-sync.snapshot-keep-recent 2"] 