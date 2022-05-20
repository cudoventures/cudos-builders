# Merging to cudos-master

Update branch variable in from "cudos-dev" to "v0.8.0".
Update required free space from 5GB to 500GB

# Debug command

sudo rm -rf ../../../CudosConstruct/* && (sudo rm -rf ../../../CudosConstruct/.* || true) && sudo ./src/init.sh standalone-validator-node

sudo rm -rf ../../../CudosConstruct/* && (sudo rm -rf ../../../CudosConstruct/.* || true) && sudo ./src/relayer.sh
