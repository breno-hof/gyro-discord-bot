import 'dotenv/config';
import { Client, GatewayIntentBits } from 'discord.js';
import { leave } from './leave.js';
import { play } from './play.js';
import { pause } from './pause.js';
import { stop } from './stop.js';

const { DISCORD_TOKEN } = process.env
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });
const queue = {};

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  let text = 'Ocorreu um erro! O bahiano não soube programar!';
  const voiceChannel = interaction.member.voice.channel;
  
  if (!queue[interaction.guildId]) {
    queue[interaction.guildId] = [];
  }

  if (interaction.commandName === 'play') {
    text = await play(voiceChannel, interaction.options.data[0].value, queue[interaction.guildId]);
  } else if (interaction.commandName === 'leave') {
    text = await leave(voiceChannel);
  } else if (interaction.commandName === 'pause') {
    text = await pause(voiceChannel);
  } else if (interaction.commandName === 'skip') {
    text = await stop(voiceChannel);
  }

  await interaction.reply(text);
});

client.login(DISCORD_TOKEN);