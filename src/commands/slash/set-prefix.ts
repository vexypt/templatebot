import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, PermissionFlagsBits } from "discord.js";
import { SlashCommand } from "../../types";
import { Guild } from "@database/index";
import { constant } from "@functions/utils";

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("set-prefix")
        .setDescription("Change the bot prefix for this server")
        .addStringOption(option =>
            option.setName("prefix")
                .setDescription("The new prefix")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    execute: async (interaction: ChatInputCommandInteraction) => {
        const newPrefix = interaction.options.getString("prefix", true);
        const guildId = interaction.guildId;

        if (!guildId) {
            await interaction.reply({ content: "This command can only be used in a server.", ephemeral: true });
            return;
        }

        await Guild.findOneAndUpdate(
            { guildId },
            { prefix: newPrefix },
            { upsert: true, new: true }
        );

        const embed = new EmbedBuilder()
            .setTitle("Prefix Updated! ✅")
            .setDescription(`The bot prefix has been changed to: \`${newPrefix}\``)
            .setColor(constant.colors.success);

        await interaction.reply({ embeds: [embed] });
    }
};

export default command;
