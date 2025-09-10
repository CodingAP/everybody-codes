/**
 * quests\story2\quest03\solution.ts
 * 
 * ~~ The Dice that Never Lie (Unless I Tell Them To) ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 9/9/2025
 */

/**
 * base die for all parts that handles rolling
 */
interface Die {
    id: number;
    face: number;
    faces: number[];
    seed: number;
    pulse: number;
    rollNumber: number;
};

/**
 * die for part 2 that handles movement on a board
 */
interface PlayerDie extends Die {
    space: number;
    finished: boolean;
};

/**
 * rolls the die, updates the internal state, and returns the face it landed on
 * 
 * @param die die to be rolled
 * @param rollNumber current number of rolls
 * @returns the face the die landed on
 */
const rollDie = (die: Die): number => {
    const spin = die.rollNumber * die.pulse;
    die.face = (die.face + spin) % die.faces.length;
    die.pulse = ((die.pulse + spin) % die.seed) + 1 + die.rollNumber + die.seed;
    die.rollNumber++;
    return die.faces[die.face];
}

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 1
 */
const part1 = (input: string): string => {
    const dice: Die[] = input.split(/\n/).map(line => {
        const [id, ...args] = line.split(' ');
        const [faces, seed] = args.map(part => part.split('=')[1]);
        return { id: parseInt(id.replace(':', '')), faces: JSON.parse(faces), seed: parseInt(seed), pulse: parseInt(seed), face: 0, rollNumber: 1 };
    });

    let score = 0, rollNumber = 0;
    while (score < 10000) {
        for (const die of dice) score += rollDie(die);
        rollNumber++;
    }

    return rollNumber.toString();
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 2
 */
const part2 = (input: string): string => {
    const [diceInput, racetrackInput] = input.split(/\n\n/g);

    const dice: PlayerDie[] = diceInput.split(/\n/g).map(line => {
        const [id, ...args] = line.split(' ');
        const [faces, seed] = args.map(part => part.split('=')[1]);
        return { id: parseInt(id.replace(':', '')), faces: JSON.parse(faces), seed: parseInt(seed), pulse: parseInt(seed), face: 0, rollNumber: 1, space: 0, finished: false };
    });

    const racetrack = racetrackInput.split('').map(num => parseInt(num));

    const order: number[] = [];
    
    while (true) {
        for (const die of dice) {
            // stop rolling after they have finished
            if (die.finished) continue;

            // if die lands on next space, move forward, finishing if done
            if (rollDie(die) === racetrack[die.space]) {
                die.space++;
                if (die.space === racetrack.length) {
                    order.push(die.id);
                    die.finished = true;
                }
            }
        }

        // check to see if all finished
        if (dice.every(die => die.finished)) break;
    }

    return order.toString();
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 3
 */
const part3 = (input: string): string => {
    const [diceInput, gridInput] = input.split(/\n\n/g);

    const dice: Die[] = diceInput.split(/\n/g).map(line => {
        const [id, ...args] = line.split(' ');
        const [faces, seed] = args.map(part => part.split('=')[1]);
        return { id: parseInt(id.replace(':', '')), faces: JSON.parse(faces), seed: parseInt(seed), pulse: parseInt(seed), face: 0, rollNumber: 1 };
    });

    const grid = gridInput.split(/\n/);
    const width = grid[0].length, height = grid.length;
    let total = new Set<string>();

    for (const die of dice) {
        const queue: { die: Die, x: number, y: number }[] = [];
        const visited = new Set<string>();

        // first, find all starting position for all dice to optimize search
        rollDie(die);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (parseInt(grid[y][x]) === die.faces[die.face]) queue.push({ die: structuredClone(die), x, y });
            }
        }

        // run bfs to find all possible positions
        while (queue.length > 0) {
            const current = queue.shift();
            if (current === undefined) break;

            // check to see if it has been visited before
            if (visited.has(`${current.x},${current.y},${current.die.rollNumber}`)) continue;
            visited.add(`${current.x},${current.y},${current.die.rollNumber}`);

            const newSpace = rollDie(current.die);
            [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }].forEach(direction => {
                const newPosition = { x: current.x + direction.x, y: current.y + direction.y };
                if (newPosition.x < 0 || newPosition.x >= width || newPosition.y < 0 || newPosition.y >= height) return;

                if (parseInt(grid[newPosition.y][newPosition.x]) === newSpace) {
                    queue.push({ die: structuredClone(current.die), x: newPosition.x, y: newPosition.y });
                }
            });
        }

        // add only the positions to the total size
        total = total.union(new Set([...visited].map(position => position.split(',')[0] + ',' + position.split(',')[1])));
    }

    return total.size.toString();
}

export { part1, part2, part3 };