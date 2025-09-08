/**
 * quests\event2024\quest15\solution.ts
 * 
 * ~~ From the Herbalist's Diary ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 9/8/2025
 */

/**
 * finds the shortest path
 * 
 * @param grid grid from inpuit
 * @param starting starting position to search
 * @param ending all possible ending values
 * @returns number of steps to get to ending
 */
const bfs = (grid: string[][], starting: { x: number, y: number }, ending: { x: number, y: number }): number => {
    const queue = [{ ...starting, steps: 0 }];
    const visited = new Set([`${starting.x},${starting.y}`]);

    while (queue.length != 0) {
        const current = queue.shift();

        if (current === undefined) break;

        if (ending.x === current.x && ending.y === current.y) {
            return current.steps;
        }

        [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }].forEach(direction => {
            const newPosition = { x: current.x + direction.x, y: current.y + direction.y };
            if (newPosition.x >= 0 && newPosition.x < grid[0].length && newPosition.y >= 0 && newPosition.y < grid.length && grid[newPosition.y][newPosition.x] != '#' && grid[newPosition.y][newPosition.x] != '~' && !visited.has(`${newPosition.x},${newPosition.y}`)) {
                queue.push({ ...newPosition, steps: current.steps + 1 });
                visited.add(`${newPosition.x},${newPosition.y}`);
            }
        });
    }

    return 0;
}

/**
 * returns all permutations of an array
 * 
 * @param array array to permute
 * @returns all permutations of the given array
 */
const permute = (array: string[]): string[][] => {
    if (array.length === 0) return [[]];

    const result = [];
    for (let i = 0; i < array.length; i++) {
        const rest = array.slice(0, i).concat(array.slice(i + 1));
        const permutations = permute(rest);
        for (const perm of permutations) {
            result.push([array[i], ...perm]);
        }
    }
    return result;
}

/**
 * find the shortest path grabbing all the herbs and coming back to start
 * 
 * @param grid grid parsed from input
 * @param starting starting position to search from
 * @returns amount of steps
 */
const findPath = (grid: string[][], starting: { x: number, y: number }): number => {
    // get all herbs positions
    const herbs: { [key: string]: { x: number, y: number }[] } = {};
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] !== '#' && grid[y][x] !== '.' && grid[y][x] !== '~') {
                if (herbs[grid[y][x]] === undefined) herbs[grid[y][x]] = [];
                herbs[grid[y][x]].push({ x, y });
            }
        }
    }

    // calculate distances between starting and all herbs
    const distances: { [key: string]: { [key: string]: number } } = {};
    distances['S'] = {};
    Object.entries(herbs).forEach(([herb, positions]) => {
        for (let i = 0; i < positions.length; i++) {
            const distance = bfs(grid, starting, positions[i]);
            distances['S'][herb + i] = distance;

            if (distances[herb + i] === undefined) distances[herb + i] = {};
            distances[herb + i]['S'] = distance;
        }
    });

    // calculate distances between all possible herbs (not including paths between same herbs)
    const herbPositions = Object.keys(distances);
    herbPositions.forEach(start => {
        if (start === 'S') return;
        herbPositions.forEach(end => {
            if (start[0] === end[0] || end === 'S') return;

            const starting = herbs[start[0]][parseInt(start.slice(1))];
            const ending = herbs[end[0]][parseInt(end.slice(1))];
            const distance = bfs(grid, starting, ending);
            distances[start][end] = distance;
            distances[end][start] = distance;
        });
    });

    let min = Infinity;

    /**
     * recursively searchs all paths given the herb path
     * 
     * @param path the herb path to take
     * @param distance the last distance recorded 
     * @param last the last node traveled to
     */
    const searchPath = (path: string[], distance: number, last: string) => {
        Object.keys(distances).filter(herb => herb[0] === path[0]).forEach(herb => {
            let dist = distance + distances[last][herb];
            if (dist >= min) return;

            if (path.length > 1) {
                searchPath(path.slice(1), dist, herb)
            } else {
                dist += distances[herb]['S'];
                min = Math.min(min, dist);
            }
        })
    }

    // try all possible herb orders
    permute(Object.keys(herbs)).forEach(path => searchPath(path, 0, 'S'));

    return min;
}

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 1
 */
const part1 = (input: string): string => {
    const grid = input.split('\n').map(line => line.split(''));

    let starting: { x: number, y: number } = { x: 0, y: 0 };
    const endings = [];
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (y === 0 && grid[y][x] === '.') starting = { x, y: 0 };
            if (grid[y][x] === 'H') endings.push({ x, y });
        }
    }

    return (Math.min(...endings.map(ending => bfs(grid, starting, ending))) * 2).toString();
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 2
 */
const part2 = (input: string): string => {
    const grid = input.split('\n').map(line => line.split(''));
    let starting: { x: number, y: number } = { x: 0, y: 0 };
    for (let x = 0; x < grid[0].length; x++) {
        if (grid[0][x] === '.') starting = { x, y: 0 };
    }

    return findPath(grid, starting).toString();
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 3
 */
const part3 = (input: string): string => {
    const grid = input.split('\n').map(line => line.split(''));

    // the trick is to treat the massive grid as three seperate grids, each with different starting spots
    // then you need to add the distances of traversing all the grids, as well as keep track of the movements between
    // one idea to make it easier is to replace the 2nd K in the input with a different letter so that it is treated as
    // a unique herb, which forces the algorithm to pathfind it as well
    // gotten from https://www.reddit.com/r/everybodycodes/comments/1gxkygd/comment/lyixvc4/
    const grids = [];
    const gridWidth = 85, gridHeight = grid.length;
    for (let x = 0; x < 3; x++) {
        const subgrid = [];
        for (let y = 0; y < grid.length; y++) {
            const row = [];
            for (let i = 0; i < 85; i++) {
                row.push(grid[y][x * gridWidth + i]);
            }
            subgrid.push(row);
        }
        grids.push(subgrid);
    }

    const leftGrid = findPath(grids[0], { x: gridWidth - 1, y: gridHeight - 2 });
    const rightGrid = findPath(grids[2], { x: 0, y: gridHeight - 2 });

    // automatically replace the K with X to make the algorithm move there as well
    for (let x = 0; x < gridWidth; x++) {
        if (grids[1][gridHeight - 2][x] === 'K') {
            grids[1][gridHeight - 2][x] = 'X';
            break;
        }
    }
    const middleGrid = findPath(grids[1], { x: Math.floor(gridWidth / 2), y: 0 });

    // the value 8 accounts for the movements between grids on the bottom rows
    // #E..K# and #K..R# (each dot represent an extra step, with having to travel back as well)
    return (leftGrid + middleGrid + rightGrid + 8).toString();
}

export { part1, part2, part3 };