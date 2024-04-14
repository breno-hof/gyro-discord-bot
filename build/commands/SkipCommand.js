var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SlashCommandBuilder } from "discord.js";
import { ApplicationConstants } from "../ApplicationConstants.js";
import { getVoiceConnection } from "@discordjs/voice";
export class SkipCommand {
    constructor() {
        this.name = "skip";
    }
    data() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Skip to the next song in queue.')
            .toJSON();
    }
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const member = interaction.member;
                const channel = member.voice.channel;
                if (!channel)
                    return ApplicationConstants.USER_NOT_IN_VOICE_CHANNEL;
                const connection = getVoiceConnection(channel.guildId);
                if (!connection)
                    return ApplicationConstants.BOT_NOT_IN_VOICE_CHANNEL;
                if (!('subscription' in connection.state))
                    return ApplicationConstants.ERROR_MESSAGE;
                return ((_b = (_a = connection.state.subscription) === null || _a === void 0 ? void 0 : _a.player) === null || _b === void 0 ? void 0 : _b.stop()) ? 'The song was skipped.' : ApplicationConstants.ERROR_MESSAGE;
            }
            catch (error) {
                console.error(`${ApplicationConstants.ERROR_LOG} ${error}`);
                return ApplicationConstants.ERROR_MESSAGE;
            }
        });
    }
}
