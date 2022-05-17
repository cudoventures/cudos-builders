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

        let mnemonic = 'not found';
        for (let i = walletLines.length;  i-- > 0; ) {
            const walletLine = walletLines[i];
            if (walletLine.indexOf('It is the only way to recover your account if you ever forget your password') !== -1) {
                mnemonic = walletLines[i + 2];
            }
        }

        const model = new WalletModel();

        model.address = addressLine.substring(addressLine.indexOf(': ') + 2);
        model.mnemonic = mnemonic;;

        return model;
    }

}

module.exports = WalletModel;