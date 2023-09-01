env=$1             #prod or dev
hasura_endpoint=$2 # http://localhost:8080 or simillar
admin_secret=$3
branch=$4

if [ -z "$1" ]; then
    echo ERROR: "No env arg supplied"
    exit 1
fi
if [ -z "$2" ]; then
    echo ERROR: "No hasura endpoint supplied"
    exit 1
fi
if [ -z "$3" ]; then
    echo ERROR: "No hasura password supplied"
    exit 1
fi
if [ -z "$4" ]; then
    echo ERROR: "No branch supplied"
    exit 1
fi

workdir=$PWD
echo $workdir
git clone -b $branch https://github.com/CudoVentures/cudos-bdjuno.git $workdir/CudosBDJuno-v4
cp -R $workdir/bdjuno $workdir/CudosBDJuno-v4/
cp -R $workdir/hasura $workdir/CudosBDJuno-v4/
cp $workdir/.env-bdjuno $workdir/CudosBDJuno-v4/.env
cp $workdir/docker-compose-dev.yml $workdir/CudosBDJuno-v4/docker-compose-dev.yml

cd $workdir/CudosBDJuno-v4
echo "Starting BDJuno docker-compose"
if [ $env = "prod" ]; then
    sudo docker-compose --file=docker-compose-prod.yml up --build -d
elif [ $env = "dev" ]; then
    docker-compose --file=docker-compose-dev.yml up --build -d
else
    echo ERROR: "Wrong env passed: can be either dev or prod"
    exit 1
fi

cd $workdir/CudosBDJuno-v4/hasura
curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash
hasura metadata apply --endpoint $hasura_endpoint --admin-secret $admin_secret

# clean up
rm -rf $workdir/CudosBDJuno-v4
