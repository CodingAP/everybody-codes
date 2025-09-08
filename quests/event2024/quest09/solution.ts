/**
 * quests\event2024\quest09\solution.ts
 * 
 * ~~ Sparkling Bugs ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 9/8/2025
 */

/**
 * cache all lowest possible values
 * 
 * essentialy the least change problem but with beetles
 * 
 * @param max max brightness (largest change value)
 * @param stamps possible stamp sizes (the coin value) 
 * @returns least possible amount of beetles (least amount of coins)
 */
const getOptimizedTable = (max: number, stamps: number[]): number[] => {
    const optimized = Array(max + 1).fill(Infinity);
    optimized[0] = 0;

    for (let i = 0; i < stamps.length; i++) {
        for (let j = stamps[i]; j <= max; j++) {
            optimized[j] = Math.min(optimized[j], optimized[j - stamps[i]] + 1);
        }
    }
    return optimized;
}

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 1
 */
const part1 = (input: string): string => {
    const brightnesses = input.split('\n').map(num => parseInt(num));
    const optimized = getOptimizedTable(Math.max(...brightnesses), [1, 3, 5, 10]);

    // after calculating least possible for input's range, sum up all numbers
    let count = 0;
    for (let i = 0; i < brightnesses.length; i++) {
        count += optimized[brightnesses[i]];
    }

    return count.toString();
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 2
 */
const part2 = (input: string): string => {
    const brightnesses = input.split('\n').map(num => parseInt(num));
    const optimized = getOptimizedTable(Math.max(...brightnesses), [1, 3, 5, 10, 15, 16, 20, 24, 25, 30]);

    // after calculating least possible for input's range, sum up all numbers
    let count = 0;
    for (let i = 0; i < brightnesses.length; i++) {
        count += optimized[brightnesses[i]];
    }

    return count.toString();
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 3
 */
const part3 = (input: string): string => {
    const brightnesses = input.split('\n').map(num => parseInt(num));
    const optimized = getOptimizedTable(Math.max(...brightnesses), [1, 3, 5, 10, 15, 16, 20, 24, 25, 30, 37, 38, 49, 50, 74, 75, 100, 101]);

    let count = 0;
    for (let i = 0; i < brightnesses.length; i++) {
        // we need two values that add up to brightness
        // use two points to find least possible
        let first = Math.floor(brightnesses[i] / 2);
        let second = brightnesses[i] - first;
        let min = Infinity;

        // the distance must be less than 100
        while (Math.abs(first - second) <= 100) {
            min = Math.min(min, optimized[first] + optimized[second]);
            first--;
            second++;
        }

        count += min;
    }
    return count.toString();
}

export { part1, part2, part3 };