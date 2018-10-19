//REQUIREMENTS
const request = require('request');
const fs = require('fs');
const Spotify = require('node-spotify-api');
const dotenv = require('dotenv').config();
const keys = require('./keys.js');
const spotify = new Spotify(keys.spotify);
//if third input from user is spotify-this-song then run spotify call
if(process.argv[2] === 'spotify-this-song'){
//Puts words for song in a string starting at the forth word till the end of the input
  let song = process.argv.slice(3, process.argv.length).join(' ');
  //spotify call
spotify.search({ type: 'track', query: song }, function(err, data) {
  //if there is an error, return in console
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    //loop thru data in order to pick out items for each response
   for(let i = 0; i < data.tracks.items.length; i++){
    //display each specific item from the data object
    console.log("ARTISTS: " + data.tracks.items[i].artists[0].name);
    console.log("SONG NAME: " + data.tracks.items[i].name); //song name
    console.log("ALBUM NAME: " + data.tracks.items[i].album.name); //album name
    console.log("PREVIEW URL: " + data.tracks.items[i].preview_url); //album name
    console.log("------------------------------------------------------------------------------")
   
   }
 
  });
  //if third input from user is movie-this then run ombd call
} else if (process.argv[2] === 'movie-this'){
  //Puts words for movie in a string starting at the forth word till the end of the input
  let movieName = process.argv.slice(3, process.argv.length).join(' ');
  let queryUrl = `http://www.omdbapi.com/?t=${movieName}&y=&plot=short&apikey=trilogy`;
    request(queryUrl, function (error, response, body) {
     //display each specific response from body using parse to make it easier to find
      console.log('TITLE:', JSON.parse(body).Title); 
      console.log('YEAR:', JSON.parse(body).Year);
      console.log('IMDB RATING:', JSON.parse(body).imdbRating);
      console.log('Rotten Tomatoes Rating:', JSON.parse(body).Ratings[0].Value);
      console.log('COUNTRY:', JSON.parse(body).Country);
      console.log('LANGUAGE:', JSON.parse(body).Language);
      console.log('PLOT:', JSON.parse(body).Plot);
      console.log('ACTORS:', JSON.parse(body).Actors);
      console.log('------------------------------------------------------------------------------');
    });
  //if third input from user is concert-this then run bands call
} else if (process.argv[2] === "concert-this") {
  //joins all words together starting at the third index and going till the end of the input
  let artist = process.argv.slice(3, process.argv.length).join(' ');
  let queryUrl = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`;
  // const date = new Date().toDateString;
  request(queryUrl, function(err, res, body){
    let d = JSON.parse(body)[0].datetime;
    let date = new Date(d)
    // console.log(JSON.parse(body));
    console.log(`See ${artist} Live`)
    console.log('--Venue: ', JSON.parse(body)[0].venue.name);
    console.log('--Location:', JSON.parse(body)[0].venue.city, JSON.parse(body)[0].venue.region);
    console.log('--Date:', date.toDateString());
  });
  
} else if (process.argv[2] === "do-what-it-says") {
  function search() {
    fs.readFile('random.txt', "utf8", function(err, data){
    splitText = data.split(',');
    command = splitText[0];
    song = splitText[1];
    
    console.log(`node liri.js ${command} ${song}`);
  
});
}

search();

}



