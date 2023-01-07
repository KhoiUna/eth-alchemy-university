class MerkleTree {
  constructor(leaves, concat) {
    this.leaves = leaves;
    this.concat = concat;
  }

  recursiveGetRoot(nodes) {
    if (nodes.length === 1) return nodes[0];

    const nextLayer = [];

    for (let index = 0; index < nodes.length - 1; index++) {
      if (index % 2 === 0) {
        nextLayer.push(this.concat(nodes[index], nodes[index + 1]));
      }
    }

    if (nodes.length % 2 !== 0) {
      nextLayer.push(nodes[nodes.length - 1]);
    }

    if (nextLayer.length !== 1) return this.recursiveGetRoot(nextLayer);

    return nextLayer[0];
  }

  getRoot() {
    return this.recursiveGetRoot(this.leaves);
  }

  getProof(index, currentLayer = this.leaves, proof = []) {
    if (currentLayer.length === 1) return proof;

    const nextIndex = Math.floor(index / 2);
    const nextLayer = [];

    for (let i = 0; i < currentLayer.length; i += 2) {
      let left = currentLayer[i];
      let right = currentLayer[i + 1];

      if (right) {
        nextLayer.push(this.concat(left, right));

        if (i === index || i === index - 1) {
          const isLeft = !(index % 2);
          proof.push({
            data: isLeft ? right : left,
            left: !isLeft,
          });
        }
      } else {
        nextLayer.push(left);
      }
    }

    return this.getProof(nextIndex, nextLayer, proof);
  }
}

module.exports = MerkleTree;
