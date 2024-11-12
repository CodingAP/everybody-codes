import fs from 'node:fs';

const part1 = () => {
    const input = fs.readFileSync('2024/quest2/inputs/input1.txt').toString();

    let [words, sentence] = input.replace(/\r/g, '').split('\n\n');
    words = words.split(':')[1].split(',');
    sentence = sentence.split(' ');

    let count = 0;

    for (let j = 0; j < sentence.length; j++) {
        for (let i = 0; i < words.length; i++) {
            if (sentence[j].includes(words[i])) count++;
        }
    }

    return count;
}

const part2 = () => {
    const input = fs.readFileSync('2024/quest2/inputs/input2.txt').toString();

    let [words, sentence] = input.replace(/\r/g, '').split('\n\n');
    words = words.split(':')[1].split(',');
    sentence = sentence.split('\n').map(line => line.split(' ')).flat();

    let count = 0;

    for (let i = 0; i < sentence.length; i++) {
        let current = sentence[i].split('');
        for (let j = 0; j < words.length; j++) {
            let index = sentence[i].indexOf(words[j]);
            while (index != -1) {
                for (let k = 0; k < words[j].length; k++) {
                    current[index + k] = 'x';
                }
                index = sentence[i].indexOf(words[j], index + 1);
            }

            const reversed = words[j].split('').reverse().join('');

            let reversedIndex = sentence[i].indexOf(reversed);
            while (reversedIndex != -1) {
                for (let k = 0; k < reversed.length; k++) {
                    current[reversedIndex + k] = 'x';
                }
                reversedIndex = sentence[i].indexOf(reversed, reversedIndex + 1);
            }
        }
        count += current.filter(char => char == 'x').length;
    }

    return count;
}

const part3 = () => {
    const input = fs.readFileSync('2024/quest2/inputs/input3.txt').toString();

    let [words, grid] = input.replace(/\r/g, '').split('\n\n');
    words = words.split(':')[1].split(',');
    grid = grid.split('\n');

    let foundCharacters = new Array(grid.length).fill(0).map((_, i) => new Array(grid[i].length).fill(' '));

    // check rows, included word wrapping
    for (let i = 0; i < words.length; i++) {
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                let checkedWord = '';
                for (let j = 0; j < words[i].length; j++) {
                    checkedWord += grid[y][(x + j) % grid[y].length];
                }

                const reversed = words[i].split('').reverse().join('');
                if (checkedWord == words[i] || checkedWord == reversed) {
                    for (let j = 0; j < words[i].length; j++) {
                        foundCharacters[y][(x + j) % grid[y].length] = 'x';
                    }
                }
            }
        }
    }

    // check columns
    for (let i = 0; i < words.length; i++) {
        for (let x = 0; x < grid[0].length; x++) {
            for (let y = 0; y <= grid.length - words[i].length; y++) {
                let checkedWord = '';
                for (let j = 0; j < words[i].length; j++) {
                    checkedWord += grid[y + j][x];
                }

                const reversed = words[i].split('').reverse().join('');
                if (checkedWord == words[i] || checkedWord == reversed) {
                    for (let j = 0; j < words[i].length; j++) {
                        foundCharacters[y + j][x] = 'x';
                    }
                }
            }
        }
    }

    return foundCharacters.flat().filter(element => element == 'x').length;
}

console.log(part1());
console.log(part2());
console.log(part3());