/**
 * quests\2024\quest11\solution.js
 * 
 * ~~ no title available ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 11/18/2024
 */

const parseInput = lines => {
    return lines.reduce((obj, line) => {
        let [start, end] = line.split(':');
        end = end.split(',');
        obj[start] = end;
        return obj;
    }, {});
}

const simulatePopulation = (rules, starting, turns) => {
    let population = { [starting]: 1 };

    for (let i = 0; i < turns; i++) {
        const newPopulation = {};
        const current = Object.keys(population);
        for (let j = 0; j < current.length; j++) {
            for (let k = 0; k < rules[current[j]].length; k++) {
                newPopulation[rules[current[j]][k]] = (newPopulation[rules[current[j]][k]] ?? 0) + population[current[j]];
            }
        }
        population = newPopulation;
    }

    return Object.values(population).reduce((sum, num) => sum + num, 0);
}

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    const rules = parseInput(input.split('\n'));
    return simulatePopulation(rules, 'A', 4);
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    const rules = parseInput(input.split('\n'));
    return simulatePopulation(rules, 'Z', 10);
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 3
 */
const part3 = async input => {
    const rules = parseInput(input.split('\n'));

    const numbers = Object.keys(rules).map(termite => simulatePopulation(rules, termite, 20)).sort((a, b) => a - b);
    return numbers.at(-1) - numbers.at(0);
}

export { part1, part2, part3 };