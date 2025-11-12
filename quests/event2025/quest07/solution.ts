/**
 * quests\event2025\quest07\solution.ts
 * 
 * ~~ Namegraph ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 11/11/2025
 */

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 1
 */
const part1 = (input: string): string => {
    const parts = input.split('\n\n');
    const names = parts[0].split(',');
    const rules = parts[1].split('\n').reduce<{ [key: string]: string[] }>((obj, line) => {
        const [left, right] = line.split(' > ');
        obj[left] = right.split(',');
        return obj;
    }, {});

    for (let i = 0; i < names.length; i++) {
        let matches = true;
        for (let j = 0; j < names[i].length - 1; j++) {
            if (!rules[names[i][j]].includes(names[i][j + 1])) {
                matches = false;
                break;
            }
        }

        if (matches) return names[i];
    }

    return 'N/A';
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 2
 */
const part2 = (input: string): string => {
    const parts = input.split('\n\n');
    const names = parts[0].split(',');
    const rules = parts[1].split('\n').reduce<{ [key: string]: string[] }>((obj, line) => {
        const [left, right] = line.split(' > ');
        obj[left] = right.split(',');
        return obj;
    }, {});

    let count = 0;
    for (let i = 0; i < names.length; i++) {
        let matches = true;
        for (let j = 0; j < names[i].length - 1; j++) {
            if (!rules[names[i][j]].includes(names[i][j + 1])) {
                matches = false;
                break;
            }
        }

        if (matches) count += i + 1;
    }

    return `${count}`;
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 3
 */
const part3 = (input: string): string => {
    const parts = input.split('\n\n');
    const names = parts[0].split(',');
    const rules = parts[1].split('\n').reduce<{ [key: string]: string[] }>((obj, line) => {
        const [left, right] = line.split(' > ');
        obj[left] = right.split(',');
        return obj;
    }, {});

    const filtered = names.filter(name => {
        let matches = true;
        for (let j = 0; j < name.length - 1; j++) {
            if (!rules[name[j]].includes(name[j + 1])) {
                matches = false;
                break;
            }
        }

        return matches;
    });

    const generated = new Set<string>();
    const getNames = (name: string) => {
        if (generated.has(name)) return;
        if (name.length > 11) return;

        const possible = rules[name[name.length - 1]] ?? [];
        for (let i = 0; i < possible.length; i++) getNames(name + possible[i]);

        if (name.length >= 7) generated.add(name);
    }

    for (let i = 0; i < filtered.length; i++) getNames(filtered[i]);

    return `${generated.size}`;
}

export { part1, part2, part3 };