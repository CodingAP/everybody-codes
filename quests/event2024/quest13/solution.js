/**
 * quests\2024\quest13\solution.js
 * 
 * ~~ Never Gonna Let You Down ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 11/20/2024
 */

/**
 * min heap implementation
 */
class MinHeap {
    constructor() {
        this.heap = [];
    }

    /**
     * inserts an element and heapifies it until it is in the correct location
     * 
     * @param {{ score: number, data: { [key: string]: any } }} element element to insert with the score 
     */
    insert(element) {
        this.heap.push(element);
        let index = this.heap.length - 1;

        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index].score >= this.heap[parentIndex].score) break;
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }

    /**
     * gets the smallest element, which is at the beginning, then heapifies
     * 
     * @returns {{ score: number, data: { [key: string]: any } }} the smallest scored element
     */
    extractMin() {
        if (this.heap.length === 1) return this.heap.pop();
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        let index = 0;

        while (true) {
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;
            let smallest = index;

            if (leftChild < this.heap.length && this.heap[leftChild].score < this.heap[smallest].score) smallest = leftChild;
            if (rightChild < this.heap.length && this.heap[rightChild].score < this.heap[smallest].score) smallest = rightChild;
            if (smallest === index) break;
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }

        return min;
    }

    /**
     * return the size of the heap
     * 
     * @returns {number} the size of the heap
     */
    size() {
        return this.heap.length;
    }
}

/**
 * finds the best path from the starting point to the ending point
 * 
 * if part 3, then we need to reverse it and find path from ending point to edges of maze
 * 
 * @param {string[][]} grid maze grid with the levels 
 * @param {{ x: number, y: number, level: number }} start starting point and level
 * @param {{ x: number, y: number, level: number }} end ending point and level
 * @param {boolean} isPart3 if we are running part 3
 * @returns {number} how many units it takes to travel
 */
const findBestPath = (grid, start, end, isPart3) => {
    const minHeap = new MinHeap();
    minHeap.insert({ score: 0, data: { ...start } });

    const visited = new Set();
    const directions = [
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: -1 }
    ];

    while (minHeap.size() > 0) {
        const current = minHeap.extractMin();
        const { x, y, level } = current.data;

        // if already visited, don't try again
        if (visited.has(`${x},${y},${level}`)) continue;
        visited.add(`${x},${y},${level}`);

        // parts 1 and 2 have a different ending than part 3
        if (isPart3) {
            if (x === 0 || x === grid[0].length - 1 || y === 0 || y === grid.length - 1) return current.score;
        } else {
            if (x === end.x && y === end.y) return current.score;
        }
        
        // try all possible directions and update the state accordingly
        for (const dir of directions) {
            const nx = x + dir.x, ny = y + dir.y;
            if (nx < 0 || ny < 0 || ny >= grid.length || nx >= grid[0].length || grid[ny][nx] === '#') continue;

            const newLevel = parseInt(grid[ny][nx]);

            // this accounts for the possible looping by trying both ways and finding the smallest distance
            const timeCost = Math.min(10 - Math.abs(level - newLevel), Math.abs(level - newLevel)) + 1;
            if (!visited.has(`${nx},${ny},${newLevel}`)) {
                minHeap.insert({ score: current.score + timeCost, data: { x: nx, y: ny, level: newLevel } });
            }
        }
    }

    return -1;
}

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    const grid = input.split('\n').map(line => line.split(''));
    let start = null, end = null;

    // parse out start and end points
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === 'S') {
                start = { x, y, level: 0 };
                grid[y][x] = '0';
            }
            if (grid[y][x] === 'E') {
                end = { x, y, level: 0 };
                grid[y][x] = '0';
            }
        }
    }

    return findBestPath(grid, start, end, false);
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    const grid = input.split('\n').map(line => line.split(''));
    let start = null, end = null;

    // parse out start and end points
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === 'S') {
                start = { x, y, level: 0 };
                grid[y][x] = '0';
            }
            if (grid[y][x] === 'E') {
                end = { x, y, level: 0 };
                grid[y][x] = '0';
            }
        }
    }

    return findBestPath(grid, start, end, false);
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 3
 */
const part3 = async input => {
    const grid = input.split('\n').map(line => line.split(''));
    let start = null;

    // instead of the normal start, we use the end as the start and work backwards to find the best path
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === 'S') grid[y][x] = '0';
            if (grid[y][x] === 'E') {
                start = { x, y, level: 0 };
                grid[y][x] = '0';
            }
        }
    }

    return findBestPath(grid, start, null, true);
}

export { part1, part2, part3 };