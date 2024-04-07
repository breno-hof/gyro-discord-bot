import 'dotenv/config'
import { REST, Routes } from 'discord.js'

const { DISCORD_TOKEN, APP_ID } = process.env

const commands = [
    {
        name: 'play',
        description: 'Play music in user current voice channel',
        options: [
            {
                name: 'query',
                description: 'Query to search for music',
                type: 3,
                required: true
            }
        ]
    },
    {
        name: 'leave',
        description: 'Leave current voice channel',
    },
    {
        name: 'pause',
        description: 'Pause current music',
    },
    {
        name: 'skip',
        description: 'Skip current music',
    },
];

const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(APP_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
} catch (error) {
    console.error(error);
}