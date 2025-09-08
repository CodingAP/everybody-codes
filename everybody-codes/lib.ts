/**
 * everybody-codes/lib.ts
 *
 * this handles the interactions between the everybody.codes manager and the website
 *
 * by alex prosser
 * 8/28/2025
 */

import { EncryptionKeys, Inputs } from './types.ts';
import { decodeHex } from '@std/encoding';
import { join, resolve } from '@std/path';
import { exists } from '@std/fs';

const baseDirectory = resolve('./');

/**
 * headers for the fetch request
 * right now it is just the cookie for the account used
 */
const FETCH_HEADERS = {
    Cookie: `everybody-codes=${Deno.env.get('SESSION')}`,
    'User-Agent': 'discord:excellentap https://github.com/CodingAP/everybody-codes'
};

/**
 * gets the path of the solution directory
 *
 * @param quest quest number of the story/event
 * @param id id of the story/event (>=2024: event, everything else is story)
 * @returns path of the solution directory
 */
const getSolutionDirectory = (quest: string, id: string) => {
    return join(
        baseDirectory,
        '../',
        'quests',
        `${(parseInt(id) < 2024) ? 'story' : 'event'}${id}`,
        `quest${quest.padStart(2, '0')}`,
    );
};

/**
 * gets the associated seed with a user's cookie
 * 
 * @returns seed from the user profile
 */
const getUserSeed = async (): Promise<number> => {
    // fetch the specific user's seed
    const response = await fetch(`https://everybody.codes/api/user/me`, { headers: FETCH_HEADERS });
    const user = await response.json();
    return user.seed;
};

/**
 * gets the encryptions keys to decrypt the content from everybody.codes
 * 
 * @param quest quest number of the story/event
 * @param id id of the story/event (>=2024: event, everything else is story)
 * @return the encryption keys needed for the inputs and title
 */
const getEncryptionKeys = async (quest: string, id: string): Promise<EncryptionKeys> => {
    // fetch the specific user's encryption keys
    const response = await fetch(`https://everybody.codes/api/event/${id}/quest/${quest}`, { headers: FETCH_HEADERS });
    return await response.json();
};

/**
 * decrypted an aes encrypted with the given key
 * the iv is created from the key
 * 
 * @param encrypted encrypted text to decrypt
 * @param key key to decrypt the text with
 * @returns decrypted text
 */
const decryptText = async (encrypted: string, key: string): Promise<string> => {
    // create the key object
    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(key),
        'AES-CBC',
        false,
        ['decrypt']
    );

    // decrypt the hex-encoded text
    const data = await crypto.subtle.decrypt(
        { name: 'AES-CBC', iv: new TextEncoder().encode(key.substring(0, 16)) },
        cryptoKey,
        decodeHex(encrypted)
    );

    // return the data in utf-8 encoding
    return new TextDecoder().decode(data);
};

/**
 * gets the title from the specified quest and decrypts it with the provided keys
 * 
 * @param quest quest number of the story/event
 * @param id id of the story/event (>=2024: event, everything else is story)
 * @return the decrypted title
 */
const getTitle = async (quest: string, id: string): Promise<string> => {
    // get needed information to fetch correct data
    const keys = await getEncryptionKeys(quest, id);

    // fetch the specific quest's title
    const response = await fetch(`https://everybody-codes.b-cdn.net/assets/${id}/${quest}/description.json`);
    const json = await response.json();

    // decrypt it or return nothing
    return (keys.key1) ? decryptText(json.title, keys.key1) : 'no title available';
};

/**
 * gets the inputs from the specified quest and decrypts it with the provided keys
 * 
 * @param quest quest number of the story/event
 * @param id id of the story/event (>=2024: event, everything else is story)
 * @return all possible inputs (some are unavailable until you unlock them)
 */
