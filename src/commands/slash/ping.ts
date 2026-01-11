import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { SlashCommand } from "../../types";
import { constant } from "@functions/utils";

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Shows the bot's latency"),
    cooldown: 1000000,
    execute: async (interaction: ChatInputCommandInteraction) => {
        const embed = new EmbedBuilder()
            .setTitle("Pong! 🏓")
            .setDescription(`Latency: ${Date.now() - interaction.createdTimestamp}ms\nAPI Latency: ${Math.round(interaction.client.ws.ping)}ms`)
            .setColor(constant.colors.success);

        await interaction.reply({ embeds: [embed] });
    }
};

export default command;
