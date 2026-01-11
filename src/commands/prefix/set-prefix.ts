import { Message, EmbedBuilder, PermissionsBitField } from "discord.js";
import { PrefixCommand } from "../../types";
import { Guild } from "@database/index";
import { constant } from "@functions/utils";

const command: PrefixCommand = {
    name: "set-prefix",
    description: "Change the bot prefix for this server",
    execute: async (message: Message, args: string[]) => {
        if (!message.member?.permissions.has(PermissionsBitField.Flags.Administrator)) {
            message.reply("❌ You do not have permission to use this command.");
            return;
        }

        const newPrefix = args[0];
        if (!newPrefix) {
            message.reply("❌ Please provide a new prefix.");
            return;
        }

        const guildId = message.guildId;
        if (!guildId) return;

        await Guild.findOneAndUpdate(
            { guildId },
            { prefix: newPrefix },
            { upsert: true, new: true }
        );

        const embed = new EmbedBuilder()
            .setTitle("Prefix Updated! ✅")
            .setDescription(`The bot prefix has been changed to: \`${newPrefix}\``)
            .setColor(constant.colors.success);

        message.reply({ embeds: [embed] });
    }
};

export default command;
