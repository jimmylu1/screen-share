const express = require("express");
const twilio = require("twilio");
const { key, secret, roomToken, sid } = require("./config.js");
const path = require("path");

const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const PORT = 3000;

const app = express();
app.use(express.static(path.join(__dirname, "../client/dist")));
app.listen(PORT, () => console.log("Listening on port: " + PORT));

// use /token endpoint to get an access token that will let us make the call
app.get("/token", (req, res) => {
  var ACCOUNT_SID = sid;
  var API_KEY_SID = key;
  var API_KEY_SECRET = secret;
  //generate new token
  const token = new AccessToken(ACCOUNT_SID, API_KEY_SID, API_KEY_SECRET);
  //grant acess to token
  token.addGrant(new VideoGrant());

  token.identity = req.query.user;

  //send back to client
  res.send({ token: token.toJwt() });
});
