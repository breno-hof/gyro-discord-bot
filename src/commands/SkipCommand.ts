import {
    RESTPostAPIChatInputApplicationCommandsJSONBody,
    Interaction,
    GuildMember,
    SlashCommandBuilder
} from "discord.js";
import { ISlashCommand } from "./ISlashCommand.js";
import { ApplicationConstants } from "../ApplicationConstants.js";
import { getVoiceConnection } from "@discordjs/voice";

export class SkipCommand implements ISlashCommand {
    readonly name: string = "skip";
    data(): RESTPostAPIChatInputApplicationCommandsJSONBody {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Skip to the next song in queue.')
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

            return connection.state.subscription?.player?.stop() ? 'The song was skipped.' : ApplicationConstants.ERROR_MESSAGE;
        } catch (error) {
            console.error(`${ApplicationConstants.ERROR_LOG} ${error}`);
            return ApplicationConstants.ERROR_MESSAGE;
        }
    }
}