import { Client } from "discord.js";
import { glob } from "glob";
import { BotEvent } from "../types";
import path from "path";

export const loadEvents = async (client: Client) => {
    const eventsPath = path.join(__dirname, "../events/**/*{.ts,.js}");
    const eventFiles = await glob(eventsPath.replace(/\\/g, "/")); // Windows compatibility

    for (const file of eventFiles) {
        const event: BotEvent = (await import(file)).default;
        if (event.name) {
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args));
            } else {
                client.on(event.name, (...args) => event.execute(...args));
            }
        }
    }
    console.log(`✅ Loaded ${eventFiles.length} events.`);
};
