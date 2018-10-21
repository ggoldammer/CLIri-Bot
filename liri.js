require("dotenv").config();
let request = require("request");
let moment = require("moment");
let fs = require("fs");
let keys = require("./keys.js");
let Spotify = require("node-spotify-api");
require("dotenv").config();
let omdbAPI = "trilogy";

var spotifyKeys = new Spotify(keys.spotify);

let command = process.argv[2];
//For loop below joins everything after index 2 into a string, allowing for multiple word inputs.
let searchArray = [];
for (let i = 3; i < process.argv.length; i++) {
    searchArray.push(process.argv[i]);
}
var search = searchArray.join(" ");

switch (command) {
    // Search for Concert Info
    case "concert-this":
        concertSearch(search);
        break;
    // Search for Spotify Info
    case "spotify-this-song":
        if (process.argv.length < 4) {
            search = "The Sign Ace of Base";
            spotifySearch(search);
            return;
        }
        spotifySearch(search);
        break;
    // Search for Movie Info
    case "movie-this":
        if (process.argv.length < 4) {
            search = "Mr+Nobody";
            movieSearch(search);
            return;
        }
        movieSearch(search)
        break;
    // Randomly picks item from Random.txt
    case "do-what-it-says":
        fs.readFile("./random.txt", "utf8", function (err, data) {
            let dataArray = data.split(",");

            spotifyKeys.search({ type: 'track', query: dataArray[1] }, function (err, data) {

                if (err) {
                    return console.log('Error: ' + err);
                }
                console.log("\nArtist: " + data.tracks.items[0].artists[0].name);
                console.log("Song Name: " + data.tracks.items[0].name);
                console.log("Song Preview: " + data.tracks.items[0].preview_url);
                console.log("Album: " + data.tracks.items[0].album.name + "\n");
            });
        });
        break;

    default:
        console.log("Incorrect command. The following commands are:\n\nconcert-this [insert song/band name]\nspotify-this-song [insert song name]\nmovie-this [insert movie name here]\ndo-what-it-says");
}

function movieSearch(search) {
    request("http://www.omdbapi.com/?apikey=" + omdbAPI + "&t=" + search, function (err, response, body) {

        let results = JSON.parse(body);

        console.log("\nMovie Title: " + results.Title);
        console.log("Release Year: " + results.Year);
        console.log("IMDB Rating: " + results.Ratings[0].Value);
        console.log("Rotten Tomatoes Rating: " + results.Ratings[1].Value);
        console.log("Country Origin: " + results.Country);
        console.log("Language: " + results.Language);
        console.log("Plot: " + results.Plot);
        console.log("Actors: " + results.Actors + "\n");
    });
}

function spotifySearch(search) {
    spotifyKeys.search({ type: 'track', query: search }, function (err, data) {

        if (err) {
            return console.log('Error: ' + err);
        }

        console.log("\nArtist: " + data.tracks.items[0].artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Song Preview: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name + "\n");
    });
}

function concertSearch(search) {
    search.split(" ").join("+");

    request("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp", function (error, response, body) {
        let concertInfo = JSON.parse(body);

        if (concertInfo.length < 1){
            console.log("No concert information is available for this band.");
            return;
        }

        for (let i = 0; i < 5 && i < concertInfo.length; i++) {
            console.log('Venue: ' + concertInfo[i].venue.name + '\n' +
                'Location: ' + concertInfo[i].venue.city + ', ' +
                concertInfo[i].venue.country);

            var concertDate = concertInfo[i].datetime.split('T')[0];

            concertDate = moment(concertDate, 'YYYY-MM-DD').format('MMM DD, YYYY');

            if (concertDate) {
                console.log('Date: ' + concertDate + '\n');
            } else {
                console.log('Date: TBA');
            }
        }
    });
}