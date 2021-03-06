# CLIri-bot
## Summary & Goal

CLIri is a Command Line Interface (CLI) bot, which is a command based assistant that returns relevant information based on the given command. The name may or may not be a play on words with the CLI acronym and Apple's Siri assistant. :stuck_out_tongue:

This was a Node.js project for the University of Arizona Coding Bootcamp.

## How to Use CLIri Bot

[CLICK HERE TO VIEW A VIDEO DEMONSTRATION OF THE WORKING APP](https://github.com/ggoldammer/CLIri-Bot/blob/master/Liri%20Bot%20Demo.webm)

1. Make sure to clone this repo.

2. Create a `.env file,` with the following information inside of it:
```
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

```

You'll want to make sure you replace the `your-spotify-id` and `your-spotify-secret` with your own spotify API key information. You may create your Spotify API keys here:

https://developer.spotify.com/dashboard/login


3. Run `npm install` to install package.json

4. Use the following commands:

- Search for Concerts: `node ./liri.js concert-this <band-name>`
- Search Spotify: `node ./liri.js spotify-this-song <song-name>`
- Search for Movie Info: `node ./liri.js movie-this <movie-name>`
- Random Song Search: `node ./liri.js do-what-it-says`

## Technologies Used

- JavaScript
- Node.js
- OMDB API
- Spotify API
- Bands In Town API
- Moment.js NPM Package
- FS NPM Package
- Require NPM Package