const getAllInputs = async (quest: string, id: string): Promise<Inputs> => {
    // get needed information to fetch correct data
    const seed = await getUserSeed();
    const keys = await getEncryptionKeys(quest, id);

    // fetch the specific user's input
    const response = await fetch(`https://everybody-codes.b-cdn.net/assets/${id}/${quest}/input/${seed}.json`);
    const json = await response.json();

    // return the decrypted object or empty object if no keys are provided
    return {
        input1: (keys.key1) ? await decryptText(json['1'], keys.key1) : 'no input available!',
        input2: (keys.key2) ? await decryptText(json['2'], keys.key2) : 'no input available!',
        input3: (keys.key3) ? await decryptText(json['3'], keys.key3) : 'no input available!',
    }
}

/**
 * gets all the needed content to generate a solution folder for the specified quest
 * 
 * generates the following structure:
 * - quests/(story|event)(id)/(quest)
 *   - inputs
 *     - input1.txt
 *     - input2.txt
 *     - input3.txt
 *   - solution.ts
 * 
 * @param quest quest number of the story/event
 * @param id id of the story/event (>=2024: event, everything else is story)
 */
const getQuest = async (quest: string, id: string) => {
    // read all sources
    const inputs = await getAllInputs(quest, id);
    const templateScript = await Deno.readTextFile('./templates/solution.ts');
    const solutionDirectory = getSolutionDirectory(quest, id);

    // if directory doesn't exist, generate folders
    if (!(await exists(solutionDirectory))) {
        await Deno.mkdir(join(solutionDirectory, 'inputs'), { recursive: true });
    }

    const filePath = join(
        'quests',
        `${(parseInt(id) < 2024) ? 'story' : 'event'}${id}`,
        `quest${quest.padStart(2, '0')}`,
    );

    // generate the template script
    const title = await getTitle(quest, id);
    const today = new Date();
    const script = templateScript
        .replace(/%TITLE%/g, title)
        .replace(/%PATH%/g, join(filePath, 'solution.ts'))
        .replace(/%DATE%/g, `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`);

    // write the files necessary
    await Deno.writeTextFile(join(solutionDirectory, 'inputs/input1.txt'), inputs.input1);
    await Deno.writeTextFile(join(solutionDirectory, 'inputs/input2.txt'), inputs.input2);
    await Deno.writeTextFile(join(solutionDirectory, 'inputs/input3.txt'), inputs.input3);
    await Deno.writeTextFile(join(solutionDirectory, 'solution.ts'), script);
}

/**
 * gets all the inputs for the specified quest
 * used to easily clone the git repo as inputs are not stored there
 * 
 * @param quest quest number of the story/event
 * @param id id of the story/event (>=2024: event, everything else is story)
 */
const updateQuest = async (quest: string, id: string) => {
    const solutionDirectory = getSolutionDirectory(quest, id);

    // if directory doesn't exist, generate folders
    if (!(await exists(solutionDirectory))) {
        await Deno.mkdir(join(solutionDirectory, 'inputs'), { recursive: true });
    }

    // read all sources
    const inputs = await getAllInputs(quest, id);

    // write the files necessary
    await Deno.writeTextFile(join(solutionDirectory, 'inputs/input1.txt'), inputs.input1);
    await Deno.writeTextFile(join(solutionDirectory, 'inputs/input2.txt'), inputs.input2);
    await Deno.writeTextFile(join(solutionDirectory, 'inputs/input3.txt'), inputs.input3);
}

/**
 * runs the specified quest with the inputs provided in the solution folder
 * 
 * @param quest quest number of the story/event
 * @param id id of the story/event (>=2024: event, everything else is story)
 * @param part specific part(s) to run
 * @returns quest results or error
 */
