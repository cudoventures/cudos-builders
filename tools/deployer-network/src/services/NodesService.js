class NodesService {

    constructor(topologyHelper, instancesService) {
        this.topologyHelper = topologyHelper;
        this.instancesService = instancesService;
    }

    async start() {
        await this.initAndStartRootValidator();
    }

    async initAndStartRootValidator() {
        const rootValidatorModel = this.topologyHelper.rootValidator;
        const sshHelper = this.instancesService.getSshHelper(rootValidatorModel.computerId);
        await sshHelper.exec([
            'cp ./CudosBuilders/root-node/root-node.env.example ./CudosBuilders/root-node/root-node.local.env'
        ])
        // await sshHelper.exec('docker system prune -a -f');
        // await sshHelper.exec('docker volume prune');
    }

    async initAndStartRootValidatorSeedNodes() {

    }

    async initAndStartRootValidatorSentryNodes() {

    }

    async initValidator(computerId) {

    }

    async configAndStartValidator(computerId) {
        
    }

    async initAndStartValidatorSeedNode(computerId) {

    }

    async initAndStartValidatorSentryNode(computerId) {

    }

    onExit = async () => {

    }

}

module.exports = NodesService;