import { getVoiceConnection, AudioPlayerStatus } from '@discordjs/voice'

export async function pause(channel) {
    if (!channel) return 'Você precisa estar em um canal de voz!';

    const connection = getVoiceConnection(channel.guild.id);

    if (connection && connection.state.subscription) {
        const player = connection.state.subscription.player;

        if (player.state.status === AudioPlayerStatus.Paused) {
            player.unpause()
            return 'A música despausada.';
        }

        player.pause()
        return 'A música foi pausada.';
    }

    return 'Não estou tocando música no momento.'
}