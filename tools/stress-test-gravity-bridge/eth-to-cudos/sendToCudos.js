import ethers from "ethers";
import GravityAbi from './abi/Gravity.sol/Gravity.json';
import ERC20Abi from './abi/TestERC20A.sol/TestERC20A.json';
import config from "../config/config.js";
import { fromBech32, toBase64, toHex } from '@cosmjs/encoding';

const RED = "\x1b[31m";
const GREEN = "\x1b[32m";

export default async function sendToCudos(ethPrivKey, cudosAddresses, amount) {
    const provider = new ethers.providers.JsonRpcProvider(config.ETHEREUM.ETH_NODE_URL);
    const wallet = new ethers.Wallet(ethPrivKey, provider);

    const erc20Cudos = ethers.ContractFactory.getContract(config.ETHEREUM.ERC20_CONTRACT_ADDRESS, ERC20Abi.abi, wallet);
    const gravity = ethers.ContractFactory.getContract(config.ETHEREUM.BRIDGE_CONTRACT_ADDRESS, GravityAbi.abi, wallet);

    const sendCount = cudosAddresses.length;

    const res = await erc20Cudos.approve(gravity.address, amount.mul(sendCount).toString());
    console.log(res);
    await new Promise((resolve) => {
        console.log(GREEN, "Waiting 15 seconds to be sure the allowance tx passes...");
        setTimeout(resolve, 15000);
    });

    for (let cudosAddress of cudosAddresses) {
        const addressByteArray = fromBech32(cudosAddress).data;
        const addressBytes32Array = new Uint8Array(32);
        addressByteArray.forEach((byte, i) => { addressBytes32Array[32 - addressByteArray.length + i] = byte });
        const res = await gravity.sendToCosmos(
            erc20Cudos.address,
            `0x${toHex(addressBytes32Array)}`,
            amount.toString()
        );
    }
}
