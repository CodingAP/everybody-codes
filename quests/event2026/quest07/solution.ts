/**
 * quests/event2026/quest07/solution.ts
 * 
 * ~~ The Explouding ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 11/13/2026
 */

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 1
 */
const part1 = (input: string): string => {
    let biggest: string | null = null;
    const clouds = input.trim().split('\n').reduce((obj, line) => {
        const [id, energy, connections] = line.split(', ').map(token => token.split('='));
        obj[id[1]] = { energy: parseInt(energy[1]), connections: connections[1].split(',') };

        if (!biggest || obj[biggest].connections.length < obj[id[1]].connections.length) biggest = id[1];

        return obj;
    }, {} as { [id: string]: { energy: number, connections: string[] }});

    if (!biggest) return 'ERROR';

    let impulses: { id: string, energy: number }[] = [{ id: biggest, energy: 5 }];
    while (impulses.length > 0) {
        let newImpulses: { id: string, energy: number }[] = [];
        for (let i = 0; i < impulses.length; i++) {
            const cloud = clouds[impulses[i].id];
            cloud.energy += impulses[i].energy;

            if (impulses[i].energy !== 1) {
                for (let j = 0; j < cloud.connections.length; j++) {
                    newImpulses.push({ id: cloud.connections[j], energy: impulses[i].energy - 1 });
                }
            }
        }
        impulses = newImpulses;
    }

    return Object.values(clouds).reduce((sum, cloud) => sum + cloud.energy, 0).toString();
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 2
 */
const part2 = (input: string): string => {
    let biggest: string | null = null;
    const clouds = input.trim().split('\n').reduce((obj, line) => {
        const [id, energy, connections] = line.split(', ').map(token => token.split('='));
        obj[id[1]] = { energy: parseInt(energy[1]), connections: connections[1].split(',') };

        if (!biggest || obj[biggest].connections.length < obj[id[1]].connections.length) biggest = id[1];

        return obj;
    }, {} as { [id: string]: { energy: number, connections: string[] }});

    if (!biggest) return 'ERROR';

    let impulses: Map<string, number> = new Map();
    impulses.set(`${biggest},10`, 1);

    while (impulses.size > 0) {
        let newImpulses: Map<string, number> = new Map();

        for (const [key, count] of impulses) {
            const [cloud, amount] = key.split(',');
            const energy = parseInt(amount);

            clouds[cloud].energy += energy * count;

            if (energy !== 1) {
                for (let j = 0; j < clouds[cloud].connections.length; j++) {
                    const id = `${clouds[cloud].connections[j]},${energy - 1}`;
                    newImpulses.set(id, (newImpulses.get(id) ?? 0) + count);
                }
            }
        }

        impulses = newImpulses;
    }

    return Object.values(clouds).reduce((sum, cloud) => sum + cloud.energy, 0).toString();
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 3
 */
const part3 = (input: string): string => {
    const clouds = input.trim().split('\n').reduce((obj, line) => {
        const [id, energy, connections] = line.split(', ').map(token => token.split('='));
        obj[id[1]] = { energy: parseInt(energy[1]), connections: connections[1].split(','), explode: false };

        return obj;
    }, {} as { [id: string]: { energy: number, connections: string[], explode: boolean }});

    const initial = structuredClone(clouds);

    const simulate = (starting: string): number => {
        // reset clouds
        Object.keys(clouds).forEach(cloud => {
            clouds[cloud].energy = initial[cloud].energy;
            clouds[cloud].explode = false;
        });
        
        let impulses: Map<string, number> = new Map();
        impulses.set(`${starting},10`, 1);

        while (impulses.size > 0) {
            let newImpulses: Map<string, number> = new Map();

            for (const [key, count] of impulses) {
                const [cloud, amount] = key.split(',');
                const energy = parseInt(amount);
                if (clouds[cloud].explode) continue;

                clouds[cloud].energy += energy * count;

                if (energy !== 1) {
                    for (let j = 0; j < clouds[cloud].connections.length; j++) {
                        const id = `${clouds[cloud].connections[j]},${energy - 1}`;
                        newImpulses.set(id, (newImpulses.get(id) ?? 0) + count);
                    }
                }
            }

            Object.keys(clouds).forEach(cloud => {
                if (!clouds[cloud].explode && clouds[cloud].energy >= 1000000) {
                    clouds[cloud].explode = true;
                    clouds[cloud].energy = 0;

                    for (let i = 0; i < clouds[cloud].connections.length; i++) {
                        const id = `${clouds[cloud].connections[i]},10`;
                        newImpulses.set(id, (newImpulses.get(id) ?? 0) + 1);
                    }
                }
            });

            impulses = newImpulses;
        }

        return Object.values(clouds).reduce((sum, cloud) => sum + cloud.energy, 0);
    }

    let max = -Infinity;
    Object.keys(clouds).forEach(cloud => {
        max = Math.max(simulate(cloud), max);
    });

    return max.toString();
}

export { part1, part2, part3 };