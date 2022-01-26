env=$1 #prod or dev
hasura_endpoint=$2
admin_secret=$3
workdir=$PWD
echo $workdir

git clone https://github.com/CudoVentures/cudos-bdjuno.git $workdir/CudosBDJuno
cp -R $workdir/bdjuno $workdir/CudosBDJuno/
cp $workdir/.env-bdjuno $workdir/CudosBDJuno/.env

cd $workdir/CudosBDJuno
echo "Starting BDJuno docker-compose"
if [ $env = "prod" ]; then
    sudo docker-compose --file=docker-compose-prod.yml up --build -d
elif [ $env = "dev" ]; then
    docker-compose --file=docker-compose-dev.yml up --build -d
else
    echo "Wrong env passed: can be either dev or prod"
fi

cd $workdir/CudosBDJuno/hasura
curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash
hasura metadata apply --endpoint $hasura_endpoint --admin-secret $admin_secret

# clean up
rm -rf $workdir/CudosBDJuno
