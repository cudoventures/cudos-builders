import { bankSendTx, delegateTx } from '../../cudos/txs';
import { getCudosAddressBalance, checkTx, constants, getSigner } from '../../cudos/cudosUtils.js';
import BigNumber from 'bignum';
import wait from '../../utils/wait.js';
import {logError, logGeneral} from '../../utils/logger.js';

const BLOCKS_TO_WAIT = 5;
const AMOUNT = new BigNumber(1);

export default async function runTest(baseConfig, generalConfig) {
    // setup
    const N_ADDRESSES = generalConfig.NUMBER_OF_ADDRESSES;
    const N_TESTS = generalConfig.NUMBER_OF_TESTS;

    const provider = baseConfig.provider;
    const faucetAddress = provider.getAddress(baseConfig.faucetMnemonic);
    let signer = await getSigner(provider, baseConfig.faucetMnemonic);

    const feePerSendMsg = (new BigNumber(constants.GAS_LIMITS.BANK_SEND)).mul(baseConfig.gasPrice);
    const totalPerSendMsg = feePerSendMsg.add(AMOUNT);
    const balancePerAddressNeeded = totalPerSendMsg.mul(N_TESTS);

    // checks for enough faucet balances
    const faucetBalance = await getCudosAddressBalance(faucetAddress, baseConfig.rest);
    const faucetBalanceNeeded = balancePerAddressNeeded.mul(N_ADDRESSES * 2);
    if (faucetBalance.lt(faucetBalanceNeeded)) {
        logError(`Not enough acudos balance in CUDOS faucet - needed ${faucetBalanceNeeded.toString()}acudos, got ${faucetBalance.toString()}acudos`);
        return;
    }

    // fund some cudos addresses
    const fundedWallets = [];
    for (let i = 0; i < N_ADDRESSES; i++) {
        const mnemonic = provider.getRandomMnemonic();
        const address = provider.getAddress(mnemonic);
        fundedWallets.push({
            mnemonic,
            address,
        });
    }


    const time = BLOCKS_TO_WAIT * baseConfig.blockTime;

    logGeneral("Funding wallets from faucet...");
    const promise = bankSendTx(provider, signer, fundedWallets.map(w => w.address), 'acudos', balancePerAddressNeeded);
    await wait(time, '');

    await checkTx(
        provider.url,
        promise,
    );

    //start test
    for(let i = 1; i <= N_TESTS; i++){
        logGeneral(`Sending batch of Txs N: ${i}`);

        for(let wallet of fundedWallets) {
            signer = await getSigner(provider, wallet.mnemonic);

            //send tx
            const sendTxPromise = bankSendTx(provider, signer, [faucetAddress], 'acudos', AMOUNT);
            wait(time, '').then(() => checkTx(
                provider.url,
                sendTxPromise,
            ))
            
            //delegate tx
            const delegateTxPromise = delegateTx(provider, signer, generalConfig.VALIDATOR_ADDRESSES, AMOUNT);
            wait(time, '').then(() => checkTx(
                provider.url,
                delegateTxPromise,
            ))
        }

        await wait(time, 'to be sure the txs pass...');
    }
};