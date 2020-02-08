const express = require('express');
const path = require('path');
const {key, secret, token, sid } = require('./config.js');
const { connect } = require('twilio-video');
// require('dotenv').load();



const app = express();
const PORT = process.env.PORT || 3000;


var AccessToken = require('twilio').jwt.AccessToken;

var VideoGrant = AccessToken.VideoGrant;


// Substitute your Twilio AccountSid and ApiKey details
var ACCOUNT_SID = sid;
var API_KEY_SID = key;
var API_KEY_SECRET = secret;

// Create an Access Token
var accessToken = new AccessToken(
  ACCOUNT_SID,
  API_KEY_SID,
  API_KEY_SECRET
);

// Set the Identity of this token
accessToken.identity = 'example-user';

// Grant access to Video
var grant = new VideoGrant();
grant.room = 'cool room';
accessToken.addGrant(grant);

// Serialize the token as a JWT
var jwt = accessToken.toJwt();
console.log(jwt);

connect(jwt, { name: 'my-new-room' }).then(room => {
  console.log(`Successfully joined a Room: ${room}`);
  room.on('participantConnected', participant => {
    console.log(`A remote Participant connected: ${participant}`);
  });
}, error => {
  console.error(`Unable to connect to Room: ${error.message}`);
});

// Serve static files. Any requests for specific files will be served if they exist in the provided folder
app.use(express.static(path.join(__dirname, '../client/dist')));


// Start the server on the provided port
app.listen(PORT, () => console.log('Listening on port: ' + PORT));