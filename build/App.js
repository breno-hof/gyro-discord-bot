var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import "dotenv/config.js";
import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import { HandleInteractions } from "./HandleInteractions.js";
import { PlayCommand } from "./commands/PlayCommand.js";
import { LeaveCommand } from "./commands/LeaveCommand.js";
import { PauseCommand } from "./commands/PauseCommand.js";
import { SkipCommand } from "./commands/SkipCommand.js";
import { QueueCommand } from "./commands/QueueCommand.js";
import { QueueService } from "./services/QueueService.js";
import { QueryService } from "./services/QueryService.js";
class App {
    main() {
        const { DISCORD_TOKEN } = process.env;
        const queueService = new QueueService();
        const queryService = new QueryService();
        const playCommand = new PlayCommand(queueService, queryService);
        const leaveCommand = new LeaveCommand();
        const pauseCommand = new PauseCommand();
        const skipCommand = new SkipCommand();
        const queueCommand = new QueueCommand(queueService);
        const commands = new Collection();
        const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });
        const handleInteractions = new HandleInteractions(commands);
        commands.set(playCommand.name, playCommand);
        commands.set(leaveCommand.name, leaveCommand);
        commands.set(pauseCommand.name, pauseCommand);
        commands.set(skipCommand.name, skipCommand);
        commands.set(queueCommand.name, queueCommand);
        client.on(Events.ClientReady, () => { var _a; return console.log(`Logged as ${(_a = client.user) === null || _a === void 0 ? void 0 : _a.tag}`); });
        client.on(Events.InteractionCreate, (interaction) => __awaiter(this, void 0, void 0, function* () { return handleInteractions.handle(interaction); }));
        client.login(DISCORD_TOKEN);
    }
}
new App().main();
