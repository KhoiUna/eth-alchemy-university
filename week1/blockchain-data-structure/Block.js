const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(previousHash, data) {
    this.previousHash = previousHash;
    this.data = data;
  }

  toHash() {
    return SHA256(this.previousHash + this.data);
  }
}

module.exports = Block;
