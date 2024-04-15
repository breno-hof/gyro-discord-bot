import { AudioPlayer, AudioPlayerStatus, NoSubscriberBehavior, VoiceConnection, createAudioPlayer } from "@discordjs/voice";
import { Events } from "discord.js";
import { ApplicationConstants } from "../ApplicationConstants.js";
import { QueueService } from "../services/QueueService.js";

export class AudioPlayerFactory {

    constructor(
        readonly connection: VoiceConnection,
        readonly queueService: QueueService,
        readonly key: string,
        readonly noSubscribeBehavior?: NoSubscriberBehavior,
    ) {}

    create(): AudioPlayer {
        if ('subscription' in this.connection.state) return this.connection.state.subscription!.player;

        const player = createAudioPlayer({ behaviors: { noSubscriber: this.noSubscribeBehavior || NoSubscriberBehavior.Pause }});

        player.on(Events.Error, async error => {
            console.error(`${ApplicationConstants.ERROR_LOG} ${error}`);
            const song = this.queueService.getNext(this.key);

            if (song) player.play(song);
        });

        player.on(AudioPlayerStatus.Idle, async () => {
            const song = this.queueService.getNext(this.key);
            
            if (song) player.play(song);

            setTimeout(() => {
                if (this.queueService.list(this.key).length <= 0) {
                    this.connection.destroy();
                }
            }, 30_000)
        });
        
        this.connection.subscribe(player);

        return player; 
    }
}