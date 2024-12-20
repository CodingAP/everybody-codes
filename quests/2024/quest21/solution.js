/**
 * quests\2024\quest19\solution.js
 * 
 * ~~ Encrypted Duck ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 11/28/2024
 */

/**
 * rotate the elements around a specified point in a specified direction
 * 
 * mutates the grid
 * 
 * @param {int[]} grid grid of indices to move around 
 * @param {number} width width of the grid
 * @param {{ x: number, y: number }} position position to rotate around
 * @param {'L' | 'R'} direction rotation direction
 */
const rotatePart = (grid, width, position, direction) => {    
    const neighbors = [{ x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: -1, y: 1 }, { x: -1, y: 0 }];
    const tokens = neighbors.map(neighbor => grid[(position.y + neighbor.y) * width + (position.x + neighbor.x)]);

    if (direction === 'L') {
        const move = tokens.shift();
        tokens.push(move);
    } else {
        const move = tokens.pop();
        tokens.unshift(move);
    }

    neighbors.forEach((neighbor, i) => {
        grid[(position.y + neighbor.y) * width + (position.x + neighbor.x)] = tokens[i];
    });
}

/**
 * creates a mapping that moves an index to a new index
 * 
 * @param {number} width width of the grid
 * @param {number} height height of the grid
 * @param {string} directions all the instructions
 * @returns {number[]} a mapping of indices to next indices
 */
const findNextPosition = (width, height, directions) => {
    const grid = new Array(width * height).fill('').map((_, i) => i);
    const originalGrid = structuredClone(grid);

    let pointer = 0;
    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            rotatePart(grid, width, { x, y }, directions[pointer]);
            pointer = (pointer + 1) % directions.length;
        }
    }

    for (let i = 0; i < originalGrid.length; i++) originalGrid[i] = grid.indexOf(i);

    return originalGrid;
}

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    let [directions, grid] = input.split('\n\n');
    grid = grid.split('\n').map(line => line.split(''));

    // find the mappings
    const width = grid[0].length, height = grid.length;
    let movements = findNextPosition(width, height, directions);

    // 1024 is 2^10
    for (let i = 0; i < 10; i++) {
        let newMovements = [];
        for (let j = 0; j < movements.length; j++) newMovements[j] = movements[movements[j]];
        movements = newMovements;
    }
    
    const newGrid = structuredClone(grid);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const index = y * width + x;
            const newIndex = movements[index];
            const newX = newIndex % width;
            const newY = Math.floor(newIndex / width);

            newGrid[newY][newX] = grid[y][x];
        }
    }
    grid = newGrid;

    console.log(grid.map(line => line.join('')).join('\n'));
    return '2024';
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    return 'EVERYBODY.CODES'
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 3
 */
const part3 = async input => {
    return 'DONE!'
}

export { part1, part2, part3 };