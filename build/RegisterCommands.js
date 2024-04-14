"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const discord_js_1 = require("discord.js");
const LeaveCommand_1 = require("./commands/LeaveCommand");
const SkipCommand_1 = require("./commands/SkipCommand");
const QueueCommand_1 = require("./commands/QueueCommand");
const PauseCommand_1 = require("./commands/PauseCommand");
const PlayCommand_1 = require("./commands/PlayCommand");
class RegisterCommands {
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            const { DISCORD_TOKEN, APP_ID } = process.env;
            const rest = new discord_js_1.REST().setToken(DISCORD_TOKEN || '');
            const commands = [
                new LeaveCommand_1.LeaveCommand().data(),
                new SkipCommand_1.SkipCommand().data(),
                new QueueCommand_1.QueueCommand().data(),
                new PauseCommand_1.PauseCommand().data(),
                new PlayCommand_1.PlayCommand().data(),
            ];
            yield this.callDiscordAPIToRegisterCommands(rest, APP_ID || '', commands);
        });
    }
    callDiscordAPIToRegisterCommands(rest, APP_ID, commands) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`Started refreshing ${commands.length} application (/) commands.`);
                yield rest.put(discord_js_1.Routes.applicationCommands(APP_ID), { body: commands });
                console.log(`Successfully reloaded application (/) commands.`);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
}
new RegisterCommands().register();
