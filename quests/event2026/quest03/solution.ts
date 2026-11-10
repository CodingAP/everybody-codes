/**
 * quests/event2026/quest03/solution.ts
 * 
 * ~~ The ISOlation ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 11/10/2026
 */

const calculateVote = (line: string[]): number => {
    const [iso, num] = line;
    const base = iso.split('-')[1];

    let sum = 0;
    for (let j = num.length - 1; j >= 0; j--) {
        const pos = num.length - 1 - j;
        const baseIndex = base.length - 1 - (pos % base.length);
        sum += parseInt(num[j]) * Math.pow(parseInt(base[baseIndex]), pos);
    }

    return sum;
}

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 1
 */
const part1 = (input: string): string => {
    const isos = input.trim().split('\n').map(line => line.split(' '));
    let sum = 0;

    for (let i = 0; i < isos.length; i++) sum += calculateVote(isos[i]);

    return sum.toString();
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 2
 */
const part2 = (input: string): string => {
    const isos = input.trim().split('\n').map(line => line.split(' '));
    let sum = 0;

    for (let i = 0; i < isos.length; i++) sum += calculateVote(isos[i]);

    return sum.toString();
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 3
 */
const part3 = (input: string): string => {
    const isos = input.trim().split('\n').map(line => line.split(' '));
    let sum = 0;

    for (let i = 0; i < isos.length; i++) {
        const vote = calculateVote(isos[i]);
        let valid = true;
        for (let j = 0; j < parseInt(isos[i][1]); j++) {
            const smallVote = calculateVote([isos[i][0], j.toString()]);
            if (smallVote === vote) valid = false;
        }
        if (valid) sum += vote;
    }

    return sum.toString();
}

export { part1, part2, part3 };