/**
 * quests\event2025\quest01\solution.ts
 * 
 * ~~ Whispers in the Shell ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 11/3/2025
 */

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 1
 */
const part1 = (input: string): string => {
    const [names, directions] = input.split('\n\n').map(line => line.split(','))
    let pointer = 0;

    // move the pointer either left or right, clamping it to the array
    for (let i = 0; i < directions.length; i++) {
        pointer += parseInt(directions[i].slice(1)) * (directions[i].startsWith('L') ? -1 : 1);
        if (pointer >= names.length) pointer = names.length - 1;
        if (pointer < 0) pointer = 0;
    }

    return names[pointer];
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 2
 */
const part2 = (input: string): string => {
    const [names, directions] = input.split('\n\n').map(line => line.split(','))
    let pointer = 0;

    // move the pointer either left or right, wrapping it around if necessary
    for (let i = 0; i < directions.length; i++) {
        let jump = 1;
        if (directions[i].startsWith('L')) jump = names.length - 1;

        pointer = (pointer + jump * parseInt(directions[i].slice(1))) % names.length;
    }

    return names[pointer];
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 3
 */
const part3 = (input: string): string => {
    const [names, directions] = input.split('\n\n').map(line => line.split(','));

    // for every direction, swap the names on either the left or the right of the first name
    for (let i = 0; i < directions.length; i++) {
        let jump = 1;
        if (directions[i].startsWith('L')) jump = names.length - 1;

        const swap = (jump * parseInt(directions[i].slice(1))) % names.length;

        [names[0], names[swap]] = [names[swap], names[0]];
    }

    return names[0];
}

export { part1, part2, part3 };