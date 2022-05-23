#!/bin/bash -i

# Removed any cloned repos
rm -rf "$PARAM_SOURCE_DIR/CudosNode"
rm -rf "$PARAM_SOURCE_DIR/CudosBuilders"
rm -rf "$PARAM_SOURCE_DIR/CudosGravityBridge"

# Restore ONLY repos from backup in order to ensure that the checks are going to pass while trying to restore everything from a backup
\cp -r "$PARAM_SOURCE_DIR/CudosNode-backup" "$PARAM_SOURCE_DIR/CudosNode"
\cp -r "$PARAM_SOURCE_DIR/CudosGravityBridge-backup" "$PARAM_SOURCE_DIR/CudosGravityBridge"
\cp -r "$PARAM_SOURCE_DIR/CudosBuilders-backup" "$PARAM_SOURCE_DIR/CudosBuilders"
