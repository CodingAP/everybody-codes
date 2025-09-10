/**
 * everybody-codes/main.ts
 * 
 * this handles the command line interface for the everybody.codes manager
 * 
 * by alex prosser
 * 8/28/2025
 */

import { getQuest, runQuest, profileQuest, updateQuest } from './lib.ts';
import { ArgumentInfo, CommandArguments, CommandInfo } from "./types.ts";

const RED_COLOR = '\x1b[31m';
const GREEN_COLOR = '\x1b[32m';
const YELLOW_COLOR = '\x1b[33m';
const DEFAULT_COLOR = '\x1b[0m';

/**
 * all the commands and arguments to run the advent of code manager
 * 
 * @type {{ commands: Record<string, CommandInfo>, arguments: Record<string, ArgumentInfo> }}
 */
const commandLineInfo: { commands: { [command: string]: CommandInfo }, arguments: { [argument: string]: ArgumentInfo } } = {
    commands: {
        fetch: {
            aliases: ['f'],
            description: 'gets the inputs and creates new solution folder for the quest.',
            arguments: ['quest', 'id'],
            command: args => {
                getQuest(args.quest!, args.id!)
                    .then(() => {
                        console.log(`${RED_COLOR}manager: ${GREEN_COLOR}generated folder for quest ${YELLOW_COLOR}${args.quest!}${GREEN_COLOR}, ${(parseInt(args.id!) < 2024) ? 'story' : 'event'} ${YELLOW_COLOR}${args.id!}${GREEN_COLOR}!${DEFAULT_COLOR}\n`);
                    });
            }
        },
        run: {
            aliases: ['r'],
            description: 'runs the solution and outputs the results',
            arguments: ['quest', 'id', 'part'],
            command: args => {
                console.log(`${RED_COLOR}manager: ${GREEN_COLOR}running solution for quest ${YELLOW_COLOR}${args.quest!}${GREEN_COLOR}, ${(parseInt(args.id!) < 2024) ? 'story' : 'event'} ${YELLOW_COLOR}${args.id!}${GREEN_COLOR}!${DEFAULT_COLOR}`);
                runQuest(args.quest!, args.id!, args.part!)
                    .then(results => {
                        if (results.error) {
                            console.log(`${RED_COLOR}manager: error - ${results.message}${DEFAULT_COLOR}`);
                            console.log();
                        } else {
                            console.log(`${RED_COLOR}manager: ${GREEN_COLOR}part 1 - ${YELLOW_COLOR}${results.part1}${DEFAULT_COLOR}`);
                            console.log(`${RED_COLOR}manager: ${GREEN_COLOR}part 2 - ${YELLOW_COLOR}${results.part2}${DEFAULT_COLOR}`);
                            console.log(`${RED_COLOR}manager: ${GREEN_COLOR}part 3 - ${YELLOW_COLOR}${results.part3}${DEFAULT_COLOR}`);
                            console.log();
                        }
                    });
            }
        },
        profile: {
            aliases: ['p'],
            description: 'test the run time and accuracy of the quest specified.',
            arguments: ['quest', 'id', 'iterations'],
            command: args => {
                console.log(`${RED_COLOR}manager: ${GREEN_COLOR}profiling solution for quest ${YELLOW_COLOR}${args.quest!}${GREEN_COLOR}, ${(parseInt(args.id!) < 2024) ? 'story' : 'event'} ${YELLOW_COLOR}${args.id!}${GREEN_COLOR}!${DEFAULT_COLOR}`);
                profileQuest(args.quest!, args.id!, parseInt(args.iterations!))
                    .then(results => {
                        if (results.error) {
                            console.log(`${RED_COLOR}manager: error - ${results.message}${DEFAULT_COLOR}`);
                            console.log();
                        } else {
                            console.log(`${RED_COLOR}manager: ${GREEN_COLOR}profiling complete! the results are in the ${YELLOW_COLOR}readme ${GREEN_COLOR}in the solution directory!${DEFAULT_COLOR}`);
                            console.log();
                        }
                    });
            }
        },
        update: {
            aliases: ['u'],
            description: 'updates the inputs of the quest specified.',
            arguments: ['quest', 'id'],
            command: args => {
                updateQuest(args.quest!, args.id!)
                    .then(_results => {
                        console.log(`${RED_COLOR}manager: ${GREEN_COLOR}generated inputs for quest ${YELLOW_COLOR}${args.quest!}${GREEN_COLOR}, ${(parseInt(args.id!) < 2024) ? 'story' : 'event'} ${YELLOW_COLOR}${args.id}${GREEN_COLOR}!${DEFAULT_COLOR}\n`);
                    });
            }
        },
        'update-all': {
            aliases: ['ua'],
            description: 'updates all inputs from every possible quest in an event/story.',
            arguments: ['id'],
            command: args => {
                const questCount = (parseInt(args.id as string) < 2024) ? 3 : 20;
                let done = 0;

                for (let i = 0; i < questCount; i++) {
                    updateQuest((i + 1).toString(), args.id!)
                        .then(_results => {
                            done++;
                            if (done === questCount) {
                                console.log(`${RED_COLOR}manager: ${GREEN_COLOR}generated all inputs for ${(parseInt(args.id!) < 2024) ? 'story' : 'event'} ${YELLOW_COLOR}${args.id}${GREEN_COLOR}!${DEFAULT_COLOR}\n`);
                            }
                        });
                }
            }
        }
    },
    arguments: {
        quest: {
            aliases: ['q'],
            description: 'number of quest to process.',
            default: '1',
            expects: new Array(21).fill(0).map((_, index) => (index + 1).toString())
        },
        id: {
            aliases: [],
            description: 'id of the event/story to process.',
            default: new Date().getFullYear().toString(),
            expects: ['1', '2', '2024', '2025']
        },
        part: {
            aliases: ['p'],
            description: 'which part(s) of the quest to process.',
            default: 'all',
            expects: ['all', '1', '2', '3']
        },
        iterations: {
            aliases: ['i'],
            description: 'how many iterations to run the profiler.',
            default: '10',
            expects: ['1', '3', '10']
        }
    }
};

