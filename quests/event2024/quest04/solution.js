/**
 * quests\2024\quest04\solution.js
 * 
 * ~~ Royal Smith's Puzzle ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 11/13/2024
 */

/**
 * simulates hitting all the nails to make them all level
 * 
 * @param {number[]} nails list of nail heights
 * @param {number} level level to move all nails too
 * @returns {number} amount of hits it takes to level the nails 
 */
const simulateHits = (nails, level) => {
    let hits = 0;
    for (let i = 0; i < nails.length; i++) {
        hits += Math.abs(nails[i] - level);
    }
    return hits;
}

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    const nails = input.replace(/\r/g).split('\n').map(num => parseInt(num));

    const min = nails.sort((a, b) => a - b)[0];
    return simulateHits(nails, min);
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    const nails = input.replace(/\r/g).split('\n').map(num => parseInt(num));

    const min = nails.sort((a, b) => a - b)[0];
    return simulateHits(nails, min);
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 3
 */
const part3 = async input => {
    const nails = input.replace(/\r/g).split('\n').map(num => parseInt(num));

    // find level with smallest amount of hits
    let min = Infinity;
    for (let i = 0; i < nails.length; i++) {
        const hits = simulateHits(nails, nails[i]);
        min = Math.min(hits, min);
    }
    
    return min;
}

export { part1, part2, part3 };