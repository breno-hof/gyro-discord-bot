var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AudioPlayerStatus, NoSubscriberBehavior, createAudioPlayer } from "@discordjs/voice";
import { Events } from "discord.js";
import { ApplicationConstants } from "../ApplicationConstants.js";
export class AudioPlayerFactory {
    constructor(connection, queueService, key, noSubscribeBehavior) {
        this.connection = connection;
        this.queueService = queueService;
        this.key = key;
        this.noSubscribeBehavior = noSubscribeBehavior;
    }
    create() {
        if ('subscription' in this.connection.state)
            return this.connection.state.subscription.player;
        const player = createAudioPlayer({ behaviors: { noSubscriber: this.noSubscribeBehavior || NoSubscriberBehavior.Pause } });
        player.on(Events.Error, (error) => __awaiter(this, void 0, void 0, function* () {
            console.error(`${ApplicationConstants.ERROR_LOG} ${error}`);
            const song = this.queueService.getNext(this.key);
            if (song)
                player.play(song);
        }));
        player.on(AudioPlayerStatus.Idle, () => __awaiter(this, void 0, void 0, function* () {
            const song = this.queueService.getNext(this.key);
            if (song)
                player.play(song);
        }));
        this.connection.subscribe(player);
        return player;
    }
}
