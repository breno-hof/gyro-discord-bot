var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import 'dotenv/config';
import { REST, Routes, } from "discord.js";
import { LeaveCommand } from './commands/LeaveCommand.js';
import { SkipCommand } from './commands/SkipCommand.js';
import { QueueCommand } from './commands/QueueCommand.js';
import { PauseCommand } from './commands/PauseCommand.js';
import { PlayCommand } from './commands/PlayCommand.js';
class RegisterCommands {
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            const { DISCORD_TOKEN, APP_ID } = process.env;
            const rest = new REST().setToken(DISCORD_TOKEN || '');
            const commands = [
                new LeaveCommand().data(),
                new SkipCommand().data(),
                new QueueCommand().data(),
                new PauseCommand().data(),
                new PlayCommand().data(),
            ];
            yield this.callDiscordAPIToRegisterCommands(rest, APP_ID || '', commands);
        });
    }
    callDiscordAPIToRegisterCommands(rest, APP_ID, commands) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`Started refreshing ${commands.length} application (/) commands.`);
                yield rest.put(Routes.applicationCommands(APP_ID), { body: commands });
                console.log(`Successfully reloaded application (/) commands.`);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
}
new RegisterCommands().register();
