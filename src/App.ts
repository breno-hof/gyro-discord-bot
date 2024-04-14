import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import { HandleInteractions } from "./HandleInteractions";
import { ISlashCommand } from "./commands/ISlashCommand";
import { PlayCommand } from "./commands/PlayCommand";
import { LeaveCommand } from "./commands/LeaveCommand";
import { PauseCommand } from "./commands/PauseCommand";
import { SkipCommand } from "./commands/SkipCommand";
import { QueueCommand } from "./commands/QueueCommand";
import { QueueService } from "./services/QueueService";

class App {

    public main() {
        const { DISCORD_TOKEN } = process.env;
        const queueService = new QueueService();
        const playCommand = new PlayCommand(queueService);
        const leaveCommand = new LeaveCommand();
        const pauseCommand = new PauseCommand();
        const skipCommand = new SkipCommand();
        const queueCommand = new QueueCommand();
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