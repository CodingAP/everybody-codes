/**
 * quests/event2026/quest02/solution.ts
 * 
 * ~~ The Axeperiment ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 11/10/2026
 */

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 1
 */
const part1 = (input: string): string => {
    const alloys = input.trim().split('\n').map(line => line.split(' '));
    let checksum = 0;

    alloys.forEach(line => {
        const order: { [key: string]: string[] } = {};
        for (let i = 0; i < line.length; i++) {
            if (order[line[i][0]] === undefined) order[line[i][0]] = [];
            if (order[line[i][2]] === undefined) order[line[i][2]] = [];

            if (line[i][1] === '>') order[line[i][0]].push(line[i][2]);
            if (line[i][1] === '<') order[line[i][2]].push(line[i][0]);
        }

        checksum += parseInt(Object.keys(order).sort((a: string, b: string) => {
            return order[b].length - order[a].length;
        }).join(''));
    });
    
    return checksum.toString();
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 2
 */
const part2 = (input: string): string => {
    const alloys = input.trim().split('\n').map(line => line.split(' '));
    let checksum = 0;

    alloys.forEach(line => {
        const order: { [key: string]: string[] } = {};
        for (let i = 0; i < line.length; i++) {
            if (order[line[i][0]] === undefined) order[line[i][0]] = [];
            if (order[line[i][2]] === undefined) order[line[i][2]] = [];

            if (line[i][1] === '>') order[line[i][0]].push(line[i][2]);
            if (line[i][1] === '<') order[line[i][2]].push(line[i][0]);
        }

        const expandAlloy = (alloy: string): string[] => {
            let greater: string[] = [];
            for (let i = 0; i < order[alloy].length; i++) {
                greater.push(order[alloy][i]);
                greater.push(...expandAlloy(order[alloy][i]));
            }
            return greater;
        }

        Object.keys(order).forEach(alloy => { order[alloy] = [...new Set(expandAlloy(alloy))] });

        checksum += parseInt(Object.keys(order).sort((a: string, b: string) => {
            return order[b].length - order[a].length;
        }).join(''));
    });
    
    return checksum.toString();
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 3
 */
const part3 = (input: string): string => {
    const alloys = input.trim().split('\n').map(line => line.split(' '));
    let checksum = 0;

    alloys.forEach(line => {
        const order: { [key: string]: string[] } = {};
        for (let i = 0; i < line.length; i++) {
            if (order[line[i][0]] === undefined) order[line[i][0]] = [];
            if (order[line[i][2]] === undefined) order[line[i][2]] = [];

            if (line[i][1] === '>') order[line[i][0]].push(line[i][2]);
            if (line[i][1] === '<') order[line[i][2]].push(line[i][0]);
        }

        const expandAlloy = (alloy: string): string[] => {
            let greater: string[] = [];
            for (let i = 0; i < order[alloy].length; i++) {
                greater.push(order[alloy][i]);
                greater.push(...expandAlloy(order[alloy][i]));
            }
            return greater;
        }

        Object.keys(order).forEach(alloy => { order[alloy] = [...new Set(expandAlloy(alloy))] });

        checksum += parseInt(Object.keys(order).sort((a: string, b: string) => {
            return order[b].length - order[a].length;
        }).join(''));
    });
    
    return checksum.toString();
}

export { part1, part2, part3 };