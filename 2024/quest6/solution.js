import fs from 'node:fs';

const getUniquePath = (input, firstCharacter) => {
    const graph = input.replace(/\r/g, '').split('\n').reduce((obj, line) => {
        const [part, leaves] = line.split(':');
        obj[part] = leaves.split(',');
        return obj;
    }, {});

    const queue = [{ id: 'RR', path: 'RR' }];
    const paths = {};

    while (queue.length != 0) {
        const current = queue.shift();

        if (current.id === '@') {
            let path = current.path.split(',');
            if (firstCharacter) path = path.map(node => node[0]);
            if (!paths[path.length]) paths[path.length] = [];
            paths[path.length].push(path.join(''));
        }

        if (graph[current.id]) {
            for (let i = 0; i < graph[current.id].length; i++) {
                if (graph[current.id][i] != 'ANT' && graph[current.id][i] != 'BUG') {
                    queue.push({ id: graph[current.id][i], path: current.path + ',' + graph[current.id][i] });
                }
            }
        }
    }

    const lengths = Object.keys(paths);
    for (let i = 0; i < lengths.length; i++) {
        if (paths[lengths[i]].length == 1) return paths[lengths[i]][0];
    }
}

const part1 = () => {
    const input = fs.readFileSync('2024/quest6/inputs/input1.txt').toString();
    return getUniquePath(input, false);
    
}

const part2 = () => {
    const input = fs.readFileSync('2024/quest6/inputs/input2.txt').toString();
    return getUniquePath(input, true);
}

const part3 = () => {
    const input = fs.readFileSync('2024/quest6/inputs/input3.txt').toString();
    return getUniquePath(input, true);
}

console.log(part1());
console.log(part2());
console.log(part3());