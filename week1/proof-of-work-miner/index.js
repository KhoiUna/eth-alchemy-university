const SHA256 = require("crypto-js/sha256");
const TARGET_DIFFICULTY =
  BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

function addTransaction(transaction) {
  // TODO: add transaction to mempool
  mempool.push(transaction);
}

function mine() {
  // TODO: mine a block
  const transactions = mempool.slice(0, MAX_TRANSACTIONS);
  mempool.splice(0, MAX_TRANSACTIONS);

  const block = { id: blocks.length };

  block.transactions = transactions;
  block.nonce = 0;

  let hash = SHA256(JSON.stringify(block));

  while (BigInt(`0x${hash}`) >= TARGET_DIFFICULTY) {
    hash = SHA256(JSON.stringify(block));
    block.nonce += 1;
  }

  block.hash = hash;
  blocks.push(block);
}

module.exports = {
  TARGET_DIFFICULTY,
  MAX_TRANSACTIONS,
  addTransaction,
  mine,
  blocks,
  mempool,
};
