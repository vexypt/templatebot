import { Schema, model, Document } from "mongoose";
import config from "@config/config.json";

export interface IGuild extends Document {
    guildId: string;
    prefix: string;
}

const GuildSchema = new Schema({
    guildId: { type: String, required: true, unique: true },
    prefix: { type: String, default: config.prefix }
});

export default model<IGuild>("Guild", GuildSchema);
