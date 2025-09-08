/**
 * quests\event2024\quest04\solution.ts
 * 
 * ~~ Royal Smith's Puzzle ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 9/7/2025
 */

/**
 * simulates hitting all the nails to make them all level
 */
const simulateHits = (nails: number[], level: number): number => {
    let hits = 0;
    for (let i = 0; i < nails.length; i++) {
        hits += Math.abs(nails[i] - level);
    }
    return hits;
}

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 1
 */
const part1 = (input: string): string => {
    const nails = input.split('\n').map(num => parseInt(num));

    const min = nails.sort((a, b) => a - b)[0];
    return simulateHits(nails, min).toString();
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 2
 */
const part2 = (input: string): string => {
    const nails = input.split('\n').map(num => parseInt(num));

    const min = nails.sort((a, b) => a - b)[0];
    return simulateHits(nails, min).toString();
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 3
 */
const part3 = (input: string): string => {
    const nails = input.split('\n').map(num => parseInt(num));

    // find level with smallest amount of hits
    let min = Infinity;
    for (let i = 0; i < nails.length; i++) {
        const hits = simulateHits(nails, nails[i]);
        min = Math.min(hits, min);
    }
    
    return min.toString();
}

export { part1, part2, part3 };