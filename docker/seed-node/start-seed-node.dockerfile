FROM binary-builder

CMD ["/bin/bash", "-c", "cudos-noded start  --state-sync.snapshot-interval 2000 --state-sync.snapshot-keep-recent 2"] 