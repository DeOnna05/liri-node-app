//REQUIREMENTS
const express = require('express');
const app = express();
require('./routes/routes.js')(app);
const path = require('path');
const Spotify = require('node-spotify-api');
const PORT = 8080;

const dotenv = require('dotenv').config();
let movieName = "cinderella";
// let queryUrl = `http://www.omdbapi.com/?t=${movieName}&y=&plot=short&apikey=trilogy`;
const keys = require('./keys.js');
// const track = process.argv[2];

const spotify = new Spotify(keys.spotify);

spotify.search({ type: 'track', query: "What's My Age Again" }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 
  });
//ROUTES - will be moved to routes files later
app.get('/v1/album/:track', function(req, res){
    res.json({success:true})
    console.log(data)  
});

// Listener
app.listen(PORT, function(){
    console.log(`App is now listening on PORT ${PORT}`)
  });


