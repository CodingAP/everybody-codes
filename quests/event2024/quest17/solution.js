/**
 * quests\2024\quest17\solution.js
 * 
 * ~~ no title available ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 11/26/2024
 */

/**
 * calculates the manhattan distance between two points
 * 
 * @param {{ x: number, y: number }} a point a
 * @param {{ x: number, y: number }} b point b
 * @returns {number} the manhattan distance
 */
const distance = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

/**
 * disjoint set class with weights to find the mst using kruskal's algorithm 
 */
class DisjointSet {
    constructor(size) {
        this.parent = new Array(size).fill(0).map((_, i) => i);
        this.weight = new Array(size).fill(0);
    }
  
    /**
     * get the set's defined node
     * 
     * @param {number} a the specified node
     * @returns {number} the set's defined node
     */
    find(a) {
        if (this.parent[a] !== a) this.parent[a] = this.find(this.parent[a]);
        return this.parent[a];
    }
  
    /**
     * combines the nodes defined by the edge
     * 
     * @param {{ a: number, b: number, weight: number }} edge the nodes to combine and the weight
     */
    union(edge) {
        const a = this.find(edge.a);
        const b = this.find(edge.b);
  
        if (a !== b) {
            if (a > b) {
                this.parent[a] = b;
                this.weight[b] += this.weight[a] + edge.weight;
            } else {
                this.parent[b] = a;
                this.weight[a] += this.weight[b] + edge.weight;
            }
        }
    }
  
    /**
     * returns if an edge is already connected in the set
     * 
     * @param {{ a: number, b: number, weight: number }} edge the specified edge 
     * @returns {boolean} if edge is connected in set
     */
    connected(edge) {
        return this.find(edge.a) === this.find(edge.b);
    }

    /**
     * gets the total weight of the minimum spanning tree that contains the node
     * 
     * @param {number} a the specified node
     * @returns {number} total weight of mst that contains the node
     */
    getWeight(a) {
        return this.weight[this.find(a)];
    }
}

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    const grid = input.split('\n').map(line => line.split(''));

    // get all stars' positions
    const stars = [];
    const width = grid[0].length, height = grid.length;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (grid[y][x] === '*') stars.push({ x, y });
        }
    }

    // sort all possible edges
    const edges = [];
    for (let i = 0; i < stars.length; i++) {
        for (let j = 0; j < stars.length; j++) {
            if (i === j) continue;
            edges.push({ a: i, b: j, weight: distance(stars[i], stars[j]) });
        }
    }

    edges.sort((a, b) => a.weight - b.weight);

    // run kruskal's algorithm to find the minimum spanning tree
    const set = new DisjointSet(stars.length);
    for (let i = 0; i < edges.length; i++) {
        if (set.connected(edges[i])) continue;
        set.union(edges[i]);
    }

    return set.getWeight(0) + stars.length;
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    const grid = input.split('\n').map(line => line.split(''));

    // get all stars' positions
    const stars = [];
    const width = grid[0].length, height = grid.length;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (grid[y][x] === '*') stars.push({ x, y });
        }
    }

    // sort all possible edges
    const edges = [];
    for (let i = 0; i < stars.length; i++) {
        for (let j = 0; j < stars.length; j++) {
            if (i === j) continue;
            edges.push({ a: i, b: j, weight: distance(stars[i], stars[j]) });
        }
    }

    edges.sort((a, b) => a.weight - b.weight);

    // run kruskal's algorithm to find the minimum spanning tree
    const set = new DisjointSet(stars.length);
    for (let i = 0; i < edges.length; i++) {
        if (set.connected(edges[i])) continue;
        set.union(edges[i]);
    }

    return set.getWeight(0) + stars.length;
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 3
 */
const part3 = async input => {
    const grid = input.split('\n').map(line => line.split(''));

    // get all stars' positions
    const stars = [];
    const width = grid[0].length, height = grid.length;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (grid[y][x] === '*') stars.push({ x, y });
        }
    }

    // sort all possible edges
    // only allow connection if distance is smaller than 6
    const edges = [];
    for (let i = 0; i < stars.length; i++) {
        for (let j = 0; j < stars.length; j++) {
            if (i === j) continue;
            const dist = distance(stars[i], stars[j]);
            if (dist < 6) edges.push({ a: i, b: j, weight: dist });
        }
    }

    edges.sort((a, b) => a.weight - b.weight);

    // run kruskal's algorithm to find all minimum spanning trees in graph
    const set = new DisjointSet(stars.length);
    for (let i = 0; i < edges.length; i++) {
        if (set.connected(edges[i])) continue;
        set.union(edges[i]);
    }

    // find three biggest constellation sizes
    const sizes = new Array(stars.length).fill(0);
    for (let i = 0; i < sizes.length; i++) {
        sizes[set.find(i)]++;
        sizes[i] += set.getWeight(i);
    }
    sizes.sort((a, b) => b - a);

    return sizes[0] * sizes[1] * sizes[2];
}

export { part1, part2, part3 };