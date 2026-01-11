import { Message, EmbedBuilder } from "discord.js";
import { PrefixCommand } from "../../types";
import { User } from "@database/index";
import { constant } from "@functions/utils";

const command: PrefixCommand = {
    name: "balance",
    description: "Check your current balance",
    aliases: ["bal", "money"],
    execute: async (message: Message, args: string[]) => {
        const targetUser = message.mentions.users.first() || message.author;

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

        message.reply({ embeds: [embed] });
    }
};

export default command;
