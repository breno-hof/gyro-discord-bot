"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PauseCommand = void 0;
const discord_js_1 = require("discord.js");
const voice_1 = require("@discordjs/voice");
const ApplicationConstants_1 = require("../ApplicationConstants");
class PauseCommand {
    constructor() {
        this.name = "pause";
    }
    data() {
        return new discord_js_1.SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Pause the current song. To unpause run command again.')
            .toJSON();
    }
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const member = interaction.member;
                const channel = member.voice.channel;
                if (!channel)
                    return ApplicationConstants_1.ApplicationConstants.USER_NOT_IN_VOICE_CHANNEL;
                const connection = (0, voice_1.getVoiceConnection)(channel.guildId);
                if (!connection)
                    return ApplicationConstants_1.ApplicationConstants.BOT_NOT_IN_VOICE_CHANNEL;
                if (!('subscription' in connection.state))
                    return ApplicationConstants_1.ApplicationConstants.ERROR_MESSAGE;
                const player = (_a = connection.state.subscription) === null || _a === void 0 ? void 0 : _a.player;
                if (!player)
                    return ApplicationConstants_1.ApplicationConstants.ERROR_MESSAGE;
                if (player.state.status === voice_1.AudioPlayerStatus.Paused) {
                    return player.unpause() ? 'The song was unpaused.' : ApplicationConstants_1.ApplicationConstants.ERROR_MESSAGE;
                }
                return player.pause() ? 'The song was paused.' : ApplicationConstants_1.ApplicationConstants.ERROR_MESSAGE;
            }
            catch (error) {
                console.error(`${ApplicationConstants_1.ApplicationConstants.ERROR_LOG} ${error}`);
                return ApplicationConstants_1.ApplicationConstants.ERROR_MESSAGE;
            }
        });
    }
}
exports.PauseCommand = PauseCommand;
