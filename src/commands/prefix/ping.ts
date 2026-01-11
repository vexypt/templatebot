import { Message, EmbedBuilder } from "discord.js";
import { PrefixCommand } from "../../types";
import { constant } from "@functions/utils";

const command: PrefixCommand = {
    name: "ping",
    description: "Shows the bot's latency",
    cooldown: 1000000,
    execute: (message: Message, args: string[]) => {
        const embed = new EmbedBuilder()
            .setTitle("Pong! 🏓")
            .setDescription(`Latency: ${Date.now() - message.createdTimestamp}ms\nAPI Latency: ${Math.round(message.client.ws.ping)}ms`)
            .setColor(constant.colors.success);

        message.reply({ embeds: [embed] });
    }
};

export default command;
