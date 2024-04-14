import {
    Interaction,
    RESTPostAPIChatInputApplicationCommandsJSONBody
} from 'discord.js'

export interface ISlashCommand {
    readonly name: string
    data(): RESTPostAPIChatInputApplicationCommandsJSONBody;
    execute(interaction: Interaction): Promise<string>;
}