import "module-alias/register";
import { Client, GatewayIntentBits, Collection, Options } from "discord.js";
import { connectDatabase } from "@database/index";
import { loadCommands, loadEvents, setupExecutionHandlers } from "./handlers";
import { SlashCommand, PrefixCommand } from "./types";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ],
    makeCache: Options.cacheWithLimits({
        MessageManager: 50,
        GuildMemberManager: {
            maxSize: 200,
            keepOverLimit: (member) => member.id === member.client.user.id,
        },
        UserManager: 1000,
        PresenceManager: 0,
        ThreadManager: 0,
    }),
});

client.slashCommands = new Collection<string, SlashCommand>();
client.prefixCommands = new Collection<string, PrefixCommand>();
client.cooldowns = new Collection<string, number>();

const startBot = async () => {
    try {
        await connectDatabase();
        await loadEvents(client);
        await loadCommands(client);
        setupExecutionHandlers(client);
        await client.login(process.env.TOKEN);
    } catch (error) {
        console.error("❌ Failed to start bot:", error);
    }
};

startBot();
