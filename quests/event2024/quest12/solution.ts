/**
 * quests\event2024\quest12\solution.ts
 * 
 * ~~ Desert Shower ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 9/8/2025
 */

/**
 * simulate the shots until all the targets are hit
 * 
 * @param targets target map with coordinates to amount of hits
 * @param starting starting coordinates
 * @param power power of the cannon (how far does it fo)
 * @param cannonScore number to multiply when scoring
 * @returns total score of the cannon
 */
const simulate = (targets: { [key: string]: number }, starting: { x: number, y: number }, power: number, cannonScore: number): number => {
    /**
     * checks to see if a target was hit
     * 
     * @param x target x position 
     * @param y target y position
     * @returns 0 or the score if target was hit
     */
    const updateTarget = (x: number, y: number): number => {
        let score = 0;
        if (targets[`${x},${y}`] !== undefined && targets[`${x},${y}`] !== 0) {
            score = power * cannonScore * targets[`${x},${y}`];
            targets[`${x},${y}`] = 0;
        }
        return score;
    }

    let score = 0;
    const current = { x: starting.x, y: starting.y };

    // upward diagonal
    for (let i = 0; i < power; i++) {
        current.x++;
        current.y++;
        score += updateTarget(current.x, current.y);
    }

    // horizontal
    for (let i = 0; i < power; i++) {
        current.x++;
        score += updateTarget(current.x, current.y);
    }

    // downward diagonal
    while (current.y != 0) {
        current.x++;
        current.y--;
        score += updateTarget(current.x, current.y);
    }

    return score;
}

/**
 * parses the input to get the needed data: cannons and targets
 * 
 * @param input the input given
 * @returns the cannons and targets positions
 */
const parseInput = (input: string[]): { cannons: { [key: string]: { x: number, y: number } }, targets: { [key: string]: number } } => {
    const width = input[0].length, height = input.length;
    const cannons: { [key: string]: { x: number, y: number } } = { A: { x: 0, y: 0 }, B: { x: 0, y: 0 }, C: { x: 0, y: 0 } };
    const targets: { [key: string]: number } = {};
    
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (input[y][x] === 'T') targets[`${x},${height - 1 - y}`] = 1;
            if (input[y][x] === 'H') targets[`${x},${height - 1 - y}`] = 2;
            if (input[y][x] === 'A' || input[y][x] === 'B' || input[y][x] === 'C') cannons[input[y][x]] = { x, y: height - 1 - y };
        }
    }

    return { cannons, targets };
}

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 1
 */
const part1 = (input: string): string => {
    const { cannons, targets } = parseInput(input.split('\n'));

    let score = 0;

    // simulate up to 20 speed
    Object.keys(cannons).forEach((cannon, index) => {
        for (let p = 0; p < 20; p++) {
            score += simulate(targets, cannons[cannon], p, index + 1);
        }
    });

    return score.toString();
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 2
 */
const part2 = (input: string): string => {
    const { cannons, targets } = parseInput(input.split('\n'));

    let score = 0;

    // simulate up to 50 speed
    Object.keys(cannons).forEach((cannon, index) => {
        for (let p = 0; p < 50; p++) {
            score += simulate(targets, cannons[cannon], p, index + 1);
        }
    });

    return score.toString();
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 3
 */
const part3 = (input: string): string => {
    const meteors = input.split('\n').map(line => ({ x: parseInt(line.split(' ')[0]), y: parseInt(line.split(' ')[1]) }));
    
    // trace all the paths given the cannon
    const maxX = Math.max(...meteors.map(m => m.x));
    const traces: number[][][] = new Array(3).fill('').map(() => []);
    for (let i = 0; i < 3; i++) {
        traces[i].push([]);
        for (let p = 1; p < Math.floor(maxX / 2); ++p) {
            const t = [i];
            const current = { x: 0, y: i };
    
            // upward diagonal
            for (let j = 0; j < p; j++) {
                current.x++; current.y++;
                t.push(current.y);
            }
    
            // horizontal
            for (let j = 0; j < p; j++) {
                current.x++;
                t.push(current.y);
            }

            // downward diagonal
            while (current.y > 0) {
                current.x++; current.y--;
                t.push(current.y);
            }
    
            traces[i].push(t);
        }
    }

    return meteors.reduce((sum, meteor) => {
        // meteors won't collide until at least halfway traveled to 0
        // the cannon has to take time to travel to the meteor
        let time = Math.round(meteor.x / 2);
        meteor.x -= time;
        meteor.y -= time;
    
        let min = Infinity;
        while (meteor.x >= 0 && meteor.y >= 0) {
            for (let i = 0; i < 3; i++) {
                for (let p = 1; p < traces[i].length; p++) {
                    
                    const score = (i + 1) * p; 
                    if (score > min) break;

                    // if the meteor collides on this specific path, this is the minimum score
                    // as we are checking from smallest speeds and highest positions first
                    const powerList = traces[i][p];
                    if (meteor.x < powerList.length && powerList[meteor.x] === meteor.y) {
                        min = Math.min(min, score);
                        return sum + min;
                    }
                }
            }
            time++;
            meteor.x--;
            meteor.y--;
        }
    
        // shouldn't reach here because all meteors should collide
        return sum;
    }, 0).toString();
}

export { part1, part2, part3 };