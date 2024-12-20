/**
 * quests\2024\quest01\solution.js
 * 
 * ~~ The Battle for the Farmlands ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 11/12/2024
 */

/**
 * simulates a battle and determine the amount of potions needed to defeat all enemies
 * 
 * enemy A = 0 potions to defeat
 * enemy B = 1 potion to defeat
 * enemy C = 3 potions to defeat
 * enemy D = 5 potions to defeat
 * 
 * @param {string} input description of enemies present 
 * @param {number} groupSize how many enemies to process at one time
 * @returns {number} number of potions require to beat all enemies
 */
const battle = (input, groupSize) => {
    let potions = 0;

    for (let i = 0; i < input.length; i += groupSize) {
        let count = 0;

        // count how many enemies are in group and determine potion count
        for (let j = 0; j < groupSize; j++) {
            if (input[i + j] != 'x') count++;
            if (input[i + j] == 'B') potions += 1;
            if (input[i + j] == 'C') potions += 3;
            if (input[i + j] == 'D') potions += 5;
        }

        // if 2 enemies in group, need an extra potion per enemy
        if (count == 2) potions += 2;

        // if 3 enemies in group, need an extra 2 potions per enemy
        if (count == 3) potions += 6;
    }

    return potions;
}

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    return battle(input, 1);
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    return battle(input, 2);
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 3
 */
const part3 = async input => {
    return battle(input, 3);
}

export { part1, part2, part3 };