/**
 * quests\2024\quest10\solution.js
 * 
 * ~~ Shrine Needs to Shine ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 11/15/2024
 */

/**
 * get the counts of characters from each row and column of the grid
 * 
 * @param {string[]} grid provided grid
 * @returns {{ columns: { [key: string]: number }, rows: { [key: string]: number } }} the frequency of characters in every row and column
 */
const getColumnsAndRows = grid => {
    // get all letters in all columns and rows
    const width = grid[0].length, height = grid.length;
    const columns = new Array(width).fill(0).map(_ => ({}));
    const rows = new Array(height).fill(0).map(_ => ({}));

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            // only allow letters in the columns and rows
            if (!'.*?'.includes(grid[y][x])) {
                columns[x][grid[y][x]] = (columns[x][grid[y][x]] || 0) + 1; 
                rows[y][grid[y][x]] = (rows[y][grid[y][x]] || 0) + 1;
            }
        }
    }

    return { columns, rows };
}

/**
 * gets the runic word from the provided grid
 * 
 * @param {string[]} grid grid of runes
 * @param {boolean} part3 if its part 3, also try to return filled out grid 
 * @returns {string} the runic word
 */
const findRunicWord = (grid, part3) => {
    const { columns, rows } = getColumnsAndRows(grid);

    // find the word
    let word = '';
    const width = grid[0].length, height = grid.length;
    const newGrid = new Array(height).fill('').map(_ => new Array(width));
    const questionables = [];
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            newGrid[y][x] = grid[y][x];
            if (grid[y][x] === '?') questionables.push({ x, y }); // used in part 3
            if (grid[y][x] !== '.') continue;

            // find what common letter is in columns and rows 
            const intersection = [...new Set(Object.keys(rows[y])).intersection(new Set(Object.keys(columns[x])))];
            if (intersection.length !== 0) {
                word += intersection[0];
                if (part3) newGrid[y][x] = intersection[0]
            }
        }    
    }

    if (!part3) return word;

    // for part 3, check if there is no question marks and already processed
    if ((word.split('').every(letter => letter !== '.') && word.length === 16)) {
        return {
            word,
            grid: newGrid.map(array => array.join(''))
        };
    }
    
    // try to replace question marks with unpaired letters
    const newState = getColumnsAndRows(newGrid.map(array => array.join('')), true);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (newGrid[y][x] !== '.') continue;

            const possibleQuestionables = questionables.filter(q => q.x == x || q.y == y);
            if (possibleQuestionables.length != 1) continue;

            // check for letter pairs
            const letters = { ...newState.columns[x], ...newState.rows[y] };
            const possibleLetter = Object.entries(letters).filter(([letter, amount]) => amount == 1);
            if (possibleLetter.length == 1) {
                // found replacement, replace question mark and .
                const questionable = possibleQuestionables[0];
                newGrid[questionable.y][questionable.x] = possibleLetter[0][0];
                newGrid[y][x] = possibleLetter[0][0];
            }
        }    
    }

    // check if there is a word
    word = '';
    for (let j = 2; j <= 5; j++) {
        for (let i = 2; i <= 5; i++) {
            word += newGrid[j][i];
        }
    }

    return {
        word: (word.split('').every(letter => letter !== '.') && word.length === 16) ? word : null,
        grid: newGrid.map(array => array.join(''))
    };
}

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    return findRunicWord(input.split('\n'), false);
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    const gridOfGrids = input.split('\n\n').map(grids => grids.split('\n').map(line => line.split(' ')));
 
    // parse grid of grids
    const grids = [];
    for (let i = 0; i < gridOfGrids.length; i++) {
        const row = new Array(gridOfGrids[i][0].length).fill(0).map(_ => new Array());
        for (let j = 0; j < gridOfGrids[i][0].length; j++) {
            for (let k = 0; k < gridOfGrids[i].length; k++) {
                row[j].push(gridOfGrids[i][k][j]);
            }
        }
        grids.push(...row);
    }
    
    // find word for every grid, sum all calculated powers
    return grids.reduce((sum, grid) => {
        let count = 0;
        const word = findRunicWord(grid, false);
        for (let i = 0; i < word.length; i++) {
            count += (i + 1) * (word.charCodeAt(i) - 'A'.charCodeAt(0) + 1);
        }
        return sum + count;
    }, 0);
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 3
 */
const part3 = async input => {
    let grid = input.split('\n');

    /**
     * get the subgrid at the specific position
     * 
     * @param {number} x x position of subgrid
     * @param {number} y y position of subgrid
     * @returns {string[]} subgrid at specified position
     */
    const getSubGrid = (x, y) => {
        const subgrid = [];
        for (let j = 0; j < 8; j++) {
            let row = '';
            for (let i = 0; i < 8; i++) {
                row += grid[y * 6 + j][x * 6 + i];
            }
            subgrid.push(row);
        }
        return subgrid;
    }

    /**
     * set the subgrid at the specific position
     * 
     * @param {number} x x position of subgrid
     * @param {number} y y position of subgrid
     * @param {string[]} subgrid the subgrid to insert
     */
    const setSubGrid = (x, y, subgrid) => {
        // since js strings are readonly, we need to turn them into arrays
        grid = grid.map(line => line.split(''));
        subgrid = subgrid.map(line => line.split(''));
        for (let j = 0; j < 8; j++) {
            for (let i = 0; i < 8; i++) {
                grid[y * 6 + j][x * 6 + i] = subgrid[j][i];
            }
        }
        grid = grid.map(line => line.join(''));
        subgrid = subgrid.map(line => line.join(''));
    }

    const words = {};
    // the i is arbritrary, but 2 settles on the correct value
    for (let i = 0; i < 2; i++) {
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 20; x++) {
                if (!words[`${x},${y}`]) {
                    const stats = findRunicWord(getSubGrid(x, y), true);
                    if (typeof stats === 'string') {
                        words[`${x},${y}`] = stats;
                        setSubGrid(x, y, stats.grid);
                    } else if (stats.word) {
                        words[`${x},${y}`] = stats.word;
                        setSubGrid(x, y, stats.grid);
                    }
                }
                
            }
        }
    }

    // find word for every grid, sum all calculated powers
    return Object.values(words).reduce((sum, word) => {
        let count = 0;
        for (let i = 0; i < word.length; i++) {
            count += (i + 1) * (word.charCodeAt(i) - 'A'.charCodeAt(0) + 1);
        }
        return sum + count;
    }, 0);
}

export { part1, part2, part3 };