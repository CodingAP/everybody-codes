/**
 * quests\2024\quest16\solution.js
 * 
 * ~~ Cat Grin of Fortune ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 11/25/2024
 */

/**
 * returns the greatest common denominator of a and b
 * 
 * @param {number} a
 * @param {number} b 
 * @returns {number}
 */
const gcd = (a, b) => {
    while (b !== 0) [a, b] = [b, a % b];
    return Math.abs(a);
}

/**
 * returns the least common multiple of a and b
 * 
 * @param {number} a
 * @param {number} b 
 * @returns {number}
 */
const lcm = (a, b) => Math.abs(a * b) / gcd(a, b);

/**
 * return the number of coins that was won from a given roll
 * 
 * mutates positions to new positions after roll
 * 
 * @param {number[]} positions positions of the rolls
 * @param {number[]} jumps how far each column jumps
 * @param {string[][]} wheels a list of cat faces on each column
 * @returns {number} number of coins that was won
 */
const getCoins = (positions, jumps, wheels) => {
    let characters = {};
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
 * @param {string} input input string
 * @returns {{ jumps: number[], wheels: string[][] }} the parsed input
 */
const parseInput = input => {
    let [jumps, wheels] = input.split('\n\n');
    jumps = jumps.split(',').map(num => parseInt(num));

    const wheelFaces = new Array(jumps.length).fill('').map(_ => []);
    wheels.split('\n').forEach(line => {
        for (let i = 0; i < jumps.length; i++) {
            const face = line.slice(i * 4, i * 4 + 3);
            if (face !== '   ') {
                wheelFaces[i].push(face);
            }
        }
    });

    return { jumps, wheels: wheelFaces };
}

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
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
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    const { jumps, wheels } = parseInput(input);

    // it is crt-ish: find the lcm of all the roll lengths because all jumps are prime
    const totalAmount = 202420242024;
    const amount = wheels.map(array => array.length).reduce((acc, num) => lcm(acc, num), 1);
    
    let currentCoins = 0, finalCoins = 0;
    const positions = new Array(jumps.length).fill(0);
    for (let i = 0; i < amount + (totalAmount % amount); i++) {
        if (i == amount - 1) {
            finalCoins += currentCoins * Math.floor(totalAmount / amount);
            currentCoins = 0;
        }
        
        currentCoins += getCoins(positions, jumps, wheels);
    }

    return finalCoins + currentCoins;
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 3
 */
const part3 = async input => {
    const { jumps, wheels } = parseInput(input);

    const memos = { max: {}, min: {} };
    
    const getAllCoins = (position, index, functionName) => {
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

        // lol some weird js nonsense to determine which function to run
        const value = Math[functionName](coins, previousCoins, nextCoins);
        memos[functionName][key] = value;
        return value;
    }

    const value = 256;
    return getAllCoins(new Array(jumps.length).fill(0), value - 1, 'max') + ' ' + getAllCoins(new Array(jumps.length).fill(0), value - 1, 'min');
}

export { part1, part2, part3 };