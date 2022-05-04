#!/bin/bash -i

echo -ne "Cleaning the docker...";
dockerResult=$(docker system prune -a -f 2>&1)
dockerResult=$(docker container prune -f 2>&1)
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
