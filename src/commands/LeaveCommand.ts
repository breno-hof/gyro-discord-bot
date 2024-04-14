import {
    RESTPostAPIChatInputApplicationCommandsJSONBody,
    Interaction,
    SlashCommandBuilder,
    GuildMember,
} from "discord.js";
import { ISlashCommand } from "./ISlashCommand.js";
import { ApplicationConstants } from "../ApplicationConstants.js";
import { getVoiceConnection } from "@discordjs/voice";

export class LeaveCommand implements ISlashCommand {
    readonly name: string = "leave";
    
    data(): RESTPostAPIChatInputApplicationCommandsJSONBody {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Leave the discord voice channel.')
            .toJSON();
    }

    async execute(interaction: Interaction): Promise<string> {
        try {
            const member = interaction.member as GuildMember;
            const channel = member.voice.channel;

            if (!channel) return ApplicationConstants.USER_NOT_IN_VOICE_CHANNEL;

            const connection = getVoiceConnection(channel.guildId);

            if (!connection) return ApplicationConstants.BOT_NOT_IN_VOICE_CHANNEL;

            connection.destroy();
            return "I'm leaving the voice channel, see you later.";
        } catch (error) {
            console.error(`${ApplicationConstants.ERROR_LOG} ${error}`);
            return ApplicationConstants.ERROR_MESSAGE;
        }
    }
}