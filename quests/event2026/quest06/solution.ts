/**
 * quests/event2026/quest06/solution.ts
 * 
 * ~~ The Nullspiracy ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 11/12/2026
 */

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 1
 */
const part1 = (input: string): string => {
    const recipes = input.trim().split('\n').reduce((obj, line) => {
        const [name, ingredients] = line.split(':');
        obj[name] = ingredients.split(',');
        return obj;
    }, {} as { [name: string]: string[] });

    const findIngredients = (name: string, ingredients: Set<string>) => {
        if (ingredients.has(name)) return;
        ingredients.add(name);

        if (recipes[name] === undefined) return;
        for (let i = 0; i < recipes[name].length; i++) {
            findIngredients(recipes[name][i], ingredients);
        }
    }

    const ingredients: Set<string> = new Set();
    findIngredients('NULL', ingredients);
    return (ingredients.size - 1).toString();
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 2
 */
const part2 = (input: string): string => {
    const recipes = input.trim().split('\n').reduce((obj, line) => {
        const [name, ingredients] = line.split(':');
        obj[name] = ingredients.split(',');
        return obj;
    }, {} as { [name: string]: string[] });

    const findIngredients = (name: string, ingredients: Set<string>) => {
        if (ingredients.has(name)) return;
        ingredients.add(name);

        if (recipes[name] === undefined) return;
        for (let i = 0; i < recipes[name].length; i++) {
            findIngredients(recipes[name][i], ingredients);
        }
    }

    let containsNull = 0;

    Object.keys(recipes).forEach(ingredient => {
        if (ingredient === 'NULL') return;

        const ingredients: Set<string> = new Set();
        findIngredients(ingredient, ingredients);

        if (ingredients.has('NULL')) containsNull++;
    })

    return containsNull.toString();
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 3
 */
const part3 = (input: string): string => {
    const recipes = input.trim().split('\n').reduce((obj, line) => {
        const [name, ingredients] = line.split(':');
        obj[name] = ingredients.split(',');
        return obj;
    }, {} as { [name: string]: string[] });

    const findIngredients = (name: string, ingredients: Set<string>) => {
        if (ingredients.has(name)) return;
        ingredients.add(name);

        if (recipes[name] === undefined) return;
        for (let i = 0; i < recipes[name].length; i++) {
            findIngredients(recipes[name][i], ingredients);
        }
    }

    let containsMultipleNulls = 0;

    Object.keys(recipes).forEach(ingredient => {
        if (ingredient.startsWith('NULL')) return;

        const ingredients: Set<string> = new Set();
        findIngredients(ingredient, ingredients);

        let hasV1 = ingredients.has('NULLv1') ? 1 : 0;
        let hasV2 = ingredients.has('NULLv2') ? 1 : 0;
        let hasV3 = ingredients.has('NULLv3') ? 1 : 0;

        if (hasV1 + hasV2 + hasV3 > 1) containsMultipleNulls++;
    })

    return containsMultipleNulls.toString();
}

export { part1, part2, part3 };