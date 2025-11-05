/**
 * quests\event2025\quest02\solution.ts
 * 
 * ~~ From Complex to Clarity ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 11/5/2025
 */

type ComplexNumber = [number, number];

const add = (a: ComplexNumber, b: ComplexNumber): ComplexNumber => [a[0] + b[0], a[1] + b[1]];
const multiply = (a: ComplexNumber, b: ComplexNumber): ComplexNumber => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
const divide = (a: ComplexNumber, b: ComplexNumber): ComplexNumber => [Math.trunc(a[0] / b[0]), Math.trunc(a[1] / b[1])];

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 1
 */
const part1 = (input: string): string => {
    const a = JSON.parse(input.split('=')[1]) as ComplexNumber;
    let result: ComplexNumber = [0, 0];

    for (let i = 0; i < 3; i++) {
        result = multiply(result, result);
        result = divide(result, [10, 10]);
        result = add(result, a);
    }
    
    return `[${result.toString()}]`;
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 2
 */
const part2 = (input: string): string => {
    const a = JSON.parse(input.split('=')[1]) as ComplexNumber;
    let count = 0;

    for (let y = a[1]; y <= a[1] + 1000; y += 10) {
        for (let x = a[0]; x <= a[0] + 1000; x += 10) {
            let result: ComplexNumber = [0, 0];
            let contained = true;

            for (let i = 0; i < 100; i++) {
                result = multiply(result, result);
                result = divide(result, [100000, 100000]);
                result = add(result, [x, y]);
            
                if (Math.abs(result[0]) > 1000000 || Math.abs(result[1]) > 1000000) {
                    contained = false;
                    break;
                }
            }

            if (contained) count++;
        }
    }

    return `${count}`;
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 3
 */
const part3 = (input: string): string => {
    const a = JSON.parse(input.split('=')[1]) as ComplexNumber;
    let count = 0;

    for (let y = a[1]; y <= a[1] + 1000; y++) {
        for (let x = a[0]; x <= a[0] + 1000; x++) {
            let result: ComplexNumber = [0, 0];
            let contained = true;

            for (let i = 0; i < 100; i++) {
                result = multiply(result, result);
                result = divide(result, [100000, 100000]);
                result = add(result, [x, y]);
            
                if (Math.abs(result[0]) > 1000000 || Math.abs(result[1]) > 1000000) {
                    contained = false;
                    break;
                }
            }

            if (contained) count++;
        }
    }

    return `${count}`;
}

export { part1, part2, part3 };