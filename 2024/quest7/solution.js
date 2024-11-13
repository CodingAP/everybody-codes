import fs from 'node:fs';

const gcd = (a, b) => {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
}

const lcm = (a, b) => {
    return Math.abs(a * b) / gcd(a, b);
}

const parseRacetrack = racetrackInput => {
    const getNewPosition = ({ x, y, direction }) => {
        const directions = [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }];
        return { x: x + directions[direction].x, y: y + directions[direction].y }
    }
    
    const isValid = (x, y, width, height) => {
        return x >= 0 && x < width && y >= 0 && y < height;
    }

    const racetrack = [];
    const current = { x: 0, y: 0, direction: 0 };
    const width = racetrackInput[0].length, height = racetrackInput.length;
    
    do {
        const newPosition = getNewPosition(current);
        if (!isValid(newPosition.x, newPosition.y, width, height) || racetrackInput[newPosition.y][newPosition.x] == ' ') {
            // try both positions
            const leftPosition = getNewPosition({ x: current.x, y: current.y, direction: (current.direction + 3) % 4 });
            const rightPosition = getNewPosition({ x: current.x, y: current.y, direction: (current.direction + 1) % 4 });
            if (isValid(leftPosition.x, leftPosition.y, width, height) && racetrackInput[leftPosition.y][leftPosition.x] != ' ') {
                current.x = leftPosition.x;
                current.y = leftPosition.y;
                current.direction = (current.direction + 3) % 4;
            } else {
                current.x = rightPosition.x;
                current.y = rightPosition.y;
                current.direction = (current.direction + 1) % 4;
            }
        } else {
            current.x = newPosition.x;
            current.y = newPosition.y;
        }

        racetrack.push(racetrackInput[current.y][current.x]);
    } while (racetrackInput[current.y][current.x] != 'S');

    return racetrack;
}

const simulateSquires = (squires, loops, racetrack) => {
    const length = (racetrack) ? loops * racetrack.length : loops;

    for (let i = 0; i < length; i++) {
        for (let j = 0; j < squires.length; j++) {
            if (racetrack && racetrack[i % racetrack.length] == '+') squires[j].essence++;
            else if (racetrack && racetrack[i % racetrack.length] == '-') squires[j].essence--;
            else {
                if (squires[j].actions[i % squires[j].actions.length] == '+') squires[j].essence++;
                else if (squires[j].actions[i % squires[j].actions.length] == '-') squires[j].essence--;
            }

            squires[j].total += squires[j].essence;
        }
    }

    return squires;
}

const part1 = () => {
    const input = fs.readFileSync('2024/quest7/inputs/input1.txt').toString();
    const squires = input.replace(/\r/g, '').split('\n').map(line => {
        let [id, actions] = line.split(':');
        return {
            id,
            actions: actions.split(','),
            essence: 10,
            total: 0
        };
    });

    simulateSquires(squires, 10);

    return squires.sort((a, b) => b.total - a.total).map(squire => squire.id).join('');
}

const part2 = () => {
    const input = fs.readFileSync('2024/quest7/inputs/input2.txt').toString();

    const [squireInput, racetrackInput] = input.replace(/\r/g, '').split('\n\n');
    const racetrack = parseRacetrack(racetrackInput.split('\n'));
    
    const squires = squireInput.split('\n').map(line => {
        let [id, actions] = line.split(':');
        return {
            id,
            actions: actions.split(','),
            essence: 10,
            total: 0
        };
    });

    simulateSquires(squires, 10, racetrack);

    return squires.sort((a, b) => b.total - a.total).map(squire => squire.id).join('');
}

const part3 = () => {
    const input = fs.readFileSync('2024/quest7/inputs/input3.txt').toString();

    const [squireInput, racetrackInput] = input.replace(/\r/g, '').split('\n\n');
    const racetrack = parseRacetrack(racetrackInput.split('\n'));

    const loops = 2024;
    const enemy = simulateSquires([{
        actions: squireInput.split(':')[1].split(','),
        essence: 10,
        total: 0
    }], loops, racetrack);

    const allPlans = [];
    const generatePlans = (a, b, c, sequence = '') => {
        if (a === 0 && b === 0 && c === 0) {
            allPlans.push(sequence);
            return;
        }
        if (a > 0) generatePlans(a - 1, b, c, sequence + '+');
        if (b > 0) generatePlans(a, b - 1, c, sequence + '-');
        if (c > 0) generatePlans(a, b, c - 1, sequence + '=');
    }
    generatePlans(5, 3, 3)

    let count = 0;
    for (let i = 0; i < allPlans.length; i++) {
        const player = simulateSquires([{
            actions: allPlans[i].split(''),
            essence: 10,
            total: 0
        }], loops, racetrack);

        if (player[0].total > enemy[0].total) count++;
    }
    return count;
}

console.log(part1());
console.log(part2());
console.log(part3());