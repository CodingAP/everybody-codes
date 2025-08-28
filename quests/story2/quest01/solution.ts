/**
 * quests\story2\02\solution.ts
 * 
 * ~~ The Pocket-Money Popper ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 8/28/2025
 */

/**
 * permutes a list of strings to get all possible orders
 * 
 * @param array array of strings to be permuted
 * @returns list of all possible orders of strings
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
 * simulates one token drop from top to bottom, calculating how many coins it earns
 * 
 * @param grid a 2d grid of characters indicating where nails and spaces are
 * @param startingSlot the slot where the token starts
 * @param direction the directions that the token takes
 * @returns how many coins are earned
 */
const simulateDrop = (grid: string[], startingSlot: number, direction: string) => {
    const width = grid[0].length;
    const height = grid.length;
    const position = { x: (startingSlot - 1) * 2, y: -1 }; // must convert from slot to grid index
    let currentDirection = 0;

    // either move left/right if nail is below, then falls
    // if wall is blocking, force it to move opposite of it
    while (true) {
        if (position.y + 1 >= height) break;

        const below = grid[position.y + 1][position.x];
        if (below === '*') {
            if (position.x === 0) position.x++;
            else if (position.x === width - 1) position.x--;
            else if (direction[currentDirection] === 'L') position.x--;
            else if (direction[currentDirection] === 'R') position.x++;
            
            currentDirection++;
        }
        position.y++;
    }

    const finalSlot = Math.floor(position.x / 2) + 1; // convert grid index back to slot
    return (finalSlot * 2) - startingSlot; 
}

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 1
 */
const part1 = (input: string): string => {
    const [grid, directions] = input.replace(/\r/g, '').split('\n\n').map(element => element.split('\n'));
    
    // simulate each token in the order given placed in an increasing order
    let sum = 0;
    for (let i = 0; i < directions.length; i++) {
        const coins = simulateDrop(grid, i + 1, directions[i]);
        sum += Math.max(0, coins);
    }

    return sum.toString();
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 2
 */
const part2 = (input: string): string => {
    const [grid, directions] = input.replace(/\r/g, '').split('\n\n').map(element => element.split('\n'));

    // find the best place for each token to be placed, then add all the coins up
    let sum = 0;
    for (let i = 0; i < directions.length; i++) {
        let maxCoins = -Infinity;
        for (let j = 0; j <= Math.floor(grid[0].length / 2); j++) {
            const coins = simulateDrop(grid, j + 1, directions[i]);
            maxCoins = Math.max(maxCoins, coins);
        }
        
        sum += Math.max(0, maxCoins);
    }

    return sum.toString();
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 3
 */
const part3 = (input: string): string => {
    const [grid, directions] = input.replace(/\r/g, '').split('\n\n').map(element => element.split('\n'));

    // to find the min and max, we need to try all possible combinations of coins and slots
    // the cheapest brute force is to find all orders of the tokens, then find the min and max from there
    const coinPermute = permute(directions);

    let totalMax = -Infinity, totalMin = Infinity;
    for (const permuation of coinPermute) {
        let maxSum = 0, minSum = 0;
        
        // find maximum, blocking already used spots
        let trackedSlots: number[] = [];
        for (let i = 0; i < permuation.length; i++) {
            let maxCoins = -Infinity, slot = -1;
            for (let j = 0; j <= Math.floor(grid[0].length / 2); j++) {
                const coins = simulateDrop(grid, j + 1, permuation[i]);
                if (coins > maxCoins && !trackedSlots.includes(j)) {
                    maxCoins = coins;
                    slot = j;
                }
            }
            
            maxSum += Math.max(0, maxCoins);
            trackedSlots.push(slot);
        }

        // find minimum, blocking already used spots
        trackedSlots = [];
        for (let i = 0; i < permuation.length; i++) {
            let minCoins = Infinity, slot = -1;
            for (let j = 0; j <= Math.floor(grid[0].length / 2); j++) {
                const coins = simulateDrop(grid, j + 1, permuation[i]);
                // console.log(coins, j)
                if (coins < minCoins && !trackedSlots.includes(j)) {
                    minCoins = coins;
                    slot = j;
                }
            }
            
            minSum += Math.max(0, minCoins);
            trackedSlots.push(slot);
        }

        // see if the min and max is best
        totalMin = Math.min(minSum, totalMin);
        totalMax = Math.max(maxSum, totalMax);
    }
    
    return totalMin + ' ' + totalMax;
}

export { part1, part2, part3 };