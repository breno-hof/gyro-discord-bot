import { 
    joinVoiceChannel,
    StreamType,
    createAudioPlayer, 
    NoSubscriberBehavior, 
    createAudioResource,
    getVoiceConnection,
    AudioPlayerStatus,
} from '@discordjs/voice'
import ytdl from 'ytdl-core'
import * as ytsrch from 'youtube-search-without-api-key'

export async function play(channel, query, queue) {
    if (!channel) return 'Usuário não está em um canal de voz.';

    const connection = getVoiceConnection(channel.guild.id) || createConnection(channel);
    const audioPlayer = connection.state.subscription.player;

    if (audioPlayer.state.status === AudioPlayerStatus.Playing) {
        queue.push(query);
        return 'Adicionado a fila!'
    }

    await searchAndPlay(query, audioPlayer);

    audioPlayer.on(AudioPlayerStatus.Idle, nextMusic(queue, audioPlayer, connection))

    return 'Aproveite o som!'
}

function nextMusic(queue, audioPlayer, connection) {
    return async () => {
        if (queue.length === 0) {
            setTimeout(() => connection.destroy(), 30_000);
            return;
        }

        const query = queue.shift();
        await searchAndPlay(query, audioPlayer);
    };
}

function createConnection(channel) {
    const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    });

    const audioPlayer = createAudioPlayer({
        behaviors: {
            noSubscriber: NoSubscriberBehavior.Pause,
        },
    });

    connection.subscribe(audioPlayer);
    return connection;
}

async function searchAndPlay(query, audioPlayer) {
    const url = (await ytsrch.search(query)).at(0).url;

    const stream = ytdl(url, {
        filter: "audioonly",
    });

    const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });

    audioPlayer.play(resource);
}
