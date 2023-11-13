function Node(data = null, left = null, right = null) {
  return {
    data,
    left,
    right,
  };
}

function Tree(array) {
  let isFirstTime = true;

  // To create a balanced BST from an array
  const buildTree = (array) => {
    let arr = [...array];
    // To remove duplicates and sort
    if (isFirstTime) {
      arr = [...new Set(arr)].sort((a, b) => a - b);
      isFirstTime = false;
    }
    if (arr.length == 0) return null;

    const mid = Math.floor(arr.length / 2);

    const rootNode = Node(arr[mid]);

    rootNode.left = buildTree(arr.slice(0, mid));
    rootNode.right = buildTree(arr.slice(mid + 1, arr.length));

    return rootNode;
  };

  let root = buildTree(array);

  const insertNode = (value, node = root) => {
    if (node == null) {
      return Node(value);
    }

    if (value < node.data) {
      node.left = insertNode(value, node.left);
    } else if (value > node.data) {
      node.right = insertNode(value, node.right);
    }

    return node;
  };

  const deleteNode = (value, node = root) => {
    if (node == null) return node;

    if (value < node.data) {
      node.left = deleteNode(value, node.left);
      return node;
    } else if (value > node.data) {
      node.right = deleteNode(value, node.right);
      return node;
    }

    // if node is leaf node or has single child
    if (node.right == null) {
      const temp = node.left;
      delete node;
      return temp;
    } else if (node.left == null) {
      const temp = node.right;
      delete node;
      return temp;
    } // if node has two children
    else {
      let parentNode = node;

      node = node.right;

      let prevNode;
      while (node.left != null) {
        prevNode = node;
        node = node.left;
      }

      parentNode.data = node.data;
      prevNode.left = null;
      delete node;

      return parentNode;
    }
  };

  const findNode = (value, node = root) => {
    if (node == null) return;
    if (node.data == value) return node;

    let result;
    if (value < node.data) {
      result = findNode(value, node.left);
    } else if (value > node.data) {
      result = findNode(value, node.right);
    }

    return result ? result : "NOT FOUND";
  };

  const levelOrder = (cb, node = root) => {
    if (node == null) return;
    const queue = [];
    const output = [];
    queue.push(node);
    while (queue.length != 0) {
      let dequeuedNode = queue.shift();
      output.push(dequeuedNode.data);
      if (dequeuedNode.left) queue.push(dequeuedNode.left);
      if (dequeuedNode.right) queue.push(dequeuedNode.right);
    }
    if (cb == undefined) return output;
    else {
      return output.map(cb);
    }
  };

  // const output = [];
  const recLevelOrder = (queue = [root], cb, output = []) => {
    if (queue.length == 0) return;

    const node = queue.shift();

    if (node == null) return;
    output.push(node.data);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);

    recLevelOrder(queue, undefined, output);
    if (cb === undefined) return output;
    else return output.map(cb);
  };

  const inOrder = (cb, node = root, output = []) => {
    if (node == null) return;

    const traverse = (currentNode) => {
      if (currentNode.left) traverse(currentNode.left);
      output.push(currentNode.data);
      if (currentNode.right) traverse(currentNode.right);
    };

    traverse(node);

    if (cb == undefined) return output;
    else return output.map(cb);
  };

  const preOrder = (cb, node = root, output = []) => {
    if (node == null) return;

    const traverse = (currentNode) => {
      output.push(currentNode.data);
      if (currentNode.left) traverse(currentNode.left);
      if (currentNode.right) traverse(currentNode.right);
    };

    traverse(node);

    if (cb == undefined) return output;
    else return output.map(cb);
  };

  const postOrder = (cb, node = root, output = []) => {
    if (node == null) return;

    const traverse = (currentNode) => {
      if (currentNode.left) traverse(currentNode.left);
      if (currentNode.right) traverse(currentNode.right);
      output.push(currentNode.data);
    };

    traverse(node);

    if (cb == undefined) return output;
    else return output.map(cb);
  };

  const height = (node) => {
    if (node == null) return -1;
    const leftHeight = height(node.left);
    const rightHeight = height(node.right);

    return leftHeight > rightHeight ? leftHeight + 1 : rightHeight + 1;
  };

  const depth = (node, parentNode = root, count = 0) => {
    if (parentNode == null) return 0;
    if (node == parentNode) return 0;

    if (node) {
      if (node.data > parentNode.data) {
        return 1 + depth(node, parentNode.right);
      } else if (node.data < parentNode.data) {
        return 1 + depth(node, parentNode.left);
      }
    }
  };

  const isBalanced = (node = root) => {
    if (node == null) return -1;
    const leftHeight = height(node.left);
    const rightHeight = height(node.right);

    return Math.abs(leftHeight - rightHeight) <= 1 ? true : false;
  };

  const rebalance = (node = root) => {
    const array = inOrder(null, node);
    root = buildTree(array);
  };

  return {
    get root() {
      return root
    },
    set root(a) {
      return root
    },
    insertNode,
    deleteNode,
    findNode,
    levelOrder,
    recLevelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
}

