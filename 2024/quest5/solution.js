import fs from 'node:fs';

const parseInput = input => {
    const lines = input.replace(/\r/, '').split('\n').map(line => line.split(' ').map(num => parseInt(num)));

    const dance = new Array(lines[0].length).fill(0).map(_ => new Array(lines.length));
    for (let i = 0; i < dance.length; i++) {
        for (let j = 0; j < dance[0].length; j++) {
            dance[i][j] = lines[j][i];
        }
    }

    return dance;
}

const doDance = (dance, turn) => {
    const next = (turn + 1) % dance.length;

    let num = dance[turn].shift();
    let side = Math.ceil(num / dance[next].length) % 2 == 0;
    
    let index = (num % dance[next].length);
    if (index == 0) index = dance[next].length;
    index -= 1;

    dance[next].splice((side) ? dance[next].length - index : index, 0, num);
}

const shoutCode = dance => {
    let code = '';
    for (let j = 0; j < dance.length; j++) {
        code += dance[j][0];
    }
    return code;
}

const part1 = () => {
    const input = fs.readFileSync('2024/quest5/inputs/input1.txt').toString();
    const dance = parseInput(input);
    
    let turns = 10;
    for (let i = 0; i < turns; i++) {
        const turn = i % dance.length;
        doDance(dance, turn);
    }

    return shoutCode(dance);
}

const part2 = () => {
    const input = fs.readFileSync('2024/quest5/inputs/input2.txt').toString();
    const dance = parseInput(input);
    
    let shouted = {};
    let i = 0;
    while (true) {
        const turn = i % dance.length;
        doDance(dance, turn);

        const code = shoutCode(dance);
        shouted[code] = (shouted[code] || 0) + 1;

        i++;
        if (shouted[code] === 2024) return parseInt(code) * i;
    }
}

const part3 = () => {
    const input = fs.readFileSync('2024/quest5/inputs/input3.txt').toString();
    const dance = parseInput(input);
    
    let max = '0';
    for (let i = 0; i < 10000; i++) {
        const turn = i % dance.length;
        doDance(dance, turn);

        const code = shoutCode(dance);
        if (BigInt(code) > BigInt(max)) max = code;
    }

    return max;
}

console.log(part1());
console.log(part2());
console.log(part3());