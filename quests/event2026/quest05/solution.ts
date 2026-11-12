/**
 * quests/event2026/quest05/solution.ts
 * 
 * ~~ The Cartograffity ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 11/11/2026
 */

const printGrid = (grid: string[][], land: Set<string>, coastline: Set<string> | undefined, trees: Set<string> | undefined, water = false) => {
    let map = '';
    for (let y = 0; y < grid.length; y++) {
        let line = '';
        for (let x = 0; x < grid[0].length; x++) {
            if (land.has(`${x},${y}`)) line += '#';
            else if (coastline && coastline.has(`${x},${y}`)) line += '=';
            else if (trees && trees.has(`${x},${y}`)) line += '@';
            else if (water) line += '.'
            else line += grid[y][x];
        }
        map += line + '\n';
    }
    return map;
}

const generateLand = (grid: string[][]): Set<string> => {
    const land: Set<string> = new Set();

    // add central land
    land.add(`${Math.floor(grid[0].length / 2)},${Math.floor(grid.length / 2)}`);
    
    let added = true;
    while (added) {
        added = false;

        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[0].length; x++) {
                if (land.has(`${x},${y}`)) continue;

                let neighbors = 0;
                let connected = false;
                for (let j = -1; j <= 1; j++) {
                    for (let i = -1; i <= 1; i++) {
                        if (x + i < 0 || x + i >= grid[0].length || y + j < 0 || y + j >= grid.length) continue;
                        if (i === 0 && j === 0) continue;

                        if (land.has(`${x + i},${y + j}`)) {
                            connected = true;
                            neighbors++;
                        } else if (grid[y + j][x + i] === '1') neighbors++;
                    }
                }

                if (neighbors >= 5 && connected) {
                    land.add(`${x},${y}`);
                    added = true;
                }
            }
        }
    }

    return land;
}

// run this after generating land
// mutates the arguments
const generateCoastline = (land: Set<string>): Set<string> => {
    const coastline: Set<string> = new Set();

    let added = true, initial = true;
    while (added) {
        added = false;

        [...land].forEach(coord => {
            const [x, y] = coord.split(',').map(num => parseInt(num));

            let landNeighbors = 0;
            let coastlineNeighbors = 0;
            for (let j = -1; j <= 1; j++) {
                for (let i = -1; i <= 1; i++) {
                    if (i === 0 && j === 0) continue;

                    if (land.has(`${x + i},${y + j}`)) landNeighbors++;
                    if (coastline.has(`${x + i},${y + j}`)) coastlineNeighbors++;
                }
            }

            if (initial) {
                if (landNeighbors !== 8) {
                    coastline.add(`${x},${y}`);
                    added = true;
                }
            } else {
                if (coastlineNeighbors >= 5) {
                    coastline.add(`${x},${y}`);
                    added = true;
                }
            }
        });

        [...coastline].forEach(coord => {
            const [x, y] = coord.split(',').map(num => parseInt(num));
            land.delete(`${x},${y}`);
        });

        initial = false;
    }

    return coastline;
}

// run after land and coastline
// mutates the arguments
const generateTrees = (land: Set<string>, coastline: Set<string>): Set<string> => {
    const trees: Set<string> = new Set();

    // check for initial trees
    [...land].forEach(coord => {
        const [x, y] = coord.split(',').map(num => parseInt(num));

        let neighbors = 0;
        for (let j = -2; j <= 2; j++) {
            for (let i = -2; i <= 2; i++) {
                // don't count middle or corners
                if ((i === 0 && j === 0) || (Math.abs(i) === 2 && Math.abs(j) === 2)) continue;

                if (land.has(`${x + i},${y + j}`)) neighbors++;
            }
        }

        if (neighbors === 20) trees.add(`${x},${y}`);
    });

    [...trees].forEach(coord => {
        const [x, y] = coord.split(',').map(num => parseInt(num));
        land.delete(`${x},${y}`);
    });

    for (let step = 0; step < 2; step++) {
        let addedTrees: string[] = [];

        [...land].forEach(coord => {
            const [x, y] = coord.split(',').map(num => parseInt(num));

            let coastlineNeighbors = 0;
            let treeNeighbors = 0;
            for (let j = -1; j <= 1; j++) {
                for (let i = -1; i <= 1; i++) {
                    if (i === 0 && j === 0) continue;

                    if (coastline.has(`${x + i},${y + j}`)) coastlineNeighbors++;
                    if (trees.has(`${x + i},${y + j}`)) treeNeighbors++;
                }
            }

            if (treeNeighbors >= 4 && coastlineNeighbors === 0) addedTrees.push(`${x},${y}`);
        });

        addedTrees.forEach(coord => {
            const [x, y] = coord.split(',').map(num => parseInt(num));
            trees.add(`${x},${y}`)
            land.delete(`${x},${y}`);
        });
    }

    return trees;
}

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 1
 */
const part1 = (input: string): string => {
    const grid = input.trim().split('\n').map(line => line.split(''));
    const land = generateLand(grid);
    
    return land.size.toString();
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 2
 */
const part2 = (input: string): string => {
    const grid = input.trim().split('\n').map(line => line.split(''));
    const land = generateLand(grid);
    const coastline = generateCoastline(land);
    
    return coastline.size.toString();
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 3
 */
const part3 = (input: string): string => {
    const grid = input.trim().split('\n').map(line => line.split(''));
    const land = generateLand(grid);
    const coastline = generateCoastline(land);
    const trees = generateTrees(land, coastline);
    
    return trees.size.toString();
}

export { part1, part2, part3 };