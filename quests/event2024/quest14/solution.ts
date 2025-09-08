/**
 * quests\event2024\quest14\solution.ts
 * 
 * ~~ The House of Palms ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 9/8/2025
 */

/**
 * unit vectors for each direction
 */
const directions: { [key: string]: { x: number, y: number, z: number } } = { U: { x: 0, y: 1, z: 0 }, D: { x: 0, y: -1, z: 0 }, L: { x: -1, y: 0, z: 0 }, R: { x: 1, y: 0, z: 0 }, F: { x: 0, y: 0, z: 1 }, B: { x: 0, y: 0, z: -1 } };

/**
 * parses the trees and obtains all needed information from them
 * 
 * @param trees list if instructions for each tree
 * @returns all needed information for a tree
 */
const parseTrees = (trees: string[][]): { positions: Set<string>, leaves: { x: number, y: number, z: number }[], maxY: number } => {
    const positions = new Set<string>();
    const leaves = [];
    let maxY = -Infinity;

    // simulate all trees from starting positions
    for (let i = 0; i < trees.length; i++) {
        const position = { x: 0, y: 0, z: 0 };

        // store each position in set, check for max y
        for (let j = 0; j < trees[i].length; j++) {
            const direction = trees[i][j].slice(0, 1);
            const amount = parseInt(trees[i][j].slice(1));
            for (let j = 0; j < amount; j++) {
                position.x += directions[direction].x;
                position.y += directions[direction].y;
                position.z += directions[direction].z;
                maxY = Math.max(maxY, position.y);

                positions.add(`${position.x},${position.y},${position.z}`);
            }
        }
        leaves.push(position);
    }

    return { positions, leaves, maxY };
}

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 1
 */
const part1 = (input: string): string => {
    const tree = input.split(',');
    return parseTrees([tree]).maxY.toString();
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 2
 */
const part2 = (input: string): string => {
    const trees = input.split('\n').map(line => line.split(','));
    return parseTrees(trees).positions.size.toString();
}

/**
 * finds shortest path between nodes
 * 
 * @param positions all nodes' positions
 * @param starting starting node
 * @param end ending y position
 * @returns length of path
 */
const bfs = (positions: Set<string>, starting: { x: number, y: number, z: number }, endY: number): number => {
    const queue = [{ ...starting, steps: 0 }];
    const visited = new Set([`${starting.x},${starting.y},${starting.z}`]);

    while (queue.length != 0) {
        const current = queue.shift();

        if (current === undefined) break;

        if (current.x === 0 && current.y === endY && current.z === 0) return current.steps;

        Object.values(directions).forEach(direction => {
            const newPosition = { x: current.x + direction.x, y: current.y + direction.y, z: current.z + direction.z };
            if (positions.has(`${newPosition.x},${newPosition.y},${newPosition.z}`) && !visited.has(`${newPosition.x},${newPosition.y},${newPosition.z}`)) {
                queue.push({ ...newPosition, steps: current.steps + 1 });
                visited.add(`${newPosition.x},${newPosition.y},${newPosition.z}`);
            }
        });
    }

    return -1;
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 3
 */
const part3 = (input: string): string => {
    const trees = input.split('\n').map(line => line.split(','));
    const { positions, leaves, maxY } = parseTrees(trees);

    // try all trunk positions to find the smallest distance between all leaves
    let minMurk = Infinity;
    for (let y = 0; y <= maxY; y++) {
        if (positions.has(`0,${y},0`)) {
            let murk = 0;
            for (let j = 0; j < leaves.length; j++) murk += bfs(positions, leaves[j], y);
            minMurk = Math.min(minMurk, murk);
        }
    }

    return minMurk.toString();
}

export { part1, part2, part3 };