// let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 55, 49, 75, 95];

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// Driver Script

const newTree = Tree(arr);

console.log("Created Tree");
prettyPrint(newTree.root);

console.log("Is Balanced?");
console.log(newTree.isBalanced());

console.log("Level Order");
console.log(newTree.levelOrder());

console.log("Preorder");
console.log(newTree.preOrder());

console.log("Postorder");
console.log(newTree.postOrder());

console.log("Inorder");
console.log(newTree.inOrder());

newTree.insertNode(101);
newTree.insertNode(105);
newTree.insertNode(106);
newTree.insertNode(109);
newTree.insertNode(110);
newTree.insertNode(120);
newTree.insertNode(150);

console.log("Tree after inserting new values");
prettyPrint(newTree.root);

console.log("Is balanced after adding new values?");
console.log(newTree.isBalanced());

newTree.rebalance();

console.log("Tree after rebalancing");
prettyPrint(newTree.root);

console.log("Is balanced after rebalancing?");
console.log(newTree.isBalanced());

console.log("Level Order");
console.log(newTree.levelOrder());

console.log("Preorder");
console.log(newTree.preOrder());

console.log("Postorder");
console.log(newTree.postOrder());

console.log("Inorder");
console.log(newTree.inOrder());
// Tests

// let newTree = Tree(arr);

// // newTree.insert(5);

// console.log(newTree.root);

// newTree.insertNode(210);

// newTree.deleteNode(1);

// prettyPrint(newTree.root);

// console.log(newTree.findNode(7));

// console.log(newTree.levelOrder());

// console.log(newTree.levelOrder((item) => item * 2));

// console.log("Recursive level order");
// console.log(newTree.recLevelOrder());

// console.log("Recursive level order with callback");
// console.log(newTree.recLevelOrder([newTree.root], (item) => item * 3));

// console.log("Inorder without callback");
// console.log(newTree.inOrder());

// console.log("In order with callback");
// console.log(newTree.inOrder((item) => item * 2));

// console.log("Preorder");
// console.log(newTree.preOrder());

// console.log("Preorder with callback");
// console.log(newTree.preOrder((item) => item * 2));

// console.log("Postorder");
// console.log(newTree.postOrder());

// console.log("Postorder with callback");
// console.log(newTree.postOrder((item) => item * 2));

// console.log("Height");
// console.log(newTree.height(newTree.root.left));

// console.log("Depth");
// console.log(newTree.depth(newTree.root.left.right.left));

// // prettyPrint(newTree.root);

// const unbalancedBST = {
//   data: 5,
//   left: {
//     data: 3,
//     left: {
//       data: 2,
//       left: {
//         data: 1,
//         left: null,
//         right: null,
//       },
//       right: null,
//     },
//     right: null,
//   },
//   right: {
//     data: 7,
//     left: null,
//     right: null,
//   },
// };

// prettyPrint(unbalancedBST);

// console.log(newTree.isBalanced(unbalancedBST));

// const balanced = newTree.rebalance(unbalancedBST);

// prettyPrint(balanced);
