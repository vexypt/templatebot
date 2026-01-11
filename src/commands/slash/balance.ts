import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { SlashCommand } from "../../types";
import { User } from "@database/index";
import { constant } from "@functions/utils";

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("balance")
        .setDescription("Check your current balance")
        .addUserOption(option =>
            option.setName("user")
                .setDescription("The user to check balance for")
                .setRequired(false)
        ),
    execute: async (interaction: ChatInputCommandInteraction) => {
        const targetUser = interaction.options.getUser("user") || interaction.user;

        let userProfile = await User.findOne({ userId: targetUser.id });
        if (!userProfile) {
            userProfile = new User({ userId: targetUser.id });
            await userProfile.save();
        }

        const embed = new EmbedBuilder()
            .setTitle(`${targetUser.username}'s Balance`)
            .setDescription(`💰 **${userProfile.balance}** coins`)
            .setColor(constant.colors.primary)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};

export default command;
