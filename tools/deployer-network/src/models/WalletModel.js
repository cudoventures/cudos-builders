class WalletModel {

    constructor() {
        this.address = '';
        this.mnemonic = '';
    }

    static instanceByString(walletString) {
        const walletLines = walletString.split('\n');
        const addressLine = walletLines.find((walletLine) => {
            return walletLine.indexOf('address:') !== -1;
        });

        const model = new WalletModel();

        model.address = addressLine.substring(addressLine.indexOf(': ') + 2);
        model.mnemonic = walletLines[walletLines.length - 1];

        return model;
    }

}

module.exports = WalletModel;