/**
 * quests\event2024\quest19\solution.ts
 * 
 * ~~ Encrypted Duck ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 9/8/2025
 */

/**
 * rotate the elements around a specified point in a specified direction
 * 
 * mutates the grid
 * 
 * @param grid grid of indices to move around 
 * @param width width of the grid
 * @param position position to rotate around
 * @param direction rotation direction
 */
const rotatePart = (grid: number[], width: number, position: { x: number, y: number }, direction: string) => {    
    const neighbors = [{ x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: -1, y: 1 }, { x: -1, y: 0 }];
    const tokens = neighbors.map(neighbor => grid[(position.y + neighbor.y) * width + (position.x + neighbor.x)]);

    if (direction === 'L') {
        const move = tokens.shift() as number;
        tokens.push(move);
    } else {
        const move = tokens.pop() as number;
        tokens.unshift(move);
    }

    neighbors.forEach((neighbor, i) => {
        grid[(position.y + neighbor.y) * width + (position.x + neighbor.x)] = tokens[i];
    });
}

/**
 * creates a mapping that moves an index to a new index
 * 
 * @param width width of the grid
 * @param height height of the grid
 * @param directions all the instructions
 * @returns a mapping of indices to next indices
 */
const findNextPosition = (width: number, height: number, directions: string): number[] => {
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
 * @param input input for the given part 
 * @returns the result of part 1
 */
const part1 = (input: string): string => {
    const [directions, gridInput] = input.split('\n\n');
    let grid = gridInput.split('\n').map(line => line.split(''));

    // find the mappings
    const width = grid[0].length, height = grid.length;
    const movements = findNextPosition(width, height, directions);

    // move all the characters according to the movement grid
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

    // the message is between ><
    let message = '';
    let parsingMessage = false;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (grid[y][x] === '<') parsingMessage = false;
            if (parsingMessage) message += grid[y][x];
            if (grid[y][x] === '>') parsingMessage = true;
        }
    }
    return message;
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 2
 */
const part2 = (input: string): string => {
    const [directions, gridInput] = input.split('\n\n');
    let grid = gridInput.split('\n').map(line => line.split(''));

    // find the mappings
    const width = grid[0].length, height = grid.length;
    const movements = findNextPosition(width, height, directions);
    
    // move all the characters according to the movement grid
    // we do it 100 times
    for (let i = 0; i < 100; i++) {
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
    }

    // the message is between ><
    let message = '';
    let parsingMessage = false;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (grid[y][x] === '<') parsingMessage = false;
            if (parsingMessage) message += grid[y][x];
            if (grid[y][x] === '>') parsingMessage = true;
        }
    }
    return message;
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 3
 */
const part3 = (input: string): string => {
    const [directions, gridInput] = input.split('\n\n');
    let grid = gridInput.split('\n').map(line => line.split(''));

    // find the mappings
    const width = grid[0].length, height = grid.length;
    let movements = findNextPosition(width, height, directions);

    // 1048576000 is 2^23 * 125
    // if we do the movements, it will double each movement
    for (let i = 0; i < 23; i++) {
        const newMovements: number[] = [];
        for (let j = 0; j < movements.length; j++) newMovements[j] = movements[movements[j]];
        movements = newMovements;
    }
    
    // we do the rest of the movements
    for (let i = 0; i < 125; i++) {
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
    }

    // the message is between ><
    let message = '';
    let parsingMessage = false;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (grid[y][x] === '<') parsingMessage = false;
            if (parsingMessage) message += grid[y][x];
            if (grid[y][x] === '>') parsingMessage = true;
        }
    }
    return message;
}

export { part1, part2, part3 };