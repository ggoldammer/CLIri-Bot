// require("dotenv").config();
let request = require("request");
var moment = require('moment');
require("dotenv").config();

let keys = require("./keys.js");
let Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);


// let spotify = new Spotify(keys.spotify);
let command = process.argv[2];
let search = process.argv[3];

if (!process.argv[3] === undefined){
    var input = process.argv.slice(3).join(' ');
}

switch (command) {
    case "concert-this":
        request("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp", function (error, response, body) {
            let concertInfo = JSON.parse(body);
            // console.log("error: ", error);
            // console.log("statusCode: ", response && response.statusCode);
            // console.log("body: " + concertInfo);

            for (let i = 0; i < 5 && i < concertInfo.length; i++) {
                console.log('Venue: ' + concertInfo[i].venue.name + '\n' +
                    'Location: ' + concertInfo[i].venue.city + ', ' +
                    concertInfo[i].venue.country);

                var partyDate = concertInfo[i].datetime.split('T')[0];

                partyDate = moment(partyDate, 'YYYY-MM-DD').format('MMM DD, YYYY');

                if (partyDate) {
                    console.log('Date: ' + partyDate + '\n');
                } else {
                    console.log('Date: TBA');
                }
            }
        });
        break;
    case "spotify-this-song":

        break;
    case "movie-this":

        break;
    case "do-what-it-says":

        break;
    default:
        console.log("Incorrect command. The following commands are:\n concert-this [insert song/band name]\nspotify-this-song [insert song name]\nmovie-this [insert movie name here]\ndo-what-it-says");
}