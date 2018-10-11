// require("dotenv").config();
let request = require("request");
require("dotenv").config();


// let spotify = new Spotify(keys.spotify);
let command = process.argv[2];
let query = process.argv[3];

switch(command){
    case "concert-this":
    let artist = process.argv[3];

    request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function(error, response, body){
        console.log("error: ", error);
        console.log("statusCode: ", response && response.statusCode);
        console.log("body:" + body);
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