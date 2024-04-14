import {
    RESTPostAPIChatInputApplicationCommandsJSONBody,
    Interaction,
    SlashCommandBuilder,
    GuildMember
} from "discord.js";
import { ISlashCommand } from "./ISlashCommand";
import { AudioPlayerStatus, getVoiceConnection } from "@discordjs/voice";
import { ApplicationConstants } from "../ApplicationConstants";

export class PauseCommand implements ISlashCommand {
    readonly name: string = "pause";
    data(): RESTPostAPIChatInputApplicationCommandsJSONBody {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Pause the current song. To unpause run command again.')
            .toJSON();
    }

    async execute(interaction: Interaction): Promise<string> {
        try {
            const member = interaction.member as GuildMember;
            const channel = member.voice.channel;

            if (!channel) return ApplicationConstants.USER_NOT_IN_VOICE_CHANNEL;

            const connection = getVoiceConnection(channel.guildId);

            if (!connection) return ApplicationConstants.BOT_NOT_IN_VOICE_CHANNEL;

            if (!('subscription' in connection.state)) return ApplicationConstants.ERROR_MESSAGE;

            const player = connection.state.subscription?.player;

            if (!player) return ApplicationConstants.ERROR_MESSAGE;

            if (player.state.status === AudioPlayerStatus.Paused) {
                return player.unpause() ? 'The song was unpaused.' : ApplicationConstants.ERROR_MESSAGE;
            }

            return player.pause() ? 'The song was paused.' : ApplicationConstants.ERROR_MESSAGE;
        } catch (error) {
            console.error(`${ApplicationConstants.ERROR_LOG} ${error}`);
            return ApplicationConstants.ERROR_MESSAGE;
        }
    }
}