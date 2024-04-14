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
import { ConnectionFactory } from "../factories/ConnectionFactory.js";
import { AudioPlayerFactory } from "../factories/AudioPlayerFactory.js";
import { AudioPlayerStatus } from "@discordjs/voice";
export class PlayCommand {
    constructor(queueService, querySercice) {
        this.queueService = queueService;
        this.querySercice = querySercice;
        this.name = "play";
    }
    data() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Play a song requested by the user in the voice channel.')
            .addStringOption(options => options
            .setName('query')
            .setDescription('Query to search for music on platforms.')
            .setRequired(true))
            .toJSON();
    }
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (!this.queueService)
                    throw new Error(`QueueService undefined on PlayCommand`);
                const member = interaction.member;
                const channel = member.voice.channel;
                if (!channel)
                    return ApplicationConstants.USER_NOT_IN_VOICE_CHANNEL;
                const key = interaction.guildId;
                if (!key)
                    throw new Error(`Key is undefined but how? It's impossible`);
                const connection = new ConnectionFactory(channel).create();
                const player = new AudioPlayerFactory(connection, this.queueService, key).create();
                console.log(`New connection at the status ${connection.state.status}`);
                console.log(`New player at the status ${player.state.status}`);
                const song = yield ((_a = this.querySercice) === null || _a === void 0 ? void 0 : _a.search(interaction));
                if (!song)
                    throw new Error(`QueryService didn't found a song on PlayCommand`);
                this.queueService.add(song, key);
                if (AudioPlayerStatus.Playing === player.state.status)
                    return `Added ${song.title} to the queue`;
                const resource = this.queueService.getNext(key);
                if (!resource)
                    throw new Error(`Resource was not created correctly on PlayCommand`);
                player.play(resource);
                return `Playing ${song.title}`;
            }
            catch (error) {
                console.error(`${ApplicationConstants.ERROR_LOG} ${error}`);
                return ApplicationConstants.ERROR_MESSAGE;
            }
        });
    }
}