const runQuest = async (quest: string, id: string, part: string): Promise<{ error: true, message: string } | { error: false, part1: string, part2: string, part3: string }> => {
    const solutionDirectory = getSolutionDirectory(quest, id);

    // if directory doesn't exist, generate folders
    if (!(await exists(solutionDirectory))) {
        return { error: true, message: `this quest hasn't been generated yet! run 'fetch --quest=${quest} --id=${id}' first!` };
    }

    // grab the code and input
    const { part1, part2, part3 } = await import(join('file://', solutionDirectory, 'solution.ts'));
    const input1 = (await Deno.readTextFile(join(solutionDirectory, 'inputs/input1.txt'))).toString();
    const input2 = (await Deno.readTextFile(join(solutionDirectory, 'inputs/input2.txt'))).toString();
    const input3 = (await Deno.readTextFile(join(solutionDirectory, 'inputs/input3.txt'))).toString();

    // run the code based off which part to run
    const results = { part1: 'N/A', part2: 'N/A', part3: 'N/A' };

    if (part === '1' || part === 'all') {
        results.part1 = await part1(input1.replace(/\r/g, ''));
    }

    if (part === '2' || part === 'all') {
        results.part2 = await part2(input2.replace(/\r/g, ''));
    }

    if (part === '3' || part === 'all') {
        results.part3 = await part3(input3.replace(/\r/g, ''));
    }

    return { error: false, ...results };
}

/**
 * runs the specific quest and stores the results and timing in a README file
 * 
 * @param quest quest number of the story/event
 * @param id id of the story/event (>=2024: event, everything else is story)
 * @param iterations how many iterations the profiler needs to run
 * @returns returns if there is an error or not
 */
const profileQuest = async (quest: string, id: string, iterations: number): Promise<{ error: true, message: string } | { error: false }> => {
    const solutionDirectory = getSolutionDirectory(quest, id);

    // if directory doesn't exist, generate folders
    if (!(await exists(solutionDirectory))) {
        return { error: true, message: `this quest hasn't been generated yet! run 'fetch --quest=${quest} --id=${id}' first!` };
    }

    // grab the code and input
    const { part1, part2, part3 } = await import(join('file://', solutionDirectory, 'solution.ts'));
    const input1 = (await Deno.readTextFile(join(solutionDirectory, 'inputs/input1.txt'))).toString();
    const input2 = (await Deno.readTextFile(join(solutionDirectory, 'inputs/input2.txt'))).toString();
    const input3 = (await Deno.readTextFile(join(solutionDirectory, 'inputs/input3.txt'))).toString();

    /**
     * times a specific part of the solution with the given and returns the results
     * 
     * @param part specific part from the solution file
     * @param input specific input for the part
     * @returns the results and timing to be display in a readme file
     */
    const timeResults = async (part: (input: string) => Promise<string>, input: string) => {
        let results = 'N/A', time = 0;
        for (let i = 0; i < iterations; i++) {
            const start = performance.now();
            results = await part(input.replace(/\r/g, ''));
            const end = performance.now();

            time += end - start;
        }

        return { results, time };
    }

    // time part1
    const part1Results = await timeResults(part1, input1);
    const part2Results = await timeResults(part2, input2);
    const part3Results = await timeResults(part3, input3);

    // generate the readme file
    const templateReadme = await Deno.readTextFile('./templates/README.md');
    const title = await getTitle(quest, id);

    const readme = templateReadme
        .replace(/%TYPE%/g, (parseInt(id) < 2024) ? 'story' : 'event')
        .replace(/%TYPE_CAP%/g, (parseInt(id) < 2024) ? 'Story' : 'Event')
        .replace(/%ID%/g, id)
        .replace(/%QUEST%/g, quest)
        .replace(/%TITLE%/g, title)
        .replace(/%PART1_RESULT%/g, part1Results.results)
        .replace(/%PART1_TIME%/g, (part1Results.time / iterations).toFixed(2))
        .replace(/%PART2_RESULT%/g, part2Results.results)
        .replace(/%PART2_TIME%/g, (part2Results.time / iterations).toFixed(2))
        .replace(/%PART3_RESULT%/g, part3Results.results)
        .replace(/%PART3_TIME%/g, (part3Results.time / iterations).toFixed(2));

    await Deno.writeTextFile(join(solutionDirectory, 'README.md'), readme);

    return { error: false };
} 

export { getQuest, profileQuest, runQuest, updateQuest };