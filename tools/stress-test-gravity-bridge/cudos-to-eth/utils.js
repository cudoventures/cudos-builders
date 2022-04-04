import config from '../config/config.js';
import fetch from 'node-fetch';

export function getCudosAddressBalance(address) {
    fetch(config.CUDOS_NETWORK.REST + "/cosmos/bank/v1beta1/balances/" + address).then(async (res) => {
        const data = await res.json();
        return data.balances.find(a => a.denom === 'acudos').amount;
    })
}