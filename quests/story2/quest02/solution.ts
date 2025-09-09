/**
 * quests\story2\quest02\solution.ts
 * 
 * ~~ The Pocket-Money Popper ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 9/9/2025
 */

/**
 * list of bolts to be shot in order and a cycle
 */
const BOLTS = ['R', 'G', 'B'];

/**
 * doubly linked list node for the deque 
 */
interface DequeNode {
    value: string;
    next: DequeNode | null;
    previous: DequeNode | null;
}

/**
 * double-ended queue implementation
 */
class Deque {
    private front: DequeNode | null = null;
    private back: DequeNode | null = null;
    private size = 0;

    /**
     * adds a element to the back of the deque
     * 
     * @param value value to add to deque
     */
    addBack(value: string) {
        const newNode: DequeNode = { value, next: null, previous: this.back };

        if (!this.back) {
            this.front = newNode;
            this.back = newNode;
        } else {
            this.back.next = newNode;
            this.back = newNode;
        }

        this.size++;
    }

    /**
     * tries to remove the front element and return it
     */
    removeFront(): string | null {
        if (!this.front) return null;

        const value = this.front.value;

        if (this.front === this.back) {
            // One node in deque
            this.front = this.back = null;
        } else {
            this.front = this.front.next;
            if (this.front) this.front.previous = null;
        }

        this.size--;

        return value;
    }

    /**
     * checks if the deque is empty
     */
    isEmpty(): boolean {
        return this.front === null;
    }

    /**
     * gets the size of the deque
     */
    getSize(): number {
        return this.size;
    }
}

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 1
 */
const part1 = (input: string): string => {
    const balloons = input.split('');
    
    let times = 0;
    while (balloons.length > 0) {
        const balloon = balloons.shift();

        if (BOLTS[times % BOLTS.length] !== balloon) times++;
    }

    return times.toString();
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 2
 */
const part2 = (input: string): string => {
    // repeat the balloons 100 times
    const balloons = new Array<string>(input.length * 100);
    for (let i = 0; i < balloons.length; i++) balloons[i] = input[i % input.length];

    let times = 0;
    while (balloons.length > 0) {
        // remove balloon on top of circle
        const balloon1 = balloons.splice(0, 1)[0];

        // if we can keep going and there is a balloon on the other side, remove it as well
        if (BOLTS[times % BOLTS.length] === balloon1 && balloons.length % 2 === 1) {
            balloons.splice((balloons.length - 1) / 2, 1)[0];
        }

        // also change bolts after shot
        times++;
    }

    return times.toString();
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 3
 */
const part3 = (input: string): string => {
    // treat each half as a separate deque
    const left = new Deque();
    const right = new Deque();
    for (let i = 0; i < input.length * 50000; i++) {
        left.addBack(input[i % input.length]);
        right.addBack(input[i % input.length]);
    }

    let times = 0;
    while (!left.isEmpty()) {
        // remove balloon on top of circle
        const balloon = left.removeFront();

        // if a balloon can be popped on the other side, pop other balloon as well
        if (BOLTS[times % BOLTS.length] === balloon && (left.getSize() + right.getSize()) % 2 === 1) right.removeFront();
        // if it doesn't, move to other side to not mess with
        else if (left.getSize() < right.getSize()) left.addBack(right.removeFront() as string); 

        // also change bots after shot
        times++;
    }

    return times.toString();
}

export { part1, part2, part3 };