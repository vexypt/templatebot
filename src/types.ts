import {
    SlashCommandBuilder,
    CommandInteraction,
    Collection,
    PermissionResolvable,
    Message,
    AutocompleteInteraction,
    ChatInputCommandInteraction
} from "discord.js";

export interface SlashCommand {
    command: SlashCommandBuilder | any;
    execute: (interaction: ChatInputCommandInteraction) => void;
    autocomplete?: (interaction: AutocompleteInteraction) => void;
    cooldown?: number; // in seconds
    permissions?: PermissionResolvable[];
}

export interface PrefixCommand {
    name: string;
    description: string;
    aliases?: string[];
    permissions?: PermissionResolvable[];
    cooldown?: number;
    execute: (message: Message, args: string[]) => void;
}

export interface BotEvent {
    name: string;
    once?: boolean;
    execute: (...args: any[]) => void;
}

declare module "discord.js" {
    export interface Client {
        slashCommands: Collection<string, SlashCommand>;
        prefixCommands: Collection<string, PrefixCommand>;
        // commands: Collection<string, Command>; // Deprecated
        cooldowns: Collection<string, number>;
    }
}
