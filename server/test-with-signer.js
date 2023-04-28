const { ethers } = require('ethers');
const AlchemyProvider = require('@ethersproject/providers').AlchemyProvider;

const alchemyApiKey = 'g3z-MlLsjm3ysozk_KxI4AY6ilHZik3r';
const alchemyProvider = new AlchemyProvider('goerli', alchemyApiKey);
const signer = alchemyProvider.getSigner();

async function runAlchemy() {
    // Example usage: sign a message
    const message = 'Hello, world!';
    const signature = await signer.signMessage(message);
    console.log(signature);
}
runAlchemy();