/**
 * quests\event2025\quest04\solution.ts
 * 
 * ~~ Teeth of the Wind ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 11/6/2025
 */

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 1
 */
const part1 = (input: string): string => {
    const gears = input.split('\n').map(num => parseInt(num));

    let turns = 2025;
    for (let i = 1; i < gears.length; i++) {
        turns *= gears[i - 1] / gears[i];
    }
    
    return `${Math.floor(turns)}`;
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 2
 */
const part2 = (input: string): string => {
    const gears = input.split('\n').map(num => parseInt(num)).toReversed();

    let turns = 10000000000000;
    for (let i = 1; i < gears.length; i++) {
        turns *= gears[i - 1] / gears[i];
    }
    
    return `${Math.ceil(turns)}`;
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 3
 */
const part3 = (input: string): string => {
    const gears = input.split('\n').map(line => {
        const [input, output] = line.split('|');
        return { input: parseInt(input), output: parseInt(output || input) };
    });

    let turns = 100;
    for (let i = 1; i < gears.length; i++) {
        turns *= gears[i - 1].output / gears[i].input;
    }

    return `${Math.floor(turns)}`;
}

export { part1, part2, part3 };