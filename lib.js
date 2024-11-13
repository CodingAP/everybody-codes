/**
 * lib.js
 * 
 * this handles the interactions between the everybody.codes manager and the everybody.codes website
 * 
 * by alex prosser
 * 11/13/2024
 */

import CryptoJS from 'crypto-js';
import 'dotenv/config';
import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * base directory for all the code and solutions
 */
const baseDirectory = path.resolve('./');

/**
 * headers for the fetch request
 * right now it is just the cookie for the account used
 */
const FETCH_HEADERS = {
    Cookie: `everybody-codes=${process.env.SESSION}`,
    'User-Agent': 'discord:excellentap https://github.com/CodingAP/everybody-codes'
};

/**
 * checks to see if a file/directory exists or not
 * 
 * @param {string} path 
 * @returns {Promise<boolean>} if the file/directory exists or not
 */
const checkForExistance = async path => {
    // stat throws an error if the file/directory doesn't exist, so catch it if it happens
    try {
        await fs.stat(path);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * gets the associated seed with a user's cookie
 * 
 * @returns {Promise<number>} 
 */
const getUserSeed = async () => {
    // fetch the specific user's seed
    const response = await fetch(`https://everybody.codes/api/user/me`, { headers: FETCH_HEADERS });
    const user = await response.json();
    return user.seed;
}

/**
 * gets the encryptions keys to decrypt the content from everybody.codes
 * 
 * @param {string} quest number of quest to get 
 * @param {string} year year of event to get
 * @returns {Promise<{ key1: string, key2: string, key3: string }>} the keys attached to the quest
 */
const getEncryptionKeys = async (quest, year) => {
    // fetch the specific user's encryption keys
    const response = await fetch(`https://everybody.codes/api/event/${year}/quest/${quest}`, { headers: FETCH_HEADERS });
    return await response.json();
}

/**
 * gets the title from the specified quest and decrypts it with the provided keys
 * 
 * @param {string} quest number of quest to get 
 * @param {string} year year of event to get 
 * @returns {Promise<string>} decrypted title string
 */
const getTitle = async (quest, year) => {
    // get needed information to fetch correct data
    const keys = await getEncryptionKeys(quest, year);

    // fetch the specific quest's title
    const response = await fetch(`https://everybody-codes.b-cdn.net/assets/${year}/${quest}/description.json`);
    const json = await response.json();

    // decrypt it
    return decryptText(json.title, keys.key1);
}

/**
 * gets the inputs from the specified quest and decrypts it with the provided keys
 * 
 * @param {string} quest number of quest to get 
 * @param {string} year year of event to get 
 * @returns {Promis<{ input1: string, input2: string, input3: string }>} decrypted input strings  
 */
const getAllInputs = async (quest, year) => {
    // get needed information to fetch correct data
    const seed = await getUserSeed();
    const keys = await getEncryptionKeys(quest, year);

    // fetch the specific user's input
    const response = await fetch(`https://everybody-codes.b-cdn.net/assets/${year}/${quest}/input/${seed}.json`);
    const json = await response.json();

    // return the decrypted object
    return {
        input1: decryptText(json['1'], keys.key1),
        input2: decryptText(json['2'], keys.key2),
        input3: decryptText(json['3'], keys.key3)
    }
}

/**
 * decrypted an aes encrypted with the given key
 * the iv is created from the key
 * 
 * this is taken from the everybody.codes website
 * 
 * @param {string} ciphertext encrypted text to decrypt
 * @param {string} keyString key to decrypt the text with
 * @returns {string} decrypted text
 */
const decryptText = (ciphertext, keyString) => {
    // modify the key to the exact same one from the website
    const keyArray = keyString.split('');
    keyArray[20] = '~';
    const modifiedKey = keyArray.join('');

    // create the key and iv using the keyString
    const key = CryptoJS.enc.Utf8.parse(modifiedKey);
    const iv = CryptoJS.enc.Utf8.parse(modifiedKey.substring(0, 16));

    // decrypt the text with the same settings
    const decrypted = CryptoJS.AES.decrypt(
        { ciphertext: CryptoJS.enc.Hex.parse(ciphertext) },
        key,
        { iv: iv }
    );

    return decrypted.toString(CryptoJS.enc.Utf8);
}

/**
 * gets all the needed content to generate a solution folder for the specified quest
 * 
 * generates the following structure:
 * - quests/YEAR/QUEST
 *   - inputs
 *     - input1.txt
 *     - input2.txt
 *     - input3.txt
 *   - solution.js 
 * 
 * @param {string} quest number of quest to get 
 * @param {string} year year of event to get 
 */
const getQuest = async (quest, year) => {
    // read all sources
    const inputs = await getAllInputs(quest, year);
    const templateScript = await fs.readFile(path.join(baseDirectory, 'templates/solution.js'), { encoding: 'utf8' });
    const solutionDirectory = path.join(baseDirectory, 'quests', year, `quest${quest.padStart(2, '0')}`);
    const exists = await checkForExistance(solutionDirectory);

    // if directory doesn't exist, throw error
    if (!exists) {
        await fs.mkdir(path.join(solutionDirectory, 'inputs'), { recursive: true });
    }

    // generate the template script
    const title = await getTitle(quest, year);
    const today = new Date();
    const script = templateScript
        .replace(/%TITLE%/g, title)
        .replace(/%PATH%/g, path.join('quests', year, `quest${quest.padStart(2, '0')}`, 'solution.js'))
        .replace(/%DATE%/g, `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`);

    // write the files necessary
    await fs.writeFile(path.join(solutionDirectory, 'inputs/input1.txt'), inputs.input1);
    await fs.writeFile(path.join(solutionDirectory, 'inputs/input2.txt'), inputs.input2);
    await fs.writeFile(path.join(solutionDirectory, 'inputs/input3.txt'), inputs.input3);
    await fs.writeFile(path.join(solutionDirectory, 'solution.js'), script);
}

/**
 * runs the specified quest with the inputs provided in the solution folder
 * 
 * @param {string} quest number of quest to get 
 * @param {string} year year of event to get 
 * @param {string} part specific part(s) to run
 * @returns {Promise<{ error: true, message: string } | { error: false, part1: string, part2: string, part3: string }>} quest results or error
 */
const runQuest = async (quest, year, part) => {
    const solutionDirectory = path.join(baseDirectory, 'quests', year, `quest${quest.padStart(2, '0')}`);
    const exists = await checkForExistance(solutionDirectory);

    // if directory doesn't exist, throw error
    if (!exists) {
        return { error: true, message: `this quest hasn't been generated yet! run 'fetch --quest=${day} --year=${year}' first!` };
    }

    // grab the code and input
    const { part1, part2, part3 } = await import(path.join('file://', solutionDirectory, 'solution.js'));
    const input1 = (await fs.readFile(path.join(solutionDirectory, 'inputs/input1.txt'))).toString();
    const input2 = (await fs.readFile(path.join(solutionDirectory, 'inputs/input2.txt'))).toString();
    const input3 = (await fs.readFile(path.join(solutionDirectory, 'inputs/input3.txt'))).toString();

    // run the code based off which part to run
    let results = { part1: 'N/A', part2: 'N/A', part3: 'N/A' };

    if (part == '1' || part == 'all') {
        results.part1 = await part1(input1);
    }

    if (part == '2' || part == 'all') {
        results.part2 = await part2(input2);
    }

    if (part == '3' || part == 'all') {
        results.part3 = await part3(input3);
    }

    return { error: false, ...results };
}

/**
 * runs the specific quest and stores the results and timing in a README file
 * 
 * @param {string} quest number of quest to get 
 * @param {string} year year of event to get 
 * @returns {Promise<{ error: true, message: string } | { error: false }>} returns if there is an error or not
 */
const profileQuest = async (quest, year) => {
    const solutionDirectory = path.join(baseDirectory, 'quests', year, `quest${quest.padStart(2, '0')}`);
    const exists = await checkForExistance(solutionDirectory);

    // if directory doesn't exist, throw error
    if (!exists) {
        return { error: true, message: `this quest hasn't been generated yet! run 'fetch --day=${quest} --year=${year}' first!` };
    }

    // grab the code and input
    const { part1, part2, part3 } = await import(path.join('file://', solutionDirectory, 'solution.js'));
    const input1 = (await fs.readFile(path.join(solutionDirectory, 'inputs/input1.txt'))).toString();
    const input2 = (await fs.readFile(path.join(solutionDirectory, 'inputs/input2.txt'))).toString();
    const input3 = (await fs.readFile(path.join(solutionDirectory, 'inputs/input3.txt'))).toString();

    // time part1
    const codeRunTimes = 10;
    let part1Result, part2Result, part3Result;
    let part1Time = 0, part2Time = 0, part3Time = 0;
    for (let i = 0; i < codeRunTimes; i++) {
        let start = performance.now();
        part1Result = await part1(input1);
        let end = performance.now();

        part1Time += end - start;
    }

    // time part2
    for (let i = 0; i < codeRunTimes; i++) {
        let start = performance.now();
        part2Result = await part2(input2);
        let end = performance.now();

        part2Time += end - start;
    }

    // time part3
    for (let i = 0; i < codeRunTimes; i++) {
        let start = performance.now();
        part3Result = await part3(input3);
        let end = performance.now();

        part3Time += end - start;
    }

    // generate the readme file
    const templateReadme = await fs.readFile(path.join(baseDirectory, 'templates/README.md'), { encoding: 'utf8' });
    const title = await getTitle(quest, year);

    const readme = templateReadme
        .replace(/%YEAR%/g, year)
        .replace(/%QUEST%/g, quest)
        .replace(/%TITLE%/g, title)
        .replace(/%PART1_RESULT%/g, part1Result)
        .replace(/%PART1_TIME%/g, (part1Time / codeRunTimes).toFixed(2))
        .replace(/%PART2_RESULT%/g, part2Result)
        .replace(/%PART2_TIME%/g, (part2Time / codeRunTimes).toFixed(2))
        .replace(/%PART3_RESULT%/g, part3Result)
        .replace(/%PART3_TIME%/g, (part3Time / codeRunTimes).toFixed(2));

    await fs.writeFile(path.join(solutionDirectory, 'README.md'), readme);

    return { error: false };
} 

export { getQuest, profileQuest, runQuest };