/**
 * Generates the prompt to show all command line arguments and usage
 * 
 * @returns {string} the help prompt 
 */
const getPrompt = () => {
    let prompt = '';

    // print all commands information
    prompt += '\tcommands:\n';
    Object.entries(commandLineInfo.commands).forEach(([command, info]) => {
        const aliases = info.aliases.join(', ');
        const args = info.arguments.map(arg => `--${arg}=${arg}`).join(' ');

        prompt += `\t\t${GREEN_COLOR}${command} ${RED_COLOR}${args}\n`;
        prompt += `\t\t\t${YELLOW_COLOR}aliases: ${DEFAULT_COLOR}${aliases}\n`;
        prompt += `\t\t\t${YELLOW_COLOR}description: ${DEFAULT_COLOR}${info.description}\n`;
    });

    // print all arguments information
    prompt += '\targuments:\n';
    Object.entries(commandLineInfo.arguments).forEach(([argument, info]) => {
        const aliases = info.aliases.map(aliases => `--${aliases}`).join(', ');
        const expectsList = info.expects.join(', ');

        prompt += `\t\t${GREEN_COLOR}--${argument}\n`;
        prompt += `\t\t\t${YELLOW_COLOR}aliases: ${DEFAULT_COLOR}${aliases}\n`;
        prompt += `\t\t\t${YELLOW_COLOR}description: ${DEFAULT_COLOR}${info.description}\n`;
        prompt += `\t\t\t${YELLOW_COLOR}expects: ${DEFAULT_COLOR}${expectsList}\n`;
        prompt += `\t\t\t${YELLOW_COLOR}default: ${DEFAULT_COLOR}${info.default}\n`;
    });

    return prompt;
}

/**
 * Parses the command line arguments and runs the command needed
 * 
 * @param argv List of arguments from the command line
 */
const handleCommandLine = (argv: string[]) => {
    console.log(`\n${YELLOW_COLOR}~~~ ${GREEN_COLOR}everybody.codes manager ${RED_COLOR}v2.0.0 ${DEFAULT_COLOR}(created by ap) ${YELLOW_COLOR}~~~${DEFAULT_COLOR}\n`);
    if (argv.length == 0) {
        // show prompt when no command is inputted
        console.log(getPrompt());
    } else {
        let commandToRun = '';
        let commandFound = false;

        // check for existence
        Object.entries(commandLineInfo.commands).forEach(([command, info]) => {
            if (command === argv[0] || info.aliases.includes(argv[0])) {
                commandFound = true;
                commandToRun = command;
            }
        });

        if (commandFound) {
            // parse arguments and get defaults
            const commandArgs: CommandArguments = {};
            commandLineInfo.commands[commandToRun].arguments.forEach(arg => {
                commandArgs[arg as keyof CommandArguments] = commandLineInfo.arguments[arg].default;
            });

            for (let i = 0; i < argv.length; i++) {
                if (argv[i].startsWith('--')) {
                    const [trimmedArg, value] = argv[i].slice(2).split('=');
                    
                    // check for existence
                    const argExistance = Object.entries(commandLineInfo.arguments).find(([argument, info]) => {
                        if (argument === trimmedArg || info.aliases.includes(trimmedArg)) return [argument, info];
                    });

                    if (argExistance !== undefined) {
                        // check to see if it is valid
                        const [argToStore, argInfo] = argExistance;

                        if (argInfo.expects.includes(value)) {
                            commandArgs[argToStore as keyof CommandArguments] = value;
                        } else {
                            // if invalid argument value, throw error and show prompt
                            console.log(`${RED_COLOR}error: invalid argument value for '${trimmedArg}' (${value})${DEFAULT_COLOR}`);
                            console.log(getPrompt());
                            return;
                        }
                    } else {
                        // if argument is unknown, throw error and show prompt
                        console.log(`${RED_COLOR}error: unknown argument '${trimmedArg}'${DEFAULT_COLOR}`);
                        console.log(getPrompt());
                        return;
                    }
                }
            }

            // run command
            commandLineInfo.commands[commandToRun].command(commandArgs);
        } else {
            // if command is unknown, throw error and show prompt
            console.log(`${RED_COLOR}error: unknown command '${argv[0]}'${DEFAULT_COLOR}`);
            console.log(getPrompt());
            return;
        }
    }
}

// handle the command line
handleCommandLine(Deno.args)