import fs from 'node:fs';

const part1 = () => {
    const input = fs.readFileSync('2024/quest4/inputs/input1.txt').toString();
    const nails = input.replace(/\r/g).split('\n').map(num => parseInt(num));

    const min = nails.sort((a, b) => a - b)[0];
    let hits = 0;
    for (let i = 0; i < nails.length; i++) {
        hits += nails[i] - min;
    }
    return hits;
}

const part2 = () => {
    const input = fs.readFileSync('2024/quest4/inputs/input2.txt').toString();
    const nails = input.replace(/\r/g).split('\n').map(num => parseInt(num));

    const min = nails.sort((a, b) => a - b)[0];
    let hits = 0;
    for (let i = 0; i < nails.length; i++) {
        hits += nails[i] - min;
    }
    return hits;
}

const part3 = () => {
    const input = fs.readFileSync('2024/quest4/inputs/input3.txt').toString();
    const nails = input.replace(/\r/g).split('\n').map(num => parseInt(num));

    let min = Infinity;
    for (let i = 0; i < nails.length; i++) {
        let hits = 0;
        for (let j = 0; j < nails.length; j++) {
            hits += Math.abs(nails[j] - nails[i]);
        }
        min = Math.min(hits, min);
    }
    
    return min;
}

console.log(part1());
console.log(part2());
console.log(part3());