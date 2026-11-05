/**
 * quests/event2026/quest01/solution.ts
 * 
 * ~~ The Coneservation ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 11/5/2026
 */

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 1
 */
const part1 = (input: string): string => {
    const pinecones = input.trim().split(',').map(num => parseInt(num));

    let diff = 0;
    for (let i = 0; i < pinecones.length; i++) {
        diff += Math.pow(Math.ceil(Math.sqrt(pinecones[i])), 2) - pinecones[i];
    }

    return diff.toString();
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 2
 */
const part2 = (input: string): string => {
    const pinecones = input.trim().split(',').map(num => parseInt(num));

    let diff = 0;
    for (let i = 0; i < pinecones.length; i++) {
        const sideLength = Math.ceil(3 + Math.max(0, pinecones[i] - 8) / 4)
        diff += (4 * sideLength - 4) - pinecones[i];
    }

    return diff.toString();
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 3
 */
const part3 = (input: string): string => {
    const pinecones = input.trim().split(',').map(num => parseInt(num));

    let diff = 0;
    for (let i = 0; i < pinecones.length; i++) {
        let sideLength = Math.max(3, Math.ceil(Math.sqrt(pinecones[i] + 1)));
        if (sideLength % 2 === 0) sideLength++;

        while (Math.pow(sideLength, 2) - 1 < pinecones[i]) sideLength += 2;
        diff += Math.pow(sideLength, 2) - 1 - pinecones[i];
    }

    return diff.toString();
}

export { part1, part2, part3 };