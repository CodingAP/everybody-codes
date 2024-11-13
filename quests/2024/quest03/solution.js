/**
 * quests\2024\quest03\solution.js
 * 
 * ~~ Mining Maestro ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 11/13/2024
 */

/**
 * find the nearest empty spot '.' at a given (x, y), using only cardinal neighbors
 * 
 *  n 
 * nXn
 *  n
 * 
 * @param {number} x the x position
 * @param {number} y the y position
 * @param {('#' | '.')[][]} grid the grid to search
 * @returns {number} number of steps it took
 */
const findNearestEmpty = (x, y, grid) => {
    const queue = [{ x, y, steps: 0 }];
    const visited = new Set([`${x},${y}`]);
    const directions = [{ x: 0, y: 1 }, { x: 0, y: -1 }, { x: 1, y: 0 }, { x: -1, y: 0 }];

    // run BFS to find nearest empty spot
    while (queue.length != 0) {
        const current = queue.shift();

        if (grid[current.y][current.x] == '.') {
            return current.steps;
        }

        for (let direction of directions) {
            let newX = current.x + direction.x;
            let newY = current.y + direction.y;

            // out of bounds spots are invalid, so they are not processed
            if (newX >= 0 && newX < grid[0].length && newY >= 0 && newY < grid.length && !visited.has(`${newX},${newY}`)) {
                visited.add(`${newX},${newY}`);
                queue.push({ x: newX, y: newY, steps: current.steps + 1 });
            }
        }
    }
    return -1;
}

/**
 * find the nearest empty spot '.' at a given (x, y), using all eight neighbors
 * 
 * nnn
 * nXn
 * nnn
 * 
 * @param {number} x the x position
 * @param {number} y the y position
 * @param {('#' | '.')[][]} grid the grid to search
 * @returns {number} number of steps it took
 */
const findNearestEmptyDiagonals = (x, y, grid) => {
    const queue = [{ x, y, steps: 0 }];
    const visited = new Set([`${x},${y}`]);

    // run BFS to find nearest empty spot
    while (queue.length != 0) {
        const current = queue.shift();

        // out of bounds are treated as empty, so it is a successful path
        if (current.x < 0 || current.x >= grid[0].length || current.y < 0 || current.y >= grid.length || grid[current.y][current.x] == '.') {
            return current.steps;
        }

        // use a for loop instead of hardcoded directions to use eight neighbors
        for (let j = -1; j <= 1; j++) {
            for (let i = -1; i <= 1; i++) {
                if (i == 0 && j == 0) continue;

                let newX = current.x + i;
                let newY = current.y + j;

                if (!visited.has(`${newX},${newY}`)) {
                    visited.add(`${newX},${newY}`);
                    queue.push({ x: newX, y: newY, steps: current.steps + 1 });
                }
            }
        }
    }
    return -1;
}

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    const grid = input.replace(/\r/g, '').split('\n');

    let blocks = 0;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] != '.') blocks += findNearestEmpty(x, y, grid);
        }
    }

    return blocks;
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    const grid = input.replace(/\r/g, '').split('\n');

    let blocks = 0;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] != '.') blocks += findNearestEmpty(x, y, grid);
        }
    }

    return blocks;
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 3
 */
const part3 = async input => {
    const grid = input.replace(/\r/g, '').split('\n');

    let blocks = 0;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] != '.') blocks += findNearestEmptyDiagonals(x, y, grid);
        }
    }

    return blocks;
}

export { part1, part2, part3 };