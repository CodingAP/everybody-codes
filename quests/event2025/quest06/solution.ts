/**
 * quests\event2025\quest06\solution.ts
 * 
 * ~~ Mentorship Matrix ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 11/10/2025
 */

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 1
 */
const part1 = (input: string): string => {
    let count = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i] === 'a') {
            for (let j = 0; j < i; j++) {
                if (input[j] === 'A') count++;
            }
        }
    }
    return `${count}`;
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 2
 */
const part2 = (input: string): string => {
    let count = 0;
    for (let i = 0; i < input.length; i++) {
        if (input.charCodeAt(i) >= 'a'.charCodeAt(0) && input.charCodeAt(i) <= 'z'.charCodeAt(0)) {
            for (let j = 0; j < i; j++) {
                if (input[j] === input[i].toUpperCase()) count++;
            }
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
    const repeats = 1000, distance = 1000;

    const firstLastNum: { [key: string]: number } = {};
    const repeatNum: { [key: string]: number } = {};
    let firstLastCount = 0, repeatCount = 0;
    for (let i = 0; i < distance; i++) {
        firstLastNum[input[i]] = (firstLastNum[input[i]] || 0) + 1;
        repeatNum[input[i]] = (repeatNum[input[i]] || 0) + 1;
        repeatNum[input[input.length - i - 1]] = (repeatNum[input[input.length - i - 1]] || 0) + 1; 
    }
    
    for (let i = 0; i < input.length; i++) {
        repeatNum[input[(i + distance) % input.length]]++;
        if (i + distance < input.length) {
            firstLastNum[input[i + distance]]++;
        }

        if (input.charCodeAt(i) >= 'a'.charCodeAt(0) && input.charCodeAt(i) <= 'z'.charCodeAt(0)) {
            repeatCount += repeatNum[input[i].toUpperCase()];
            firstLastCount += firstLastNum[input[i].toUpperCase()];
        }
        
        repeatNum[input[(i + input.length - distance) % input.length]]--;
        if (i - distance >= 0) {
            firstLastNum[input[i - distance]]--;
        }
    }
    
    return `${firstLastCount + repeatCount * (repeats - 1)}`;
}

export { part1, part2, part3 };