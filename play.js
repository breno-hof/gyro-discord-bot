import { 
    joinVoiceChannel,
    StreamType,
    createAudioPlayer, 
    NoSubscriberBehavior, 
    createAudioResource,
    getVoiceConnection,
} from '@discordjs/voice'
import ytdl from 'ytdl-core'
import * as ytsrch from 'youtube-search-without-api-key'

export async function play(channel, query) {
    if (!channel) return 'Usuário não está em um canal de voz.';

    const connection = getVoiceConnection(channel.guild.id) || joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    });

    const audioPlayer = createAudioPlayer({
        behaviors: {
            noSubscriber: NoSubscriberBehavior.Pause,
        },
    });

    const url = (await ytsrch.search(query)).at(0).url;

    const stream = ytdl(url, {
      filter: "audioonly",
    });

    const resource = createAudioResource(stream, {  inputType: StreamType.Arbitrary });
    
    audioPlayer.play(resource);

    connection.subscribe(audioPlayer);

    return 'Aproveite o som!'
}