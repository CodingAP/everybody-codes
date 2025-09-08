/**
 * quests\event2024\quest02\solution.ts
 * 
 * ~~ The Runes of Power ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 8/28/2025
 */

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 1
 */
const part1 = (input: string): string => {
    // parse the input
    const [lines1, lines2] = input.replace(/\r/g, '').split('\n\n');
    const words = lines1.split(':')[1].split(',');
    const sentence = lines2.split(' ');

    let count = 0;

    // count all the sentence tokens that have matching words in the word bank
    for (let j = 0; j < sentence.length; j++) {
        for (let i = 0; i < words.length; i++) {
            if (sentence[j].includes(words[i])) count++;
        }
    }

    return count.toString();
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 2
 */
const part2 = (input: string): string => {
    // parse the input
    const [lines1, lines2] = input.replace(/\r/g, '').split('\n\n');
    const words = lines1.split(':')[1].split(',');
    const sentence = lines2.split('\n').map(line => line.split(' ')).flat();

    let count = 0;

    // count all the sentence characters that have a matching word, forwards or backwards
    // it replaces the characters with 'x' to not double-count
    for (let i = 0; i < sentence.length; i++) {
        const current = sentence[i].split('');
        for (let j = 0; j < words.length; j++) {
            // checks the characters forward
            let index = sentence[i].indexOf(words[j]);
            while (index != -1) {
                for (let k = 0; k < words[j].length; k++) {
                    current[index + k] = 'x';
                }
                index = sentence[i].indexOf(words[j], index + 1);
            }

            // checks the characters backwards
            const reversed = words[j].split('').reverse().join('');

            let reversedIndex = sentence[i].indexOf(reversed);
            while (reversedIndex != -1) {
                for (let k = 0; k < reversed.length; k++) {
                    current[reversedIndex + k] = 'x';
                }
                reversedIndex = sentence[i].indexOf(reversed, reversedIndex + 1);
            }
        }
        // counts all the 'x' characters
        count += current.filter(char => char == 'x').length;
    }

    return count.toString();
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 3
 */
const part3 = (input: string): string => {
    // parse the input
    const [lines1, lines2] = input.replace(/\r/g, '').split('\n\n');
    const words = lines1.split(':')[1].split(',');
    const grid = lines2.split('\n');

    const foundCharacters = new Array(grid.length).fill(0).map((_, i) => new Array(grid[i].length).fill(' '));

    // check rows, including word wrapping
    for (let i = 0; i < words.length; i++) {
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                let checkedWord = '';
                for (let j = 0; j < words[i].length; j++) {
                    checkedWord += grid[y][(x + j) % grid[y].length];
                }

                // checks for the word, forward or backward
                const reversed = words[i].split('').reverse().join('');
                if (checkedWord == words[i] || checkedWord == reversed) {
                    for (let j = 0; j < words[i].length; j++) {
                        foundCharacters[y][(x + j) % grid[y].length] = 'x';
                    }
                }
            }
        }
    }

    // check columns, without word wrapping
    for (let i = 0; i < words.length; i++) {
        for (let x = 0; x < grid[0].length; x++) {
            for (let y = 0; y <= grid.length - words[i].length; y++) {
                let checkedWord = '';
                for (let j = 0; j < words[i].length; j++) {
                    checkedWord += grid[y + j][x];
                }

                // checks for the word, forward or backward
                const reversed = words[i].split('').reverse().join('');
                if (checkedWord == words[i] || checkedWord == reversed) {
                    for (let j = 0; j < words[i].length; j++) {
                        foundCharacters[y + j][x] = 'x';
                    }
                }
            }
        }
    }

    // flatten all the rows, count all the 'x' characters
    return foundCharacters.flat().filter(element => element == 'x').length.toString();
}

export { part1, part2, part3 };