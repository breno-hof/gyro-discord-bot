import { 
    RESTPostAPIChatInputApplicationCommandsJSONBody, 
    Interaction, 
    SlashCommandBuilder,
    GuildMember
} from "discord.js";
import { ISlashCommand } from "./ISlashCommand";
import { ApplicationConstants } from "../ApplicationConstants";
import { ConnectionFactory } from "../factories/ConnectionFactory";
import { AudioPlayerFactory } from "../factories/AudioPlayerFactory";
import { QueueService } from "../services/QueueService";
import { AudioPlayerStatus } from "@discordjs/voice";
import { QueryService } from "../services/QueryService";

export class PlayCommand implements ISlashCommand {
    readonly name: string = "play";

    constructor(
        readonly queueService?: QueueService,
        readonly querySercice?: QueryService
    ) {}

    data(): RESTPostAPIChatInputApplicationCommandsJSONBody {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Play a song requested by the user in the voice channel.')
            .addStringOption(options => options
                .setName('query')
                .setDescription('Query to search for music on platforms.')
                .setRequired(true)
            )
            .toJSON();
    }
    
    async execute(interaction: Interaction): Promise<string> {
        try {
            if (!this.queueService) throw new Error(`QueueService undefined on PlayCommand`);

            const member = interaction.member as GuildMember;
            const channel = member.voice.channel;

            if (!channel) return ApplicationConstants.USER_NOT_IN_VOICE_CHANNEL;

            const player = new AudioPlayerFactory(this.queueService).create();
            const connection = new ConnectionFactory(channel, player).create();

            console.log(`New connection at the status ${connection.state.status}`);

            const song = await this.querySercice?.search(interaction);
            
            if (!song) throw new Error(`QueryService didn't found a song on PlayCommand`);

            if (AudioPlayerStatus.Playing === player.state.status) {
                this.queueService.add(song);
                return `Added ${song.title} to the queue`; 
            }

            const resource = this.queueService.getNext();

            if (!resource) throw new Error(`Resource was not created correctly on PlayCommand`);

            player.play(resource);

            return `Playing ${song.title}`;
        } catch (error) {
            console.error(`${ApplicationConstants.ERROR_LOG} ${error}`);
            return ApplicationConstants.ERROR_MESSAGE;
        }
    }
}