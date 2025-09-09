/**
 * quests\story1\quest02\solution.ts
 * 
 * ~~ Tangled Trees ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 9/8/2025
 */

/**
 * interface for a node in a binary search tree
 */
interface TreeNode {
    rank: number;
    key: string;
    left: TreeNode | null;
    right: TreeNode | null;
    parent: TreeNode | null;
};

/**
 * adds a node to a tree given it's root
 * traverses the tree to find the correct place
 * 
 * @param root root of the tree
 * @param rank rank of the node, used to determine position
 * @param key key of the node, label
 * @returns node to be set to the root if there is no root node
 */
const addNode = (root: TreeNode | null, rank: number, key: string): TreeNode => {
    const newNode: TreeNode = { rank, key, left: null, right: null, parent: null };

    if (root === null) return newNode;    
    let current: TreeNode = root;

    while (true) {
        // node is smaller, process left
        if (current.rank > rank) {
            if (current.left !== null) {
                // move left
                current = current.left;
            } else {
                // add to left node
                current.left = newNode;
                newNode.parent = current;
                break;
            }
        // node is bigger, process right
        } else {
            if (current.right !== null) {
                // move right
                current = current.right;
            } else {
                // add to right node
                current.right = newNode;
                newNode.parent = current;
                break;
            }
        }
    }

    return newNode;
};

/**
 * gets all keys by depth, prefix search
 * 
 * @param root root of the tree to search
 */
const getAllDepths = (node: TreeNode, depth: number, depths: string[][]): string[][] => {
    if (!depths[depth]) depths[depth] = [];

    depths[depth].push(node.key);

    if (node.left !== null) getAllDepths(node.left, depth + 1, depths);
    if (node.right !== null) getAllDepths(node.right, depth + 1, depths);

    return depths;
}

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 1
 */
const part1 = (input: string): string => {
    let leftTree: TreeNode | null = null;
    let rightTree: TreeNode | null = null;

    input.split(/\n/g).forEach(line => {
        // parse the nodes
        const [_, __, left, right] = line.split(' ').map(part => part.split('=')[1]);
        const parsedLeft = left.replace(/[\[\]]/g, '').split(',');
        const parsedRight = right.replace(/[\[\]]/g, '').split(',');

        // handle left tree addition
        const newLeft = addNode(leftTree, parseInt(parsedLeft[0]), parsedLeft[1]);
        if (leftTree === null) leftTree = newLeft;

        // handle right tree addition
        const newRight = addNode(rightTree, parseInt(parsedRight[0]), parsedRight[1]);
        if (rightTree === null) rightTree = newRight;
    });

    // get all keys with their depths
    if (leftTree === null || rightTree === null) return 'error';

    const leftDepths = getAllDepths(leftTree, 0, []).toSorted((a, b) => b.length - a.length);
    const rightDepths = getAllDepths(rightTree, 0, []).toSorted((a, b) => b.length - a.length);

    return leftDepths[0].join('') + rightDepths[0].join('');
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 2
 */
const part2 = (input: string): string => {
    let leftTree: TreeNode | null = null;
    let rightTree: TreeNode | null = null;
    const connected: { [key: string]: TreeNode[] } = {};

    input.split(/\n/g).forEach(line => {
        // parse the nodes
        const [instruction, ...args] = line.split(' ');

        if (instruction === 'ADD') {
            const [id, left, right] = args.map(part => part.split('=')[1]);
            const parsedLeft = left.replace(/[\[\]]/g, '').split(',');
            const parsedRight = right.replace(/[\[\]]/g, '').split(',');

            // handle left tree addition
            const newLeft = addNode(leftTree, parseInt(parsedLeft[0]), parsedLeft[1]);
            if (leftTree === null) leftTree = newLeft;

            // handle right tree addition
            const newRight = addNode(rightTree, parseInt(parsedRight[0]), parsedRight[1]);
            if (rightTree === null) rightTree = newRight;

            connected[id] = [newLeft, newRight];
        } else if (instruction === 'SWAP') {
            // find connection nodes and swap rank and key
            const [left, right] = connected[args[0]];

            const temp = { rank: left.rank, key: left.key };
            left.rank = right.rank; left.key = right.key;
            right.rank = temp.rank; right.key = temp.key;
        }
    });

    // get all keys with their depths
    if (leftTree === null || rightTree === null) return 'error';

    const leftDepths = getAllDepths(leftTree, 0, []).toSorted((a, b) => b.length - a.length);
    const rightDepths = getAllDepths(rightTree, 0, []).toSorted((a, b) => b.length - a.length);

    return leftDepths[0].join('') + rightDepths[0].join('');
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 3
 */
const part3 = (input: string): string => {
    let leftTree: TreeNode | null = null;
    let rightTree: TreeNode | null = null;
    const connected: { [key: string]: TreeNode[] } = {};

    input.split(/\n/g).forEach(line => {
        // parse the nodes
        const [instruction, ...args] = line.split(' ');

        if (instruction === 'ADD') {
            const [id, left, right] = args.map(part => part.split('=')[1]);
            const parsedLeft = left.replace(/[\[\]]/g, '').split(',');
            const parsedRight = right.replace(/[\[\]]/g, '').split(',');

            // handle left tree addition
            const newLeft = addNode(leftTree, parseInt(parsedLeft[0]), parsedLeft[1]);
            if (leftTree === null) leftTree = newLeft;

            // handle right tree addition
            const newRight = addNode(rightTree, parseInt(parsedRight[0]), parsedRight[1]);
            if (rightTree === null) rightTree = newRight;

            connected[id] = [newLeft, newRight];
        } else if (instruction === 'SWAP') {
            // find connected nodes and swap rank, key, and both children
            const [left, right] = connected[args[0]];

            const temp = { rank: left.rank, key: left.key };
            left.rank = right.rank; left.key = right.key;
            right.rank = temp.rank; right.key = temp.key;

            [left.left, right.left] = [right.left, left.left];
            [left.right, right.right] = [right.right, left.right];
        }
    });

    // get all keys with their depths, sorted by length first, then depth
    if (leftTree === null || rightTree === null) return 'error';

    const leftDepths = getAllDepths(leftTree, 0, []).map((arr, i) => ({ value: arr, index: i })).toSorted((a, b) => {
        if (a.value.length === b.value.length) return a.index - b.index;
        return b.value.length - a.value.length; 
    }).map(arr => arr.value);

    const rightDepths = getAllDepths(rightTree, 0, []).map((arr, i) => ({ value: arr, index: i })).toSorted((a, b) => {
        if (a.value.length === b.value.length) return a.index - b.index;
        return b.value.length - a.value.length; 
    }).map(arr => arr.value);

    return leftDepths[0].join('') + rightDepths[0].join('');
}

export { part1, part2, part3 };