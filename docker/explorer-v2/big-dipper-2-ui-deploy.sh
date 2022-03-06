env=$1 #prod or dev
branch=$2

if [ -z "$1" ]; then
    echo ERROR: "No env arg supplied"
    exit 1
fi
if [ -z "$2" ]; then
    echo ERROR: "No branch supplied"
    exit 1
fi

workdir=$PWD
echo $workdir
git clone -b $branch https://github.com/CudoVentures/big-dipper-2.0-cosmos.git $workdir/BigDipper2
cp $workdir/.env-big-dipper-2 $workdir/BigDipper2/.env

cd $workdir/BigDipper2
echo "Starting BigDipper2 docker-compose"
if [ $env = "prod" ]; then
    sudo docker-compose --file=docker-compose-prod.yml up --build -d
elif [ $env = "dev" ]; then
    docker-compose --file=docker-compose-dev.yml up --build -d
else
    echo ERROR: "Wrong env passed: can be either dev or prod"
    exit 1
fi

# clean up
rm -rf $workdir/BigDipper2
