import "dotenv/config.js"
import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import { HandleInteractions } from "./HandleInteractions.js";
import { ISlashCommand } from "./commands/ISlashCommand.js";
import { PlayCommand } from "./commands/PlayCommand.js";
import { LeaveCommand } from "./commands/LeaveCommand.js";
import { PauseCommand } from "./commands/PauseCommand.js";
import { SkipCommand } from "./commands/SkipCommand.js";
import { QueueCommand } from "./commands/QueueCommand.js";
import { QueueService } from "./services/QueueService.js";
import { QueryService } from "./services/QueryService.js";

class App {

    public main() {
        const { DISCORD_TOKEN } = process.env;
        const queueService = new QueueService();
        const queryService = new QueryService();
        const playCommand = new PlayCommand(queueService, queryService);
        const leaveCommand = new LeaveCommand();
        const pauseCommand = new PauseCommand();
        const skipCommand = new SkipCommand();
        const queueCommand = new QueueCommand(queueService);
        const commands = new Collection<string, ISlashCommand>();
        const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]});
        const handleInteractions = new HandleInteractions(commands);

        commands.set(playCommand.name, playCommand);
        commands.set(leaveCommand.name, leaveCommand);
        commands.set(pauseCommand.name, pauseCommand);
        commands.set(skipCommand.name, skipCommand);
        commands.set(queueCommand.name, queueCommand);

        client.on(Events.ClientReady, () => console.log(`Logged as ${client.user?.tag}`));
        client.on(Events.InteractionCreate, async interaction => handleInteractions.handle(interaction));

        client.login(DISCORD_TOKEN);
    }
}

new App().main();