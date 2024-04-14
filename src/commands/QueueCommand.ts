import {
    RESTPostAPIChatInputApplicationCommandsJSONBody,
    Interaction,
    SlashCommandBuilder
} from "discord.js";
import { ISlashCommand } from "./ISlashCommand.js";
import { QueueService } from "../services/QueueService.js";
import { ApplicationConstants } from "../ApplicationConstants.js";

export class QueueCommand implements ISlashCommand {
    readonly name: string = "queue";

    constructor(readonly queueService?: QueueService) { }

    data(): RESTPostAPIChatInputApplicationCommandsJSONBody {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Shows the queue list.')
            .toJSON();
    }

    async execute(interaction: Interaction): Promise<string> {
        if (!this.queueService) return ApplicationConstants.ERROR_MESSAGE;

        const key = interaction.guildId;

        if (!key) return ApplicationConstants.ERROR_MESSAGE;

        const queue = this.queueService.list(key);

        if (queue.length <= 0) return "There is no song in the queue";

        return 'The queue is:\n\n' + queue.reduce((previous, current) => previous.concat(`\n${current}`));
    }
}