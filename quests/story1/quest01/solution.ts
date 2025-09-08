/**
 * quests\story1\quest01\solution.ts
 * 
 * ~~ EniCode ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 9/1/2025
 */

/**
 * container for all parameters from input
 */
interface Parameters {
    A: number;
    B: number;
    C: number;
    X: number;
    Y: number;
    Z: number;
    M: number;
};

/**
 * calculates (n^exp)%mod fast using modular exponentiation :)
 */
const pow = (n: number, exp: number, mod: number): number => {
    let result = 1;

    while (exp >= 1) {
        if (exp % 2 === 1) {
            result = (result * n) % mod;
            exp--;
        } else {
            n = (n * n) % mod;
            exp /= 2;
        }
    }

    return result;
};

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 1
 */
const part1 = (input: string): string => {
    // parse input in list of parameters
    const parameters = input.split('\n').map(line => {
        const variables = line.split(' ').reduce<Parameters>((obj, assignment) => {
            const [id, value] = assignment.split('=');
            obj[id as keyof Parameters] = parseInt(value);
            return obj;
        }, { A: 0, B: 0, C: 0, X: 0, Y: 0, Z: 0, M: 0 });
        return variables;
    });

    /**
     * part 1's eni function
     * 
     * calculates all remainder values from 1 to exp and appends to a number in reverse order 
     */
    const eni = (n: number, exp: number, mod: number): number => {
        let result = '';
        for (let i = 1; i <= exp; i++) {
            result = pow(n, i, mod) + result;
        }
        return parseInt(result);
    };

    // find the highest value that can be calculated with
    // eni(A, X, M) + eni(B, Y, M) + eni(C, Z, M) 
    // for each line
    let max = -Infinity;
    for (const parameter of parameters) {
        const score = eni(parameter.A, parameter.X, parameter.M) + eni(parameter.B, parameter.Y, parameter.M) + eni(parameter.C, parameter.Z, parameter.M);
        max = Math.max(max, score);
    }

    return max.toString();
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 2
 */
const part2 = (input: string): string => {
    // parse input in list of parameters
    const parameters = input.split('\n').map(line => {
        const variables = line.split(' ').reduce<Parameters>((obj, assignment) => {
            const [id, value] = assignment.split('=');
            obj[id as keyof Parameters] = parseInt(value);
            return obj;
        }, { A: 0, B: 0, C: 0, X: 0, Y: 0, Z: 0, M: 0 });
        return variables;
    });

    /**
     * part 2's eni function
     * 
     * calculates remainder values from exp - 4 to exp and appends to a number in reverse order 
     */
    const eni = (n: number, exp: number, mod: number): number => {
        let result = '';
        for (let i = Math.max(1, exp - 4); i <= exp; i++) {
            result = pow(n, i, mod) + result;
        }
        return parseInt(result);
    };

    let max = -Infinity;
    for (const parameter of parameters) {
        const score = eni(parameter.A, parameter.X, parameter.M) + eni(parameter.B, parameter.Y, parameter.M) + eni(parameter.C, parameter.Z, parameter.M);
        max = Math.max(max, score);
    }

    return max.toString();
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 3
 */
const part3 = (input: string): string => {
    // parse input in list of parameters
    const parameters = input.split('\n').map(line => {
        const variables = line.split(' ').reduce<Parameters>((obj, assignment) => {
            const [id, value] = assignment.split('=');
            obj[id as keyof Parameters] = parseInt(value);
            return obj;
        }, { A: 0, B: 0, C: 0, X: 0, Y: 0, Z: 0, M: 0 });
        return variables;
    });

    /**
     * part 3's eni function
     * 
     * calculates all remainder values from 1 to exp and adds them together
     * uses cycle detection to not have to add every step
     */
    const eni = (n: number, exp: number, mod: number): number => {
        const previous: number[] = [];
        let result = 0;
        let cycleStart = 0;

        for (let i = 1; i <= exp; i++) {
            const num = pow(n, i, mod);
            if (previous.includes(num)) {
                cycleStart = previous.indexOf(num);
                break;
            } else {
                result += num;
                previous.push(num);
            }
        }

        // the extra -1 is because we have already done one cycle to detect if there was one
        const cycles = Math.floor((exp - cycleStart) / (previous.length - cycleStart)) - 1;

        // find how much one cycle adds
        let cycleSum = 0;
        for (let i = cycleStart; i < previous.length; i++) cycleSum += previous[i];

        // add the last remaining bits that aren't a complete cycle
        let lastBit = 0;
        for (let i = 0; i < (exp - cycleStart) % (previous.length - cycleStart); i++) lastBit += previous[cycleStart + i];

        // add initial cycle and extras with calculated cycles
        result += cycles * cycleSum + lastBit;

        return result;
    };

    let max = -Infinity;
    for (const parameter of parameters) {
        const score = eni(parameter.A, parameter.X, parameter.M) + eni(parameter.B, parameter.Y, parameter.M) + eni(parameter.C, parameter.Z, parameter.M);
        max = Math.max(max, score);
    }

    return max.toString();
}

export { part1, part2, part3 };