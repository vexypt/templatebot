import { Client, REST, Routes } from "discord.js";
import { glob } from "glob";
import { SlashCommand, PrefixCommand } from "../types";
import path from "path";

export const loadCommands = async (client: Client) => {
    const slashCommands: any[] = [];
    const slashCommandFiles = await glob(path.join(__dirname, "../commands/slash/**/*{.ts,.js}").replace(/\\/g, "/"));

    for (const file of slashCommandFiles) {
        const command: SlashCommand = (await import(file)).default;
        if (!command.command) continue;
        client.slashCommands.set(command.command.name, command);
        slashCommands.push(command.command.toJSON());
    }

    const prefixCommandFiles = await glob(path.join(__dirname, "../commands/prefix/**/*{.ts,.js}").replace(/\\/g, "/"));

    for (const file of prefixCommandFiles) {
        const command: PrefixCommand = (await import(file)).default;
        if (!command.name) continue;
        client.prefixCommands.set(command.name, command);
    }

    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN || "");
    const clientId = process.env.CLIENT_ID || "";
    const guildId = process.env.GUILD_ID || "";
    const isDev = process.env.ENVIRONMENT === "development";

    try {
        console.log(`⏳ Started refreshing ${slashCommands.length} application (/) commands.`);

        if (isDev && guildId) {
            // Register to specific guild in dev for instant updates
            await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: slashCommands },
            );
            console.log(`✅ Successfully reloaded application (/) commands for guild ${guildId}.`);
        } else {
            // Global registration
            await rest.put(
                Routes.applicationCommands(clientId),
                { body: slashCommands },
            );
            console.log("✅ Successfully reloaded application (/) commands globally.");
        }
    } catch (error) {
        console.error(error);
    }

    console.log(`✅ Loaded ${client.slashCommands.size} slash commands and ${client.prefixCommands.size} prefix commands.`);
};
