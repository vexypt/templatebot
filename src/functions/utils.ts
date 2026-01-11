import { ColorResolvable } from "discord.js";
import config from "@config/config.json";
import constants from "@config/constants.json";

export const getEmoji = (name: keyof typeof config.emojis): string => {
    return config.emojis[name] || "❓";
};

interface BotConstants {
    colors: {
        primary: ColorResolvable;
        success: ColorResolvable;
        error: ColorResolvable;
        warning: ColorResolvable;
    };
}

export const constant: BotConstants = constants as BotConstants;
