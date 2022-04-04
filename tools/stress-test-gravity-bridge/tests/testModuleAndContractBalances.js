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
const GREEN = "\x1b[32m"

(async () =>{
// fund some eth wallets
const ethPrivKey = config.ETHEREUM.ETH_PRIV_KEY.replaceAll("\"", '');
const provider = new ethers.providers.JsonRpcProvider(config.ETHEREUM.ETH_NODE_URL);
const ethFaucet = new ethers.Wallet(ethPrivKey, provider);
const erc20Cudos = ethers.ContractFactory.getContract(config.ETHEREUM.ERC20_CONTRACT_ADDRESS, ERC20Abi.abi, ethFaucet);

// first check if there is enough balance in acudos and ether
const faucetInitialEthBalance = await ethFaucet.getBalance();

if (faucetInitialEthBalance.lt(ethers.utils.parseEther(1))){
    console.log(RED, `Not enough ETH balance in faucet - needed ${1}ETH, got ${faucetInitialEthBalance.toString(10)}ETH`);
    return;
}

const faucetAcudosBalance = new BigNumber(await erc20Cudos.balanceOf(ethFaucet.address));
const neededBalance = acudosPerAddress.mul(numberOfAddresses);
if (faucetAcudosBalance.lt(neededBalance)) {
    console.log(RED, `Not enough acudos balance in faucet - needed ${neededBalance.toString(10)}acudos, got ${faucetAcudosBalance.toString(10)}acudos`);
    return;
}

// const fundedWallets = [];
// for (let i = 0; i < numberOfAddresses; i++) {
//     // create wallet
//     const wallet = ethers.Wallet.createRandom();
//     fundedWallets.push(wallet);

//     // fund with eth for gas
//     let tx = {
//         to: wallet.address,
//         value: ethers.utils.parseEther(ethFundAmount)
//     };
    
//     await ethFaucet.sendTransaction(tx).catch((e) => console.log(RED, 'ERROR:'+ e)).then((tx) => {
//         console.log(GREEN, `Address ${wallet.address} funded with ${ethFundAmount} ethers`)
//     });
    
//     // fund with acudos
//     await erc20Cudos.transfer(wallet.address, acudosPerAddress);
// }

// fund some cudos addresses

// const ethDestAddresses = [];

// for (let ethPrivKey of ethPrivKeys) {
//     if (ethPrivKey !== ''){
//         const provider = new ethers.providers.JsonRpcProvider(config.ETHEREUM.ETH_NODE_URL);
//         const wallet = new ethers.Wallet(ethPrivKey, provider);
//         ethDestAddresses.push(wallet.address);
//     }
// }

// const senderMnemonic = config.CUDOS_NETWORK.MNEMONIC.replaceAll("\"", '');
// const cudosDestAddresses = []

// for (let mnemonic of senderMnemonics) {
//     if (mnemonic !== ''){
//         const provider = new Cosmos(config.CUDOS_NETWORK.REST, config.CUDOS_NETWORK.CHAIN_ID);
//         provider.setPath("m/44'/118'/0'/0/0");
//         provider.bech32MainPrefix = 'cudos'

//         const address = provider.getAddress(mnemonic);
//         cudosDestAddresses.push(address);
//     }
// }


// sendToEth(senderMnemonics[0], ethDestAddresses, 1);

// sendToCudos(ethPrivKeys[0], cudosDestAddresses, 1);
})();