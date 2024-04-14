import { Collection, Interaction } from "discord.js";
import { ISlashCommand } from "./commands/ISlashCommand.js";

export class HandleInteractions {
    constructor(readonly commands: Collection<string, ISlashCommand>) {}
    
    async handle(interaction: Interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = this.commands.get(interaction.commandName);

        if (command) {
            await interaction.reply({ content: await command.execute(interaction), ephemeral: true });
        }
    }
}