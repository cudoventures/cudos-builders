export USER_NAME="user-02"
export USER_ID="1234"
export GROUP_NAME="user-02"
export GROUP_ID="1234"
export DOCKER_GROUP_ID=$(getent group docker | awk -F: '{printf "%d", $3}')
export WORKDIR="/usr/nodes"
export SSH_PORT="30022"
export CONTAINER_NAME="cudos-launcher-node-02"
docker-compose -f ./node.yml -p $CONTAINER_NAME up --build -d

mkdir -p ./ssh
if [ $USER_NAME = "root" ]; then
    docker cp ${CONTAINER_NAME}:/root/.ssh/keys/access-key "./ssh/$CONTAINER_NAME"
fi
if [ $USER_NAME != "root" ]; then
    docker cp ${CONTAINER_NAME}:/home/${USER_NAME}/.ssh/keys/access-key "./ssh/$CONTAINER_NAME"
fi

chmod 700 "./ssh/$CONTAINER_NAME"