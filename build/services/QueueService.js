import { StreamType, createAudioResource } from "@discordjs/voice";
import ytdl from 'ytdl-core';
export class QueueService {
    constructor() {
        this.queue = new Map();
    }
    add(song, key) {
        const guildQueue = this.queue.get(key);
        if (!guildQueue) {
            this.queue.set(key, [song]);
            return;
        }
        guildQueue.push(song);
    }
    getNext(key) {
        const guildQueue = this.queue.get(key);
        if (!guildQueue)
            return;
        const song = guildQueue.shift();
        if (!song)
            return;
        const url = song.url;
        const stream = ytdl(url, { filter: "audioonly" });
        return createAudioResource(stream, { inputType: StreamType.Arbitrary });
    }
    list(key) {
        const guildQueue = this.queue.get(key);
        if (!guildQueue)
            return [];
        return guildQueue.map(item => item.title);
    }
}
