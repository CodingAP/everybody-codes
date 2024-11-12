import fs from 'node:fs';

const battle = (input, groupSize) => {
    let potions = 0;

    for (let i = 0; i < input.length; i += groupSize) {
        let count = 0;

        for (let j = 0; j < groupSize; j++) {
            if (input[i + j] != 'x') count++;
            if (input[i + j] == 'B') potions += 1;
            if (input[i + j] == 'C') potions += 3;
            if (input[i + j] == 'D') potions += 5;
        }

        if (count == 2) potions += 2;
        if (count == 3) potions += 6;
    }

    return potions;
}

console.log(battle(fs.readFileSync('2024/quest1/inputs/input1.txt').toString(), 1));
console.log(battle(fs.readFileSync('2024/quest1/inputs/input2.txt').toString(), 2));
console.log(battle(fs.readFileSync('2024/quest1/inputs/input3.txt').toString(), 3));