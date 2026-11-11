/**
 * quests/event2026/quest04/solution.ts
 * 
 * ~~ The Rankening ~~
 * this is my solution for this everybody.codes quest
 * 
 * by alex prosser
 * 11/11/2026
 */

interface UserResults { id: number, quest: number, part: number, time: number };

/**
 * code for part 1 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 1
 */
const part1 = (input: string): string => {
    const users: { [key: string]: { quest: number, part: number, time: number }[] } = {};
    input.trim().split('\n').forEach(line => {
        const vote = line.split(' ').reduce((obj, element) => {
            const [left, right] = element.split('=');
            obj[left as keyof UserResults] = parseInt(right);
            return obj;
        }, {} as UserResults);

        if (users[vote.id] === undefined) users[vote.id] = [];
        users[vote.id].push(vote);
    });

    const sorted = Object.keys(users).map(id => {
        return users[id].reduce((sum, result) => sum + result.time, 0);
    }).sort((a, b) => a - b);

    return sorted.reduce((sum, time, index) => {
        return sum + time * (index + 1)
    }, 0).toString();
}

/**
 * code for part 2 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 2
 */
const part2 = (input: string): string => {
    const users: { [key: string]: { quest: number, part: number, time: number }[] } = {};
    input.trim().split('\n').forEach(line => {
        const vote = line.split(' ').reduce((obj, element) => {
            const [left, right] = element.split('=');
            obj[left as keyof UserResults] = parseInt(right);
            return obj;
        }, {} as UserResults);

        if (users[vote.id] === undefined) users[vote.id] = [];
        users[vote.id].push(vote);
    });

    const sorted = Object.keys(users).map(id => {
        return {
            time: users[id].reduce((sum, result) => sum + result.time, 0),
            parts: users[id].length
        };
    }).sort((a, b) => {
        if (a.parts === b.parts) return a.time - b.time;
        return b.parts - a.parts;
    });

    return sorted.reduce((sum, user, index) => {
        return sum + user.time * (index + 1)
    }, 0).toString();
}

/**
 * code for part 3 of the everybody.codes quest
 * 
 * @param input input for the given part 
 * @returns the result of part 3
 */
const part3 = (input: string): string => {
    const users: { [key: string]: number } = {};
    const results: UserResults[] = [];

    let biggestQuest = -Infinity;
    input.trim().split('\n').forEach(line => {
        const vote = line.split(' ').reduce((obj, element) => {
            const [left, right] = element.split('=');
            obj[left as keyof UserResults] = parseInt(right);
            return obj;
        }, {} as UserResults);

        if (users[vote.id] === undefined) users[vote.id] = 0;
        results.push(vote);

        biggestQuest = Math.max(biggestQuest, vote.quest);
    });

    // calculate each points after each part
    const partPoints = [0, 50, 100, 150];
    for (let quest = 1; quest <= biggestQuest; quest++) {
        const accumlatedTime: { [key: string]: number } = {};
        for (let part = 1; part <= 3; part++) {
            const filtered = results.filter(result => result.quest === quest && result.part === part);
            if (filtered.length === 0) continue;

            // accumulate all time for the quest
            const currentTime: { [key: string]: number } = {};
            for (let i = 0; i < filtered.length; i++) {
                currentTime[filtered[i].id] = (accumlatedTime[filtered[i].id] ?? 0) + filtered[i].time;
            }

            const usersCompeting = Object.keys(currentTime).sort((a, b) => currentTime[a] - currentTime[b]);

            for (let i = 0; i < usersCompeting.length; i++) {
                const place = i;
                users[usersCompeting[i]] += Math.max(0, partPoints[part] - place);

                // ties share the same place
                while (i < usersCompeting.length - 1 &&
                    currentTime[usersCompeting[i + 1]] === currentTime[usersCompeting[i]]) {
                    users[usersCompeting[++i]] += Math.max(0, partPoints[part] - place);
                }
            }

            // carry the combined time forward to the next part
            for (const id of usersCompeting) accumlatedTime[id] = currentTime[id];
        }
    }

    let checksum = 0;
    const userTimes = Object.values(users).sort((a, b) => b - a);
    for (let i = 0; i < userTimes.length; i++) {
        const place = i + 1;
        checksum += place * userTimes[i];

        // check for ties
        if (i != userTimes.length - 1) {
            while (userTimes[i + 1] === userTimes[i]) {
                checksum += place * userTimes[++i];
            }
        }
    }
    return checksum.toString();
}

export { part1, part2, part3 };