/**
 * quests\event2024\quest05\solution.ts
 * 
 * ~~ Pseudo-Random Clap Dance ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 9/7/2025
 */

/**
 * parse the input to get the list of dances to move
 * 
 * @param input input to parse
 * @returns initial state of the dancers
 */
const parseInput = (input: string): number[][] => {
    const lines = input.replace(/\r/, '').split('\n').map(line => line.split(' ').map(num => parseInt(num)));

    // transpose the given input to make processing easier
    const dance = new Array(lines[0].length).fill(0).map(_ => new Array(lines.length));
    for (let i = 0; i < dance.length; i++) {
        for (let j = 0; j < dance[0].length; j++) {
            dance[i][j] = lines[j][i];
        }
    }

    return dance;
}

/**
 * move the dancers around in a deterministic way as given by the quest
 * 
 * @param dance starting dance configuration
 * @param turn current turn of dancer
 */
const doDance = (dance: number[][], turn: number) => {
    const next = (turn + 1) % dance.length;
    const num = dance[turn].shift() as number;

    const side = Math.ceil(num / dance[next].length) % 2 == 0;
    
    let index = (num % dance[next].length);
    if (index == 0) index = dance[next].length;
    index -= 1;

    dance[next].splice((side) ? dance[next].length - index : index, 0, num);
}

/**
 * gets the code to be shouted (can be converted to a number)
 * 
 * @param dance given dance configueation 
 * @returns code to be shouted
 */
const shoutCode = (dance: number[][]): string => {
    let code = '';
    for (let j = 0; j < dance.length; j++) {
        code += dance[j][0];
    }
    return code;
}

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 1
 */
const part1 = (input: string): string => {
    const dance = parseInput(input);
    
    // simulate 10 turns of the dance
    const turns = 10;
    for (let i = 0; i < turns; i++) {
        const turn = i % dance.length;
        doDance(dance, turn);
    }

    // see what the code is after
    return shoutCode(dance);
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 2
 */
const part2 = (input: string): string => {
    const dance = parseInput(input);
    
    // see which number gets shouted out 2024 times first
    const shouted: { [key: string]: number } = {};
    let i = 0;
    while (true) {
        const turn = i % dance.length;
        doDance(dance, turn);

        const code = shoutCode(dance);
        shouted[code] = (shouted[code] || 0) + 1;

        i++;
        // output turn * code when it is done
        if (shouted[code] === 2024) return (parseInt(code) * i).toString();
    }
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 3
 */
const part3 = (input: string): string => {
    const dance = parseInput(input); 
    
    // find biggest number shouted out
    // 10000 is arbitrary, the biggest comes at turn 74
    // we must use big int because the numbers go past the Number.MAX_SAFE_INTEGER
    // my input actually produces a off by one error because of this
    let max = '0';

    for (let i = 0; i < 10000; i++) {
        const turn = i % dance.length;
        doDance(dance, turn);

        const code = shoutCode(dance);
        if (BigInt(code) > BigInt(max)) max = code;
    }

    return max;
}

export { part1, part2, part3 };