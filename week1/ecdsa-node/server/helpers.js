const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex } = require("ethereum-cryptography/utils");

function getAddress(publicKey) {
  const slicedKey = publicKey.slice(1);
  const hash = keccak256(slicedKey);
  return hash.slice(-20);
}

async function recoverKey(message, signature, recoveryBit) {
  const hash = hashMessage(message);
  return secp.recoverPublicKey(hash, signature, recoveryBit);
}

async function generateBalances(numberOfBalances = 3) {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  const balances = [];

  for (let i = 0; i < numberOfBalances; i++) {
    const privateKey = secp.utils.randomPrivateKey();
    const publicKey = secp.getPublicKey(privateKey);
    const address = getAddress(publicKey);

    balances.push({
      privateKey: toHex(privateKey),
      publicKey: toHex(publicKey),
      address: `0x${toHex(address)}`,
      balance: getRandomInt(1, 11) * 10,
    });
  }

  return balances;
}

function hashMessage(message) {
  const bytes = utf8ToBytes(message);
  const hash = keccak256(bytes);
  return hash;
}

async function recoverKey(message, signature, recoveryBit) {
  const hash = hashMessage(message);
  return secp.recoverPublicKey(hash, signature, recoveryBit);
}

module.exports = {
  getAddress,
  recoverKey,
  generateBalances,
};
