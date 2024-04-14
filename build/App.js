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
const discord_js_1 = require("discord.js");
const HandleInteractions_1 = require("./HandleInteractions");
class App {
    main() {
        const { DISCORD_TOKEN } = process.env;
        const commands = new discord_js_1.Collection();
        const client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.GuildVoiceStates] });
        const handleInteractions = new HandleInteractions_1.HandleInteractions(commands);
        client.on(discord_js_1.Events.ClientReady, () => { var _a; return console.log(`Logged as ${(_a = client.user) === null || _a === void 0 ? void 0 : _a.tag}`); });
        client.on(discord_js_1.Events.InteractionCreate, (interaction) => __awaiter(this, void 0, void 0, function* () { return handleInteractions.handle(interaction); }));
        client.login(DISCORD_TOKEN);
    }
}
new App().main();
