import sendTx from '../../cudos/txs';
import { bankSendMsg, delegateMsg } from '../../cudos/msgs';
import { getAddressBalance, checkTx, constants, getSigner, getRandomWallets } from '../../cudos/cudosUtils.js';
import BigNumber from 'bignum';
import wait from '../../utils/wait.js';
import {logError, logGeneral} from '../../utils/logger.js';

const BLOCKS_TO_WAIT = 5;
const AMOUNT = new BigNumber(1);
const testName = 'LOADTEST: ';

export default async function runTest(baseConfig, generalConfig) {
    // setup
    const N_ADDRESSES = generalConfig.NUMBER_OF_ADDRESSES;
    const N_TESTS = generalConfig.NUMBER_OF_TESTS;

    const TIME = BLOCKS_TO_WAIT * baseConfig.blockTime;

    const provider = baseConfig.provider;
    const faucetAddress = provider.getAddress(baseConfig.faucetMnemonic);
    let signer = await getSigner(provider, baseConfig.faucetMnemonic);

    const feePerSendMsg = constants.GAS_LIMITS.BANK_SEND.mul(baseConfig.gasPrice);
    const totalPerSendMsg = feePerSendMsg.add(AMOUNT);
    const totalForAllSends = totalPerSendMsg.mul(N_TESTS).mul(N_ADDRESSES);

    const feePerDelegateMsg = constants.GAS_LIMITS.DELEGATE.mul(baseConfig.gasPrice);
    const totalPerDelegateMsg = feePerDelegateMsg.add(AMOUNT);
    const totalForAllDelegates = totalPerDelegateMsg.mul(N_TESTS).mul(generalConfig.VALIDATOR_ADDRESSES.length);

    const balancePerAddressNeeded = totalForAllSends.add(totalForAllDelegates);

    // checks for enough faucet balances
    const faucetBalance = await getAddressBalance(faucetAddress, 'acudos', baseConfig.rest);
    const faucetBalanceNeeded = balancePerAddressNeeded.mul(N_ADDRESSES * 2);
    if (faucetBalance.lt(faucetBalanceNeeded)) {
        logError(testName + `Not enough acudos balance in CUDOS faucet - needed ${faucetBalanceNeeded.toString()}acudos, got ${faucetBalance.toString()}acudos`);
        return;
    }

    // fund some cudos addresses
    const fundedWallets = await getRandomWallets(provider, N_ADDRESSES);

    logGeneral(testName + "Funding wallets from faucet...");
    const fundRes = await sendTx(
        signer, 
        bankSendMsg, 
        {
            destinationAddresses: fundedWallets.map(w => w.address), 
            denom: 'acudos', 
            amount: balancePerAddressNeeded
        },
        constants.GAS_LIMITS.BANK_SEND
    );

    await wait(TIME, '');
    
    checkTx(provider.url, fundRes);

    for (let wallet of fundedWallets) {
        wallet.signer = await getSigner(provider, wallet.mnemonic);
    }

    //start test
    const txs = [];
    for(let i = 1; i <= N_TESTS; i++){
        logGeneral(testName + `Sending batch of Txs N: ${i}`);

        for(let wallet of fundedWallets) {
            //send tx
            const sendTxRes = await sendTx(
                wallet.signer,
                bankSendMsg,
                {
                    destinationAddresses: fundedWallets.map(w => w.address),
                    denom: 'acudos', 
                    amount: AMOUNT
                },
                constants.GAS_LIMITS.BANK_SEND
            );

            txs.push(sendTxRes);

            wallet.signer.account.sequence++;
            //delegate tx
            const delegateTxRes = await sendTx(
                wallet.signer, 
                delegateMsg,
                {
                    destinationAddresses: generalConfig.VALIDATOR_ADDRESSES, 
                    denom: 'acudos',
                    amount: AMOUNT
                },
                constants.GAS_LIMITS.DELEGATE
            );
            
            txs.push(delegateTxRes),

            wallet.signer.account.sequence++;
        }
    }

    await wait(TIME, 'to be sure the txs pass...');

    logGeneral(testName + 'Checking transactions...');

    for (let txResp of txs) {
        checkTx(provider.url, txResp);
    }
    
};