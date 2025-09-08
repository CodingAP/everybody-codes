/**
 * quests\event2024\quest16\solution.ts
 * 
 * ~~ Cat Grin of Fortune ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 9/8/2025
 */

/**
 * returns the greatest common denominator of a and b
 * 
 * @param a
 * @param b
 */
const gcd = (a: number, b: number): number => {
    while (b !== 0) [a, b] = [b, a % b];
    return Math.abs(a);
}

/**
 * returns the least common multiple of a and b
 * 
 * @param a
 * @param b
 */
const lcm = (a: number, b: number) => Math.abs(a * b) / gcd(a, b);

/**
 * return the number of coins that was won from a given roll
 * 
 * mutates positions to new positions after roll
 * 
 * @param positions positions of the rolls
 * @param jumps how far each column jumps
 * @param wheels a list of cat faces on each column
 * @returns number of coins that was won
 */
const getCoins = (positions: number[], jumps: number[], wheels: string[][]): number => {
    const characters: { [key: string]: number } = {};
    for (let i = 0; i < positions.length; i++) {
        positions[i] = (positions[i] + jumps[i]) % wheels[i].length;
        const left = wheels[i][positions[i]][0];
        const right = wheels[i][positions[i]][2];
        characters[left] = (characters[left] || 0) + 1;
        characters[right] = (characters[right] || 0) + 1;
    }

    return Object.values(characters).reduce((sum, num) => sum + Math.max(0, num - 2), 0)
}

/**
 * parses the input
 * 
 * @param input input string
 * @returns the parsed input
 */
const parseInput = (input: string): { jumps: number[], wheels: string[][] } => {
    const [jumps, wheels] = input.split('\n\n');
    const parsedJumps = jumps.split(',').map(num => parseInt(num));

    const wheelFaces: string[][] = new Array(jumps.length).fill('').map(_ => []);
    wheels.split('\n').forEach(line => {
        for (let i = 0; i < jumps.length; i++) {
            const face = line.slice(i * 4, i * 4 + 3);
            if (face !== '   ') {
                wheelFaces[i].push(face);
            }
        }
    });

    return { jumps: parsedJumps, wheels: wheelFaces };
}

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 1
 */
const part1 = (input: string): string => {
    const { jumps, wheels } = parseInput(input);

    let faces = '';
    for (let i = 0; i < jumps.length; i++) {
        faces += wheels[i][(jumps[i] * 100) % wheels[i].length] + ' ';
    }

    return faces;
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 2
 */
const part2 = (input: string): string => {
    const { jumps, wheels } = parseInput(input);

    // it is crt-ish: find the lcm of all the roll lengths because all jumps are prime
    const totalAmount = 202420242024;
    const amount = wheels.map(array => array.length).reduce((acc, num) => lcm(acc, num), 1);
    
    let currentCoins = 0, finalCoins = 0;
    const positions = new Array(jumps.length).fill(0);
    for (let i = 0; i < amount + (totalAmount % amount); i++) {
        if (i === amount - 1) {
            finalCoins += currentCoins * Math.floor(totalAmount / amount);
            currentCoins = 0;
        }
        
        currentCoins += getCoins(positions, jumps, wheels);
    }

    return (finalCoins + currentCoins).toString();
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 3
 */
const part3 = (input: string): string => {
    const { jumps, wheels } = parseInput(input);

    const memos: { [key: string]: { [key: string]: number } } = { max: {}, min: {} };
    
    const getAllCoins = (position: number[], index: number, functionName: string) => {
        const key = [...position, index].join('|');
        if (memos[functionName][key] !== undefined) return memos[functionName][key];
        memos[functionName][key] = -Infinity;

        // try all possible paths and find the mins and maxs
        const previous = position.map((num, i) => (num + wheels[i].length - 1) % wheels[i].length);
        const next = position.map((num, i) => (num + 1) % wheels[i].length);

        let coins = getCoins(position, jumps, wheels);
        let previousCoins = getCoins(previous, jumps, wheels);
        let nextCoins = getCoins(next, jumps, wheels);

        if (index !== 0) {
            coins += getAllCoins([...position], index - 1, functionName);
            previousCoins += getAllCoins([...previous], index - 1, functionName);
            nextCoins += getAllCoins([...next], index - 1, functionName);
        }

        let value = 0;
        if (functionName === 'max') value = Math.max(coins, previousCoins, nextCoins);
        else if (functionName === 'min') value = Math.min(coins, previousCoins, nextCoins);

        memos[functionName][key] = value;
        return value;
    }

    const value = 256;
    return getAllCoins(new Array(jumps.length).fill(0), value - 1, 'max') + ' ' + getAllCoins(new Array(jumps.length).fill(0), value - 1, 'min');
}

export { part1, part2, part3 };