import { AudioResource, StreamType, createAudioResource } from "@discordjs/voice";
import { QueryServiceDTO } from "../dto/QueryServiceDTO.js";
import ytdl from 'ytdl-core'

export class QueueService {
    private readonly queue: Map<string, QueryServiceDTO[]> = new Map();

    add(song: QueryServiceDTO, key: string) {
        const guildQueue = this.queue.get(key);

        if (!guildQueue) {
            this.queue.set(key, [song]);
            return;
        }

        guildQueue.push(song);
    }

    getNext(key: string): AudioResource | undefined {
        const guildQueue = this.queue.get(key);

        if (!guildQueue) return;
        
        const song = guildQueue.shift();

        if (!song) return;

        const url = song.url;

        const stream = ytdl(url, { filter: "audioonly" });

        return createAudioResource(stream, { inputType: StreamType.Arbitrary });
    }

    list(key: string): string[] {
        const guildQueue = this.queue.get(key);

        if (!guildQueue) return [];

        return guildQueue.map(item => item.title);
    }
}
