import "module-alias/register";
import { ShardingManager } from "discord.js";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const isDev = process.env.ENVIRONMENT === "development";

if (isDev) {
    console.log("⚠️  Running in DEVELOPMENT mode used .env.dev (Sharding Disabled)");
    import("./bot");
} else {
    console.log("🚀 Running in PRODUCTION mode (Sharding Enabled)");
    const manager = new ShardingManager(path.join(__dirname, "bot.js"), {
        token: process.env.TOKEN,
        totalShards: "auto",
        respawn: true
    });

    manager.on("shardCreate", (shard) => {
        console.log(`🔧 Launched Shard ${shard.id}`);
    });

    manager.spawn();
}
