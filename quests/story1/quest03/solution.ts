/**
 * quests\story1\quest03\solution.ts
 * 
 * ~~ The Conical Snail Clock ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 9/8/2025
 */

/**
 * finds the modulo inverse of a with m
 */
const inverse = (a: number, m: number) => {
    const m0 = m;
    let x0 = 0, x1 = 1;

    if (m === 1) return 0;

    while (a > 1) {
        const q = Math.floor(a / m);

        [a, m] = [m, a % m];
        [x0, x1] = [x1 - q * x0, x0];
    }

    if (x1 < 0) x1 += m0;

    return x1;
}

/**
 * runs the chinese remainder theorem on the given numbers
 * 
 * @param numbers list of numbers to modulo by
 * @param remainders the needed remainders
 * @returns the minimum number to satisfy all formulas
 */
const crt = (numbers: number[], remainders: number[]) => {
    const prod = numbers.reduce((mul, num) => mul * num, 1);

    let result = 0;
    for (let i = 0; i < remainders.length; i++) {
        const pp = Math.floor(prod / numbers[i]);
        result += remainders[i] * inverse(pp, numbers[i]) * pp;
    }

    return result % prod;
}

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 1
 */
const part1 = (input: string): string => {
    // turn all the snail positions to zero index based to make math easier
    const snails = input.split(/\n/g).map(line => {
        const [x, y] = line.split(' ').map(coord => parseInt(coord.split('=')[1]) - 1);
        return { x, y };
    });

    // simulate 100 steps of a snail and add the position values
    let sum = 0;
    for (const snail of snails) {
        const diagonal = snail.x + snail.y + 1;
        const finalX = (snail.x + 100) % diagonal + 1;
        const finalY = diagonal - finalX + 1;
    
        sum += 100 * finalY + finalX;
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
    // turn all the snail positions to zero index based to make math easier
    const snails = input.split(/\n/g).map(line => {
        const [x, y] = line.split(' ').map(coord => parseInt(coord.split('=')[1]) - 1);
        return { x, y };
    });

    // get all diagonal lengths and positions to run crt
    const numbers = [], remainders = [];
    for (const snail of snails) {
        const diagonal = snail.x + snail.y + 1;
        
        numbers.push(diagonal);
        remainders.push(diagonal - snail.x);
    }

    // subtract one as the days start at 0
    return (crt(numbers, remainders) - 1).toString();
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 3
 */
const part3 = (input: string): string => {
    // turn all the snail positions to zero index based to make math easier
    const snails = input.split(/\n/g).map(line => {
        const [x, y] = line.split(' ').map(coord => parseInt(coord.split('=')[1]) - 1);
        return { x, y };
    });

    // get all diagonal lengths and positions to run crt
    const numbers = [], remainders = [];
    for (const snail of snails) {
        const diagonal = snail.x + snail.y + 1;
        
        numbers.push(diagonal);
        remainders.push(diagonal - snail.x);
    }

    // subtract one as the days start at 0
    return (crt(numbers, remainders) - 1).toString();
}

export { part1, part2, part3 };