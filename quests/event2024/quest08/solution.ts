/**
 * quests\event2024\quest08\solution.ts
 * 
 * ~~ A Shrine for Nullpointer ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 9/7/2025
 */

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 1
 */
const part1 = (input: string): string => {
    let priests = parseInt(input);

    // find biggest layer that is supported
    let layer = 1;
    while (priests > 0) {
        priests -= layer;
        layer += 2;
    }

    // revert last layer and do the math
    return ((layer - 2) * Math.abs(priests)).toString();
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 2
 */
const part2 = (input: string): string => {
    const priests = parseInt(input);

    let layer = 1, thickness = 1, count = 1;
    const max = 20240000;
    
    // count the number of blocks until it goes over the max
    while (count < max) {
        thickness = (thickness * priests) % 1111;
        layer += 2;
        count += layer * thickness;
    }

    return ((count - max) * layer).toString();
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 3
 */
const part3 = (input: string): string => {
    const priests = parseInt(input);

    let thickness = 1;
    const columns = [1];
    const highPriests = 10;
    const max = 202400000;

    // count the number of blocks until it goes over the max
    // we only need to store half the list because it is mirrored
    while (true) {
        thickness = (thickness * priests) % highPriests + highPriests;
        for (let i = 0; i < columns.length; i++) {
            columns[i] += thickness;
        }
        columns.push(thickness);

        const calculateColumnCount = (i: number) => columns[i] - (priests * (columns.length * 2 - 1) * columns[i] % highPriests);
        
        // calculate the total count with the removals in mind
        let count = 0;
        for (let i = 0; i < columns.length; i++) {
            if (i == 0) count += calculateColumnCount(i);
            else if (i == columns.length - 1) count += 2 * columns[i];
            else count += 2 * calculateColumnCount(i);
        }

        if (count > max) return (count - max).toString();
    }
}

export { part1, part2, part3 };