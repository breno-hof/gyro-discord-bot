# gyro-discord-bot
A music bot for Discord

`npm run register` to update bot commands on discord.
`npm start` to start the application.

```js
/play query:String  // Receives a string to look for the song and play the song in user's current  voice channel
/leave // Disconnect bot from voice channel
/pause // Pause and unpause music
/skip // Skip music
```

The bot maintains a music queue for each discord guild.

The bot will disconnect from voice channel if it stays in idle state (not playing music) for 30 seconds.
