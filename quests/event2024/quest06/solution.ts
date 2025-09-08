/**
 * quests\event2024\quest06\solution.ts
 * 
 * ~~ The Tree of Titans ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 9/7/2025
 */

/**
 * gets the most powerful fruit by finding the fruit with a unique length
 * specifically skips branchs with the names 'ANT' and 'BUG' as the intentionally include cycles
 * 
 * @param input list of tree nodes and branches
 * @param firstCharacter tells whether to take the whole path's name or just the first character 
 * @returns finds the path with the unique length
 */
const getUniquePath = (input: string, firstCharacter: boolean): string => {
    // parse input as a graph with edges
    const graph = input.replace(/\r/g, '').split('\n').reduce<{ [key: string]: string[] }>((obj, line) => {
        const [part, leaves] = line.split(':');
        obj[part] = leaves.split(',');
        return obj;
    }, {});


    // setup bfs to find all possible paths
    const queue = [{ id: 'RR', path: 'RR' }];
    const paths: { [key: string]: string[] } = {};

    while (queue.length != 0) {
        const current = queue.shift();

        if (current === undefined) break;

        if (current.id === '@') {
            // parse path and categorize it by length
            let path = current.path.split(',');
            if (firstCharacter) path = path.map(node => node[0]);
            if (!paths[path.length]) paths[path.length] = [];
            paths[path.length].push(path.join(''));
        }

        if (graph[current.id]) {
            // explore all branchs, expect for 'ANT' and 'BUG'
            for (let i = 0; i < graph[current.id].length; i++) {
                if (graph[current.id][i] !== 'ANT' && graph[current.id][i] !== 'BUG') {
                    queue.push({ id: graph[current.id][i], path: current.path + ',' + graph[current.id][i] });
                }
            }
        }
    }

    // find the path with the unique length
    const lengths = Object.keys(paths);
    for (let i = 0; i < lengths.length; i++) {
        if (paths[lengths[i]].length === 1) return paths[lengths[i]][0];
    }

    return '';
}

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 1
 */
const part1 = (input: string): string => {
    return getUniquePath(input, false);
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 2
 */
const part2 = (input: string): string => {
    return getUniquePath(input, true);
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 3
 */
const part3 = (input: string): string => {
    return getUniquePath(input, true);
}

export { part1, part2, part3 };