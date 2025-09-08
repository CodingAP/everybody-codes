/**
 * quests\event2024\quest03\solution.ts
 * 
 * ~~ Mining Maestro ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 9/7/2025
 */

/**
 * find the nearest empty spot '.' at a given (x, y), using only cardinal neighbors
 * 
 *  n 
 * nxn
 *  n
 */
const findNearestEmpty = (x: number, y: number, grid: string[]): number => {
    const queue: { x: number, y: number, steps: number }[] = [{ x, y, steps: 0 }];
    const visited = new Set([`${x},${y}`]);
    const directions: { x: number, y: number }[] = [{ x: 0, y: 1 }, { x: 0, y: -1 }, { x: 1, y: 0 }, { x: -1, y: 0 }];

    // run bfs to find nearest empty spot
    while (queue.length !== 0) {
        const current = queue.shift();

        if (current === undefined) break;

        if (grid[current.y][current.x] === '.') {
            return current.steps;
        }

        for (const direction of directions) {
            const newX = current.x + direction.x;
            const newY = current.y + direction.y;

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
 * nxn
 * nnn
 */
const findNearestEmptyDiagonals = (x: number, y: number, grid: string[]): number => {
    const queue = [{ x, y, steps: 0 }];
    const visited = new Set([`${x},${y}`]);

    // run BFS to find nearest empty spot
    while (queue.length !== 0) {
        const current = queue.shift();

        if (current === undefined) break;

        // out of bounds are treated as empty, so it is a successful path
        if (current.x < 0 || current.x >= grid[0].length || current.y < 0 || current.y >= grid.length || grid[current.y][current.x] == '.') {
            return current.steps;
        }

        // use a for loop instead of hardcoded directions to use eight neighbors
        for (let j = -1; j <= 1; j++) {
            for (let i = -1; i <= 1; i++) {
                if (i === 0 && j === 0) continue;

                const newX = current.x + i;
                const newY = current.y + j;

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
 * @param input input for the given part 
 * @returns the result of part 1
 */
const part1 = (input: string): string => {
    const grid = input.replace(/\r/g, '').split('\n');

    let blocks = 0;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] != '.') blocks += findNearestEmpty(x, y, grid);
        }
    }

    return blocks.toString();
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 2
 */
const part2 = (input: string): string => {
    const grid = input.replace(/\r/g, '').split('\n');

    let blocks = 0;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] != '.') blocks += findNearestEmpty(x, y, grid);
        }
    }

    return blocks.toString();
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 3
 */
const part3 = (input: string): string => {
    const grid = input.replace(/\r/g, '').split('\n');

    let blocks = 0;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] != '.') blocks += findNearestEmptyDiagonals(x, y, grid);
        }
    }

    return blocks.toString();
}

export { part1, part2, part3 };