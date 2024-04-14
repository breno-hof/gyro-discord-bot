var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { VoiceConnectionStatus, entersState, getVoiceConnection, joinVoiceChannel } from "@discordjs/voice";
import { Events } from "discord.js";
import { ApplicationConstants } from "../ApplicationConstants.js";
export class ConnectionFactory {
    constructor(channel, player) {
        this.channel = channel;
        this.player = player;
        this.options = {
            adapterCreator: channel.guild.voiceAdapterCreator,
            channelId: channel.id,
            guildId: channel.guildId
        };
    }
    create() {
        return getVoiceConnection(this.channel.guildId) || this.build();
    }
    build() {
        const connection = joinVoiceChannel(this.options);
        connection.on(Events.Error, error => {
            console.error(`${ApplicationConstants.ERROR_LOG} ${error}`);
            connection.destroy();
        });
        connection.on(VoiceConnectionStatus.Disconnected, () => __awaiter(this, void 0, void 0, function* () {
            yield Promise.race([
                entersState(connection, VoiceConnectionStatus.Signalling, 5000),
                entersState(connection, VoiceConnectionStatus.Connecting, 5000),
            ]);
        }));
        return connection;
    }
}
