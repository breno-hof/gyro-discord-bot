import { Collection, Interaction } from "discord.js";
import { ISlashCommand } from "./commands/ISlashCommand";

export class HandleInteractions {
    constructor(readonly commands: Collection<string, ISlashCommand>) {}
    
    async handle(interaction: Interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = this.commands.get(interaction.commandName);

        if (command) {
            await interaction.reply(await command.execute(interaction));
        }
    }
}