import fs from 'node:fs';

const findNearestEmpty = (x, y, grid) => {
    const queue = [{ x, y, steps: 0 }];
    const visited = new Set([`${x},${y}`]);
    const directions = [{ x: 0, y: 1 }, { x: 0, y: -1 }, { x: 1, y: 0 }, { x: -1, y: 0 }];

    while (queue.length != 0) {
        const current = queue.shift();

        if (grid[current.y][current.x] == '.') {
            return current.steps;
        }

        for (let direction of directions) {
            let newX = current.x + direction.x;
            let newY = current.y + direction.y;

            if (newX >= 0 && newX < grid[0].length && newY >= 0 && newY < grid.length && !visited.has(`${newX},${newY}`)) {
                visited.add(`${newX},${newY}`);
                queue.push({ x: newX, y: newY, steps: current.steps + 1 });
            }
        }
    }
    return -1;
}

const findNearestEmptyDiagonals = (x, y, grid) => {
    const queue = [{ x, y, steps: 0 }];
    const visited = new Set([`${x},${y}`]);

    while (queue.length != 0) {
        const current = queue.shift();

        if (current.x < 0 || current.x >= grid[0].length || current.y < 0 || current.y >= grid.length || grid[current.y][current.x] == '.') {
            return current.steps;
        }

        for (let j = -1; j <= 1; j++) {
            for (let i = -1; i <= 1; i++) {
                if (i == 0 && j == 0) continue;

                let newX = current.x + i;
                let newY = current.y + j;

                if (!visited.has(`${newX},${newY}`)) {
                    visited.add(`${newX},${newY}`);
                    queue.push({ x: newX, y: newY, steps: current.steps + 1 });
                }
            }
        }
    }
    return -1;
}

const part1 = () => {
    const input = fs.readFileSync('2024/quest3/inputs/input1.txt').toString();
    const grid = input.replace(/\r/g, '').split('\n');

    let blocks = 0;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] != '.') blocks += findNearestEmpty(x, y, grid);
        }
    }

    return blocks;
}

const part2 = () => {
    const input = fs.readFileSync('2024/quest3/inputs/input2.txt').toString();
    const grid = input.replace(/\r/g, '').split('\n');

    let blocks = 0;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] != '.') blocks += findNearestEmpty(x, y, grid);
        }
    }

    return blocks;
}

const part3 = () => {
    const input = fs.readFileSync('2024/quest3/inputs/input3.txt').toString();
    const grid = input.replace(/\r/g, '').split('\n');

    let blocks = 0;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] != '.') blocks += findNearestEmptyDiagonals(x, y, grid);
        }
    }

    return blocks;
}

console.log(part1());
console.log(part2());
console.log(part3());