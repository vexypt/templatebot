import { Client, Events, Interaction, Message, ChannelType } from "discord.js";
import config from "@config/config.json";

export const setupExecutionHandlers = (client: Client) => {

    // Slash Command Handling
    client.on(Events.InteractionCreate, async (interaction: Interaction) => {
        if (!interaction.isChatInputCommand()) return;

        const command = client.slashCommands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            const errorMsg = { content: 'There was an error while executing this command!', ephemeral: true };
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp(errorMsg);
            } else {
                await interaction.reply(errorMsg);
            }
        }
    });

    // Prefix Command Handling
    client.on(Events.MessageCreate, async (message: Message) => {
        if (message.author.bot || message.channel.type === ChannelType.DM) return;

        // Dynamic Prefix
        let prefix = config.prefix;
        if (message.guildId) {
            const { Guild } = await import("@database/index");
            const guildData = await Guild.findOne({ guildId: message.guildId });
            if (guildData) prefix = guildData.prefix;
        }

        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift()?.toLowerCase();

        if (!commandName) return;

        const command = client.prefixCommands.get(commandName) ||
            client.prefixCommands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return;

        // Cooldown Check
        if (command.cooldown) {
            const cooldowns = client.cooldowns;
            const key = `${command.name}-${message.author.id}`;
            const now = Date.now();
            const cooldownAmount = command.cooldown * 1000;

            if (cooldowns.has(key)) {
                const expirationTime = cooldowns.get(key)!;
                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    message.reply(`⏳ Please wait **${timeLeft.toFixed(1)}** more seconds before reusing the \`${command.name}\` command.`);
                    return;
                }
            }

            cooldowns.set(key, now + cooldownAmount);
            setTimeout(() => cooldowns.delete(key), cooldownAmount);
        }

        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply("There was an error while executing this command!");
        }
    });

    console.log("✅ Execution Handlers Setup.");
};
