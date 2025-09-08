/**
 * quests\event2024\quest17\solution.ts
 * 
 * ~~ Galactic Geometry ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 9/8/2025
 */

/**
 * calculates the manhattan distance between two points
 * 
 * @param a point a
 * @param b point b
 * @returns the manhattan distance
 */
const distance = (a: { x: number, y: number }, b: { x: number, y: number }): number => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

/**
 * disjoint set class with weights to find the mst using kruskal's algorithm 
 */
class DisjointSet {
    parent: number[];
    weight: number[];

    constructor(size: number) {
        this.parent = new Array(size).fill(0).map((_, i) => i);
        this.weight = new Array(size).fill(0);
    }
  
    /**
     * get the set's defined node
     * 
     * @param a the specified node
     * @returns the set's defined node
     */
    find(a: number): number {
        if (this.parent[a] !== a) this.parent[a] = this.find(this.parent[a]);
        return this.parent[a];
    }
  
    /**
     * combines the nodes defined by the edge
     * 
     * @param edge the nodes to combine and the weight
     */
    union(edge: { a: number, b: number, weight: number }) {
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
     * @param edge the specified edge 
     * @returns if edge is connected in set
     */
    connected(edge: { a: number, b: number, weight: number }): boolean {
        return this.find(edge.a) === this.find(edge.b);
    }

    /**
     * gets the total weight of the minimum spanning tree that contains the node
     * 
     * @param a the specified node
     * @returns total weight of mst that contains the node
     */
    getWeight(a: number): number {
        return this.weight[this.find(a)];
    }
}

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 1
 */
const part1 = (input: string): string => {
    const grid = input.split('\n').map(line => line.split(''));

    // get all stars' positions
    const stars: { x: number, y: number }[] = [];
    const width = grid[0].length, height = grid.length;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (grid[y][x] === '*') stars.push({ x, y });
        }
    }

    // sort all possible edges
    const edges: { a: number, b: number, weight: number }[] = [];
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

    return (set.getWeight(0) + stars.length).toString();
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 2
 */
const part2 = (input: string): string => {
    const grid = input.split('\n').map(line => line.split(''));

    // get all stars' positions
    const stars: { x: number, y: number }[] = [];
    const width = grid[0].length, height = grid.length;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (grid[y][x] === '*') stars.push({ x, y });
        }
    }

    // sort all possible edges
    const edges: { a: number, b: number, weight: number }[] = [];
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

    return (set.getWeight(0) + stars.length).toString();
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 3
 */
const part3 = (input: string): string => {
    const grid = input.split('\n').map(line => line.split(''));

    // get all stars' positions
    const stars: { x: number, y: number }[] = [];
    const width = grid[0].length, height = grid.length;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (grid[y][x] === '*') stars.push({ x, y });
        }
    }

    // sort all possible edges
    // only allow connection if distance is smaller than 6
    const edges: { a: number, b: number, weight: number }[] = [];
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

    return (sizes[0] * sizes[1] * sizes[2]).toString();
}

export { part1, part2, part3 };