import { AudioPlayer, AudioPlayerStatus, NoSubscriberBehavior, createAudioPlayer } from "@discordjs/voice";
import { Events } from "discord.js";
import { ApplicationConstants } from "../ApplicationConstants";
import { QueueService } from "../services/QueueService";

export class AudioPlayerFactory {

    constructor(
        readonly queueService: QueueService,
        readonly noSubscribeBehavior?: NoSubscriberBehavior
    ) {}

    create(): AudioPlayer {
        const player = createAudioPlayer({ behaviors: { noSubscriber: this.noSubscribeBehavior || NoSubscriberBehavior.Pause }});

        player.on(Events.Error, async error => {
            console.error(`${ApplicationConstants.ERROR_LOG} ${error}`);
            const song = this.queueService.getNext();

            if (song) player.play(song);
        });

        player.on(AudioPlayerStatus.Idle, async () => {
            const song = this.queueService.getNext();
            
            if (song) player.play(song);
        });

        return player; 
    }
}