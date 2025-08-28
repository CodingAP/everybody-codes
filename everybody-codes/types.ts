/**
 * everybody-codes/types.ts
 *
 * container file for all types used by the everybody.codes manager
 *
 * by alex prosser
 * 8/28/2025
 */

/**
 * response for encryptions keys of the descriptions and titles
 */
interface EncryptionKeys {
    /**
     * encryption key for part 1 (also used for the title)
     */
    key1: string;

    /**
     * encryption key for part 2
     */
    key2: string;

    /**
     * encryption key for part 3
     */
    key3: string;
};

/**
 * response for the decrypted inputs
 */
interface Inputs {
    /**
     * input for part 1
     */
    input1: string;

    /**
     * input for part 2
     */
    input2: string;

    /**
     * input for part 3
     */
    input3: string;
};

/**
 * argumrnts that can passed to a command
 */
interface CommandArguments {
    /**
     * quest number of the story/event
     */
    quest?: string;

    /**
     * id of the story/event (>=2024: event, everything else is story)
     */
    id?: string;

    /**
     * specific part(s) to run
     */
    part?: string;

    /**
     * how many iterations the profiler needs to run
     */
    iterations?: string;
};


/**
 * information about a command
 */
interface CommandInfo {
    /**
     * list of other names for the command
     */
    aliases: string[];

    /**
     * description of the command for the help prompt
     */
    description: string;

    /**
     * all arguments required by the command
     */
    arguments: string[];

    /**
     * the execution of the command
     * 
     * @param args given arguments for the command
     */
    command: (args: CommandArguments) => void
};

/**
 * information about a argument
 */
interface ArgumentInfo {
    /**
     * list of other names for the argument
     */
    aliases: string[];

    /**
     * description of the argument for the help prompt
     */
    description: string;

    /**
     * default value to use when not provided
     */
    default: string;

    /**
     * valid values for the argument
     */
    expects: string[];
};

export type {
    EncryptionKeys,
    Inputs,
    CommandArguments,
    CommandInfo,
    ArgumentInfo
}