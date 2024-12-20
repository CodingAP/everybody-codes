/**
 * quests\2024\quest18\solution.js
 * 
 * ~~ no title available ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 11/27/2024
 */

/**
 * returns all lengths from every palm tree labeled 'P'
 * 
 * @param {string[][]} grid grid from input
 * @param {{ x: number, y: number}[]} starting starting points to search from
 * @returns {{ [key: string]: number }}
 */
const findAllPaths = (grid, starting) => {
    // create distance map for all points
    let trees = {};
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] === 'P') trees[`${x},${y}`] = Infinity;
        }
    }

    // do a bfs and keep running until every path is exhausted
    const queue = [];
    const visited = new Set();

    starting.forEach(position => {
        queue.push({ ...position, steps: 0 });
        visited.add(`${position.x},${position.y}`);
    });

    while (queue.length != 0) {
        const current = queue.shift();

        // if tree is found, check if it is smallest path
        if (trees[`${current.x},${current.y}`] !== undefined) {
            trees[`${current.x},${current.y}`] = Math.min(trees[`${current.x},${current.y}`], current.steps);
        }

        [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }].forEach(direction => {
            const newPosition = { x: current.x + direction.x, y: current.y + direction.y };
            if (newPosition.x >= 0 && newPosition.x < grid[0].length && newPosition.y >= 0 && newPosition.y < grid.length
                && !visited.has(`${newPosition.x},${newPosition.y}`) && grid[newPosition.y][newPosition.x] !== '#') {
                queue.push({ ...newPosition, steps: current.steps + 1 });
                visited.add(`${current.x},${current.y}`);
            }
        });
    }

    return trees;
}

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    // start from one location
    const grid = input.split('\n').map(line => line.split(''));
    const starting = [{ x: 0, y: 1 }];

    // find longest path
    return Math.max(...Object.values(findAllPaths(grid, starting)));
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    // start from multiple points
    const grid = input.split('\n').map(line => line.split(''));
    const starting = [{ x: 0, y: 1 }, { x: grid[0].length - 1, y: grid.length - 2 }];

    // find longest path
    return Math.max(...Object.values(findAllPaths(grid, starting)));
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 3
 */
const part3 = async input => {
    const grid = input.split('\n').map(line => line.split(''));

    // find point where paths are the smallest
    let min = Infinity;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] === '.') {
                // sum all path lengths
                const value = Object.values(findAllPaths(grid, [{ x, y }])).reduce((sum, num) => sum + num, 0);
                min = Math.min(value, min);
            }
        }
    }
    return min;
}

export { part1, part2, part3 };