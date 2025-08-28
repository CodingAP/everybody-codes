/**
 * quests\2024\quest05\solution.js
 * 
 * ~~ Pseudo-Random Clap Dance ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 11/13/2024
 */

/**
 * parse the input to get the list of dances to move
 * 
 * @param {string} input input to parse
 * @returns {number[][]} initial state of the dancers
 */
const parseInput = input => {
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
 * @param {number[][]} dance starting dance configuration
 * @param {number} turn current turn of dancer
 */
const doDance = (dance, turn) => {
    const next = (turn + 1) % dance.length;

    let num = dance[turn].shift();
    let side = Math.ceil(num / dance[next].length) % 2 == 0;
    
    let index = (num % dance[next].length);
    if (index == 0) index = dance[next].length;
    index -= 1;

    dance[next].splice((side) ? dance[next].length - index : index, 0, num);
}

/**
 * gets the code to be shouted (can be converted to a number)
 * 
 * @param {number[][]} dance given dance configueation 
 * @returns {string} code to be shouted
 */
const shoutCode = dance => {
    let code = '';
    for (let j = 0; j < dance.length; j++) {
        code += dance[j][0];
    }
    return code;
}

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    const dance = parseInput(input);
    
    // simulate 10 turns of the dance
    let turns = 10;
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
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    const dance = parseInput(input);
    
    // see which number gets shouted out 2024 times first
    let shouted = {};
    let i = 0;
    while (true) {
        const turn = i % dance.length;
        doDance(dance, turn);

        const code = shoutCode(dance);
        shouted[code] = (shouted[code] || 0) + 1;

        i++;
        // output turn * code when it is done
        if (shouted[code] === 2024) return parseInt(code) * i;
    }
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 3
 */
const part3 = async input => {
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