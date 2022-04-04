import sendToEth from '../cudos-to-eth/sendToEth.js';
import config from '../config/config.js';
import sendToCudos from '../eth-to-cudos/sendToCudos.js';
import {getCudosAddressBalance} from '../cudos-to-eth/utils.js';
import ethers from 'ethers';
import { Cosmos } from "@cosmostation/cosmosjs";
import ERC20Abi from '../eth-to-cudos/abi/TestERC20A.sol/TestERC20A.json';
import BigNumber from 'bignum';

const numberOfAddresses = 2;
const ethFundAmount = '0.0001';
const acudosPerAddress = new BigNumber(1000);

const RED = "\x1b[31m";
const GREEN = "\x1b[32m";

async function runTest() {
    // setup
    const ethPrivKey = config.ETHEREUM.ETH_PRIV_KEY.replaceAll("\"", '');
    const ethProvider = new ethers.providers.JsonRpcProvider(config.ETHEREUM.ETH_NODE_URL);
    const ethFaucet = new ethers.Wallet(ethPrivKey, ethProvider);
    const erc20Cudos = ethers.ContractFactory.getContract(config.ETHEREUM.ERC20_CONTRACT_ADDRESS, ERC20Abi.abi, ethFaucet);

    const cudosProvider = new Cosmos(config.CUDOS_NETWORK.REST, config.CUDOS_NETWORK.CHAIN_ID);
    cudosProvider.setPath("m/44'/118'/0'/0/0");
    cudosProvider.bech32MainPrefix = 'cudos'
    const faucetMnemonic = config.CUDOS_NETWORK.MNEMONIC.replaceAll("\"", '');
    const cudosFaucet = cudosProvider.getAddress(faucetMnemonic);

    // checks for enough faucet balances
    const ethFaucetInitialEthBalance = await ethFaucet.getBalance();
    if (ethFaucetInitialEthBalance.lt(ethers.utils.parseEther('1'))){
        console.log(RED, `Not enough ETH balance in faucet - needed 1ETH, got ${ethFaucetInitialEthBalance.toString()}ETH`);
        return;
    }

    const ethFaucetAcudosBalance = new BigNumber(await erc20Cudos.balanceOf(ethFaucet.address));
    const neededBalance = acudosPerAddress.mul(numberOfAddresses);
    if (ethFaucetAcudosBalance.lt(neededBalance)) {
        console.log(RED, `Not enough acudos balance in faucet - needed ${neededBalance.toString()}acudos, got ${ethFaucetAcudosBalance.toString()}acudos`);
        return;
    }

    const cudosFaucetBalance = getCudosAddressBalance(cudosFaucet);
    const feePerMsg = (new BigNumber(config.CUDOS_NETWORK.GAS_PER_MSG)).mul(config.CUDOS_NETWORK.GAS_PRICE);
    const balancePerAddress = (new BigNumber(config.CUDOS_NETWORK.BRIDGE_FEE)).add(feePerMsg.mul(2)).add(acudosPerAddress);
    const cudosFaucetBalanceNeeded = balancePerAddress.mul(numberOfAddresses);
    if (cudosFaucetBalance.lt(cudosFaucetBalanceNeeded){
        console.log(RED, `Not enough acudos balance in CUDOS faucet - needed ${cudosFaucetBalanceNeeded.toString()}acudos, got ${cudosFaucetBalance.toString()}acudos`);
        return;
    }

    //fund ETH wallets with ethers and acudos
    // const fundedEthWallets = [];
    // for (let i = 0; i < numberOfAddresses; i++) {
    //     // create wallet
    //     const wallet = ethers.Wallet.createRandom();
    //     fundedEthWallets.push(wallet);

    //     // fund with eth for gas
    //     let tx = {
    //         to: wallet.address,
    //         value: ethers.utils.parseEther(ethFundAmount)
    //     };
        
    //     await ethFaucet.sendTransaction(tx).catch((e) => console.log(RED, 'ERROR:'+ e)).then((tx) => {
    //         console.log(GREEN, `Address ${wallet.address} funded with ${ethFundAmount} ethers`)
    //     });
        
    //     // fund with acudos
    //     await erc20Cudos.transfer(wallet.address, acudosPerAddress.toString()).then((tx) => {
    //         console.log(GREEN, `Address ${wallet.address} funded with ${acudosPerAddress.toString()} acudos`)
    //     });
    // }

    // fund some cudos addresses
    const fundedCudosAddresses = []

    for (let i = 0; i < numberOfAddresses; i++) {
        if (mnemonic !== ''){
           

            const address = cudosProvider.se
            fundedCudosAddresses.push(address);
        }
    }


    // sendToEth(senderMnemonics[0], ethDestAddresses, 1);

    // sendToCudos(ethPrivKeys[0], fundedCudosAddresses, 1);
};

runTest();