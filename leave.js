import { getVoiceConnection } from '@discordjs/voice'

export async function leave(channel) {
    if (!channel) return 'Você precisa estar em um canal de voz!';

    const connection = getVoiceConnection(channel.guild.id);

    if (connection) {
        connection.destroy();
        return 'Até logo!';
    }

    return 'Não estou tocando música no momento.'
}