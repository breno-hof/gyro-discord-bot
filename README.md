# gyro-discord-bot
A music bot for Discord

To run u should configure a `.env` file with the following properties:

```sh
DISCORD_TOKEN= // your discord bot auth token
APP_ID= // you discord bot application id
```

`npm install` to install dependencies.

`npm run register` to update bot commands on discord.

`npm start` to start the application.

```
/play query:String  // Receives a string to look for the song and play the song in user's current  voice channel
/leave // Disconnect bot from voice channel
/pause // Pause and unpause music
/skip // Skip music
```

The bot maintains a music queue for each discord guild.

The bot will disconnect from voice channel if it stays in idle state (not playing music) for 30 seconds.
