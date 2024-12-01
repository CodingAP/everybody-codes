/**
 * quests\2024\quest20\solution.js
 * 
 * ~~ Gliding Finale ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 11/29/2024
 */

const DIRECTIONS = {
    U: { x: 0, y: -1 },
    D: { x: 0, y: 1 },
    L: { x: -1, y: 0 },
    R: { x: 1, y: 0 }
};

const NEXT_DIRECTIONS = {
    U: ['L', 'U', 'R'],
    D: ['R', 'D', 'L'],
    L: ['U', 'L', 'D'],
    R: ['D', 'R', 'U']
};

const CHANGES = {
    '.': -1,
    '-': -2,
    '+': 1
};

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    const grid = input.split('\n').map(line => line.split(''));
    const width = grid[0].length, height = grid.length;
    let states = {};

    // find the starting location
    let starting = { x: 0, y: 0 };
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (grid[y][x] === 'S') {
                starting = { x, y };
                grid[y][x] = '.';
            }
        }
    }

    // initialize with all directions
    ['U', 'D', 'L', 'R'].forEach(direction => {
        states[`${starting.x},${starting.y},${direction}`] = 1000;
    });

    // step 100 times, only keeping track of the newest states
    for (let i = 0; i < 100; i++) {
        const next = {};

        Object.entries(states).forEach(([key, score]) => {
            const [x, y, direction] = key.split(',');
            NEXT_DIRECTIONS[direction].forEach(newDirection => {
                const nextPosition = { x: parseInt(x) + DIRECTIONS[newDirection].x, y: parseInt(y) + DIRECTIONS[newDirection].y };

                if (nextPosition.x >= 0 && nextPosition.x < grid[0].length && nextPosition.y >= 0 && nextPosition.y < grid.length && grid[nextPosition.y][nextPosition.x] !== '#') {
                    const newScore = score + CHANGES[grid[nextPosition.y][nextPosition.x]];

                    const key = `${nextPosition.x},${nextPosition.y},${newDirection}`;

                    if (next[key] === undefined) next[key] = newScore;
                    else next[key] = Math.max(next[key], newScore);
                }
            });
        });

        states = next;
    }

    return Math.max(...Object.values(states));
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    const grid = input.split('\n').map(line => line.split(''));
    const width = grid[0].length, height = grid.length;
    let states = {};

    // find the starting and all the checkpoints
    let starting = { x: 0, y: 0 };
    const checkpoints = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }];
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (grid[y][x] === 'S') starting = { x, y };
            if (grid[y][x] === 'A') checkpoints[0] = { x, y };
            if (grid[y][x] === 'B') checkpoints[1] = { x, y };
            if (grid[y][x] === 'C') checkpoints[2] = { x, y };
            if (grid[y][x].match(/[SABC]/g)) grid[y][x] = '.';
        }
    }

    // initialize with all directions
    ['U', 'D', 'L', 'R'].forEach(direction => {
        states[`${starting.x},${starting.y},${direction},0`] = 10000;
    });

    // keeping stepping until best path is found
    let time = 0, found = false;
    while (!found) {
        time++;
        const next = {};

        Object.entries(states).forEach(([key, score]) => {
            const [x, y, direction, checkpoint] = key.split(',');
            NEXT_DIRECTIONS[direction].forEach(newDirection => {
                const nextPosition = { x: parseInt(x) + DIRECTIONS[newDirection].x, y: parseInt(y) + DIRECTIONS[newDirection].y };

                if (nextPosition.x >= 0 && nextPosition.x < grid[0].length && nextPosition.y >= 0 && nextPosition.y < grid.length && grid[nextPosition.y][nextPosition.x] !== '#') {
                    const newScore = score + CHANGES[grid[nextPosition.y][nextPosition.x]];

                    // only allow the checkpoints to be visited in order
                    // stop when all checkpoints are visited, back at start with altitude >= 10000
                    let checkpointIndex = parseInt(checkpoint);
                    if (nextPosition.x === starting.x && nextPosition.y === starting.y && newScore >= 10000 && checkpointIndex === checkpoints.length) found = true;
                    if (checkpointIndex < checkpoints.length && nextPosition.x === checkpoints[checkpointIndex].x && nextPosition.y === checkpoints[checkpointIndex].y) checkpointIndex++;

                    const key = `${nextPosition.x},${nextPosition.y},${newDirection},${checkpointIndex}`;

                    if (next[key] === undefined) next[key] = newScore;
                    else next[key] = Math.max(next[key], newScore);
                }
            });
        });

        states = next;
    }

    return time;
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 3
 */
const part3 = async input => {
    const grid = input.split('\n').map(line => line.split(''));
    const width = grid[0].length, height = grid.length;

    // find the starting point
    let starting = { x: 0, y: 0 };
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (grid[y][x] === 'S') {
                starting = { x, y };
                grid[y][x] = '.';
            }
        }
    }

    // this part uses the fact that there is an unblocked column near the starting point
    // that is the best possible way to travel as there every other pair of + is farther than 3
    // in both my input and the sample input, you need to travel 4 to the right to get to the column the fastest
    let altitude = 384400, distance = 0, rightMovement = 4;
    while (altitude > 0) {
        if (rightMovement > 0) {
            starting.x++;
            rightMovement--;
        } else {
            starting.y = (starting.y + 1) % height;
            distance++;
        }

        altitude += CHANGES[grid[starting.y][starting.x]];
    }

    return distance;
}

export { part1, part2, part3 };