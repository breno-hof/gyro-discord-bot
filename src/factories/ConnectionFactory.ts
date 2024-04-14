import { 
    AudioPlayer,
    CreateVoiceConnectionOptions,
    JoinVoiceChannelOptions,
    VoiceConnection,
    VoiceConnectionStatus,
    entersState,
    getVoiceConnection,
    joinVoiceChannel
} from "@discordjs/voice";
import { Events, GuildChannel } from "discord.js";
import { ApplicationConstants } from "../ApplicationConstants.js";

export class ConnectionFactory {
    private readonly options: CreateVoiceConnectionOptions & JoinVoiceChannelOptions;

    constructor(
        readonly channel: GuildChannel,
        readonly player?: AudioPlayer
    ) {
        this.options = {
            adapterCreator: channel.guild.voiceAdapterCreator,
            channelId: channel.id,
            guildId: channel.guildId
        };
    }

    create(): VoiceConnection {
        return getVoiceConnection(this.channel.guildId) || this.build();
    }

    build(): VoiceConnection {
        const connection = joinVoiceChannel(this.options);
        
        connection.on(Events.Error, error => {
            console.error(`${ApplicationConstants.ERROR_LOG} ${error}`)
            connection.destroy();
        });

        connection.on(VoiceConnectionStatus.Disconnected, async () => {
            await Promise.race([
                entersState(connection, VoiceConnectionStatus.Signalling, 5_000),
                entersState(connection, VoiceConnectionStatus.Connecting, 5_000),
            ]);
        });

        return connection;
    }
}