import { getVoiceConnection } from '@discordjs/voice'

export async function stop(channel) {
    if (!channel) return 'Você precisa estar em um canal de voz!';

    const connection = getVoiceConnection(channel.guild.id);

    if (connection && connection.state.subscription) {
        connection.state.subscription.player.stop();
        return 'A música foi pulada.';
    }

    return 'Não estou tocando música no momento.'
}