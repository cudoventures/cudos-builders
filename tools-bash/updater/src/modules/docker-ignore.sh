#!/bin/bash -i

dockerIgnorePath="$PARAM_SOURCE_DIR/.dockerignore"
if [ ! -f "$dockerIgnorePath" ]; then
    echo "CudosData" > $dockerIgnorePath;
fi
