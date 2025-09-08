/**
 * quests\event2024\quest07\solution.ts
 * 
 * ~~ Not Fast but Furious ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 9/7/2025
 */

/**
 * converts grid of undirected characters to an array of directed characters
 * 
 * @param racetrackInput grid of characters to represent racetrack 
 * @returns array of characters that represents the racetrack
 */
const parseRacetrack = (racetrackInput: string[]): string[] => {
    /**
     * gets the new position given the previous position and direction
     * 
     * @param state state to get next position from
     * @returns the new position without checks
     */
    const getNewPosition = (state: { x: number, y: number, direction: number }): { x: number, y: number } => {
        const { x, y, direction } = state;
        const directions = [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }];
        return { x: x + directions[direction].x, y: y + directions[direction].y }
    }
    
    /**
     * checks if a position is within the bounds of the racetrack
     * doesn't check if position is on a character or not
     * 
     * @param x the x position
     * @param y the y position
     * @param width the width of the racetrack
     * @param height the height of the racktrack
     * @returns if position is inside the racetrack
     */
    const isValid = (x: number, y: number, width: number, height: number): boolean => {
        return x >= 0 && x < width && y >= 0 && y < height;
    }

    const racetrack = [];
    const current = { x: 0, y: 0, direction: 0 };
    const width = racetrackInput[0].length, height = racetrackInput.length;
    
    do {
        // try to move forward
        const newPosition = getNewPosition(current);
        if (!isValid(newPosition.x, newPosition.y, width, height) || racetrackInput[newPosition.y][newPosition.x] == ' ') {
            // if fails, try both left and right
            const leftPosition = getNewPosition({ x: current.x, y: current.y, direction: (current.direction + 3) % 4 });
            const rightPosition = getNewPosition({ x: current.x, y: current.y, direction: (current.direction + 1) % 4 });

            if (isValid(leftPosition.x, leftPosition.y, width, height) && racetrackInput[leftPosition.y][leftPosition.x] != ' ') {
                // if left position is valid, move left
                current.x = leftPosition.x;
                current.y = leftPosition.y;
                current.direction = (current.direction + 3) % 4;
            } else {
                // else, move right
                current.x = rightPosition.x;
                current.y = rightPosition.y;
                current.direction = (current.direction + 1) % 4;
            }
        } else {
            // if successful, move forward
            current.x = newPosition.x;
            current.y = newPosition.y;
        }

        racetrack.push(racetrackInput[current.y][current.x]);
    } while (racetrackInput[current.y][current.x] != 'S');

    return racetrack;
}

/**
 * simulates the squires actions, either by just the actions, or by the given racetrack and actions
 * 
 * @param squires all the squires to be simulated 
 * @param loops either the amount of moves or the amount of loops, depending on if the racetrack exits 
 * @param racetrack if provided, the racetrack that determine some actions 
 * @returns the modified squires
 */
const simulateSquires = (squires: { actions: string[], essence: number, total: number }[], loops: number, racetrack?: string[]): { actions: string[], essence: number, total: number }[] => {
    const length = (racetrack) ? loops * racetrack.length : loops;

    for (let i = 0; i < length; i++) {
        for (let j = 0; j < squires.length; j++) {
            // check if racetrack exist and forces a specific move
            if (racetrack && racetrack[i % racetrack.length] == '+') squires[j].essence++;
            else if (racetrack && racetrack[i % racetrack.length] == '-') squires[j].essence--;
            else {
                // else, do the action that is on the correct turn
                if (squires[j].actions[i % squires[j].actions.length] == '+') squires[j].essence++;
                else if (squires[j].actions[i % squires[j].actions.length] == '-') squires[j].essence--;
            }

            squires[j].total += squires[j].essence;
        }
    }

    return squires;
}

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 1
 */
const part1 = (input: string): string => {
    const squires = input.replace(/\r/g, '').split('\n').map(line => {
        const [id, actions] = line.split(':');
        return {
            id,
            actions: actions.split(','),
            essence: 10,
            total: 0
        };
    });

    // simulate 10 actions and sort the squires by largest total
    simulateSquires(squires, 10);
    return squires.sort((a, b) => b.total - a.total).map(squire => squire.id).join('');
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 2
 */
const part2 = (input: string): string => {
    const [squireInput, racetrackInput] = input.split('\n\n');
    const racetrack = parseRacetrack(racetrackInput.split('\n'));
    
    const squires = squireInput.split('\n').map(line => {
        const [id, actions] = line.split(':');
        return {
            id,
            actions: actions.split(','),
            essence: 10,
            total: 0
        };
    });

    // simulate the squires through 10 loops of the racetrack
    simulateSquires(squires, 10, racetrack);
    return squires.sort((a, b) => b.total - a.total).map(squire => squire.id).join('');
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 3
 */
const part3 = (input: string): string => {
    const [squireInput, racetrackInput] = input.replace(/\r/g, '').split('\n\n');
    const racetrack = parseRacetrack(racetrackInput.split('\n'));

    // note: we only have to simulate 11 laps because after 11 laps, the totals become cyclic meaning that it will only scale
    // this comes from the actions length being 11
    
    // simulate the enemy's actions to find the score to beat
    const loops = 11;
    const enemy = simulateSquires([{
        actions: squireInput.split(':')[1].split(','),
        essence: 10,
        total: 0
    }], loops, racetrack);

    // generate all possible plans that consist of 5 +'s, 3 -'s, and 3 ='s
    const allPlans: string[] = [];
    const generatePlans = (a: number, b: number, c: number, sequence = '') => {
        if (a === 0 && b === 0 && c === 0) {
            allPlans.push(sequence);
            return;
        }
        if (a > 0) generatePlans(a - 1, b, c, sequence + '+');
        if (b > 0) generatePlans(a, b - 1, c, sequence + '-');
        if (c > 0) generatePlans(a, b, c - 1, sequence + '=');
    }
    generatePlans(5, 3, 3);

    // try all possible plans to find how many beat the enemy
    let count = 0;
    for (let i = 0; i < allPlans.length; i++) {
        const player = simulateSquires([{
            actions: allPlans[i].split(''),
            essence: 10,
            total: 0
        }], loops, racetrack);

        if (player[0].total > enemy[0].total) count++;
    }
    return count.toString();
}

export { part1, part2, part3 };