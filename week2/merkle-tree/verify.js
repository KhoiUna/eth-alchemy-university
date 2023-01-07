function verifyProof(proof, node, root, concat) {
  let hash;
  let currentHash;

  for (let i of proof) {
    const isLeft = i.left;

    if (currentHash) {
      hash = isLeft ? concat(i.data, currentHash) : concat(currentHash, i.data);
    } else {
      hash = isLeft ? concat(i.data, node) : concat(node, i.data);
    }
    currentHash = hash;
  }

  return root === hash;
}

module.exports = verifyProof;
