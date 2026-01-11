import { Message, EmbedBuilder } from "discord.js";
import { PrefixCommand } from "../../types";
import { User } from "@database/index";
import { constant } from "@functions/utils";

const DAILY_AMOUNT = 500;
const COOLDOWN = 24 * 60 * 60 * 1000; // 24 hours

const command: PrefixCommand = {
    name: "daily",
    description: "Claim your daily reward",
    execute: async (message: Message, args: string[]) => {
        const userId = message.author.id;

        let userProfile = await User.findOne({ userId });
        if (!userProfile) {
            userProfile = new User({ userId });
        }

        const now = Date.now();
        const lastDaily = userProfile.lastDaily?.getTime() || 0;

        if (now - lastDaily < COOLDOWN) {
            const remainingTime = lastDaily + COOLDOWN - now;
            const hours = Math.floor(remainingTime / (1000 * 60 * 60));
            const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));

            message.reply(`⏳ You have already claimed your daily reward. Come back in **${hours}h ${minutes}m**!`);
            return;
        }

        userProfile.balance += DAILY_AMOUNT;
        userProfile.lastDaily = new Date(now);
        await userProfile.save();

        const embed = new EmbedBuilder()
            .setTitle("Daily Reward Claimed! 🎉")
            .setDescription(`You received **${DAILY_AMOUNT}** coins!\nNew Balance: **${userProfile.balance}**`)
            .setColor(constant.colors.success)
            .setTimestamp();

        message.reply({ embeds: [embed] });
    }
};

export default command;
