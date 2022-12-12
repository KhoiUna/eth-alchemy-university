const Block = require("./Block");

class Blockchain {
  constructor() {
    this.chain = [new Block()];
  }

  addBlock(block) {
    block.previousHash = this.chain[this.chain.length - 1].toHash();
    this.chain.push(block);
  }

  isValid() {
    for (let i = 0; i < this.chain.length; i++) {
      if (i === 0) continue;

      const previousBlock = this.chain[i - 1];
      const currentBlock = this.chain[i];
      if (
        previousBlock.toHash().toString() !==
        currentBlock.previousHash.toString()
      )
        return false;
    }

    return true;
  }
}

module.exports = Blockchain;
