import 'dotenv/config'
import {
    REST,
    Routes,
} from "discord.js";
import { RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord.js';
import { LeaveCommand } from './commands/LeaveCommand.js';
import { SkipCommand } from './commands/SkipCommand.js';
import { QueueCommand } from './commands/QueueCommand.js';
import { PauseCommand } from './commands/PauseCommand.js';
import { PlayCommand } from './commands/PlayCommand.js';

class RegisterCommands {

    public async register() {
        const { DISCORD_TOKEN, APP_ID } = process.env;
        const rest = new REST().setToken(DISCORD_TOKEN || '');
        const commands = [
            new LeaveCommand().data(),
            new SkipCommand().data(),
            new QueueCommand().data(),
            new PauseCommand().data(),
            new PlayCommand().data(),
        ];

        await this.callDiscordAPIToRegisterCommands(rest, APP_ID || '', commands);
    }

    private async callDiscordAPIToRegisterCommands(rest: REST, APP_ID: string, commands: RESTPostAPIChatInputApplicationCommandsJSONBody[]) {
        try {
            console.log(`Started refreshing ${commands.length} application (/) commands.`);

            await rest.put(Routes.applicationCommands(APP_ID), { body: commands });

            console.log(`Successfully reloaded application (/) commands.`);
        } catch (error) {
            console.error(error);
        }
    }
}

new RegisterCommands().register();