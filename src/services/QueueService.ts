import { AudioResource, StreamType, createAudioResource } from "@discordjs/voice";
import { QueryServiceDTO } from "../dto/QueryServiceDTO";
import ytdl from 'ytdl-core'

export class QueueService {
    private readonly queue: QueryServiceDTO[] = [];

    add(song: QueryServiceDTO) {
        this.queue.push(song);
    }

    getNext(): AudioResource | undefined {
        const song = this.queue.shift();

        if (!song) return;

        const url = song.url;

        const stream = ytdl(url, { filter: "audioonly" });

        return createAudioResource(stream, { inputType: StreamType.Arbitrary });
    }

    list(): string[] {
        return this.queue.map(item => item.title);
    }
}
