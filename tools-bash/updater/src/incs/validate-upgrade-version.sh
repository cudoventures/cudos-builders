#!/bin/bash -i

echo -ne "Validating version...";

# get version from container if available

# get version from CudosNode tags if available

# exit if cannot find the version or if CudosNode|Container verios mismatch

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
