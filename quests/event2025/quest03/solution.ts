/**
 * quests\event2025\quest03\solution.ts
 * 
 * ~~ no title available ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 11/5/2025
 */

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 1
 */
const part1 = (input: string): string => {
    const list = input.split(',').map(num => parseInt(num));
    
    return `${[...new Set(list)].reduce((sum, num) => sum + num, 0)}`;
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 2
 */
const part2 = (input: string): string => {
    const list = input.split(',').map(num => parseInt(num));

    const numbers = [...new Set(list)].sort((a, b) => b - a).slice(-20);
    
    return `${numbers.reduce((sum, num) => sum + num, 0)}`;
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 3
 */
const part3 = (input: string): string => {
    const list = input.split(',').map(num => parseInt(num));
    
    // i am running with the assumption that to fit all possible sets since only 1 number could fit in each, we look for the number with the largest count 
    const count = new Map<number, number>();
    for (let i = 0; i < list.length; i++) {
        count.set(list[i], (count.get(list[i]) || 0) + 1);
    }

    return `${[...count.values()].sort((a, b) => b - a)[0]}`;
}

export { part1, part2, part3 };