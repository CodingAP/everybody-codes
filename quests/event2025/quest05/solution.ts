/**
 * quests\event2025\quest05\solution.ts
 * 
 * ~~ Fishbone Order ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 11/7/2025
 */

type Node = { value: number, left: Node | null, right: Node | null, next: Node | null };

const addNode = (root: Node | null, value: number) => {
    const newNode: Node = { value, left: null, right: null, next: null };

    if (root === null) return newNode;

    if (!root.left && value < root.value) {
        root.left = newNode;
        newNode.right = root;
    } else if (!root.right && value > root.value) {
        root.right = newNode;
        newNode.left = root;
    } else if (!root.next) {
        root.next = newNode;
    } else {
        return addNode(root.next, value);
    }

    return null;
};

const createSword = (numbers: number[]) => {
    let tree = null;
    for (let i = 0; i < numbers.length; i++) {
        const result = addNode(tree, numbers[i]);
        if (result !== null) tree = result;
    }

    return tree;
}

const getQuality = (numbers: number[]) => {
    let tree = createSword(numbers);

    let number = '';
    while (tree !== null) {
        number += tree.value;
        tree = tree.next;
    }
    
    return parseInt(number);
};

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 1
 */
const part1 = (input: string): string => {
    const numbers = input.split(':')[1].split(',').map(num => parseInt(num));
    
    return `${getQuality(numbers)}`;
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 2
 */
const part2 = (input: string): string => {
    const swords = input.split('\n').map(line => {
        const [id, numbers] = line.split(':');
        return { id, numbers: numbers.split(',').map(num => parseInt(num)) };
    });

    let max = -Infinity, min = Infinity;
    for (let i = 0; i < swords.length; i++) {
        const result = getQuality(swords[i].numbers);
        max = Math.max(max, result);
        min = Math.min(min, result);
    }

    return `${max - min}`;
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 3
 */
const part3 = (input: string): string => {
    const swords = input.split('\n').map(line => {
        const [id, numbers] = line.split(':');
        return { id: parseInt(id), numbers: numbers.split(',').map(num => parseInt(num)) };
    });

    swords.sort((a, b) => {
        const identityA = getQuality(a.numbers);
        const identityB = getQuality(b.numbers);

        if (identityA === identityB) {
            let treeA = createSword(a.numbers);
            let treeB = createSword(b.numbers);

            while (treeA !== null && treeB !== null) {
                const levelA = (treeA.left?.value ?? '') + treeA.value.toString() + (treeA.right?.value ?? '');
                const levelB = (treeB.left?.value ?? '') + treeB.value.toString() + (treeB.right?.value ?? '');

                if (levelA !== levelB) {
                    return parseInt(levelB) - parseInt(levelA);
                }

                treeA = treeA.next;
                treeB = treeB.next;
            }

            return b.id - a.id;
        }

        return identityB - identityA;
    });

    return `${swords.reduce((sum, sword, i) => sum + sword.id * (i + 1), 0)}`;
}

export { part1, part2, part3 };