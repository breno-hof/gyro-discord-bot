var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SlashCommandBuilder } from "discord.js";
import { ApplicationConstants } from "../ApplicationConstants.js";
export class QueueCommand {
    constructor(queueService) {
        this.queueService = queueService;
        this.name = "queue";
    }
    data() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Shows the queue list.')
            .toJSON();
    }
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.queueService)
                return ApplicationConstants.ERROR_MESSAGE;
            const key = interaction.guildId;
            if (!key)
                return ApplicationConstants.ERROR_MESSAGE;
            const queue = this.queueService.list(key);
            if (queue.length <= 0)
                return "There is no song in the queue";
            return 'The queue is:\n\n' + queue.reduce((previous, current) => previous.concat(`\n${current}`));
        });
    }
}
