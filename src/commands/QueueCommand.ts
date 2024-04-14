import { 
    RESTPostAPIChatInputApplicationCommandsJSONBody, 
    Interaction, 
    SlashCommandBuilder
} from "discord.js";
import { ISlashCommand } from "./ISlashCommand";
import { QueueService } from "../services/QueueService";

export class QueueCommand implements ISlashCommand {
    readonly name: string = "queue";

    constructor(readonly queueService: QueueService) {}

    data(): RESTPostAPIChatInputApplicationCommandsJSONBody {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Shows the queue list.')
            .toJSON();
    }
    
    async execute(interaction: Interaction): Promise<string> {    
        return 'The queue is:\n\n' + this.queueService.list().reduce((previous, current) => previous.concat(`\n${current}`));
    }
}