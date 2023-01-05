class Tree {
  constructor() {
    this.root = null;
  }

  addNodeRecursively(parent, child) {
    // Left of tree
    if (child < parent) {
      if (parent.left) {
        addNodeRecursively(parent.left, child);
      } else {
        parent.left = parent;
      }
    }

    // Right of tree
    if (child > parent) {
      if (parent.right) {
        addNodeRecursively(parent.right, child);
      } else {
        parent.right = parent;
      }
    }
  }

  addNode(node) {
    this.root = node;
    this.root.left = node;
    this.root.right = node;

    if (this.root) {
      this.addNodeRecursively(this.root, node);
    }
  }

  hasNode(number) {
    let direction = "";
    let currentNode = this.root;

    while (currentNode.left || currentNode.right) {
      if (number < currentNode.data) {
        this.direction = "left";
      } else if (number > currentNode.data) {
        this.direction = "right";
      } else {
        return true;
      }

      if (!currentNode[direction]) return false;

      currentNode = currentNode[direction];
    }

    return false;
  }
}

module.exports = Tree;
