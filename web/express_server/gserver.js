var express = require('express');
var passport = require('passport');
var config = require('./config');

var GoogleStrategy = require('passport-google-oauth20').Strategy;

var app = express();

var clients = {}


var rand = function() {
    return Math.random().toString(36).substr(2); // remove `0.`
};

var token = function() {
    return rand() + rand(); // to make it longer
};

console.log(config);
passport.use(new GoogleStrategy({
    clientID: config.googleClientID,
    clientSecret: config.googleClientSecret,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // console.log(user);
    /// store the user TO DATABASE

    // console.log(profile);
    // token(); // "bnh5yzdirjinqaorq0ox1tf383nb3xr"

    done(null, {profile: profile, accessToken: accessToken });
  }
  ));


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.get('/hello', function (req, res) {
  res.send('Hello World!');
});

app.get('/auth/google', passport.authenticate('google', { session: false, scope: ['profile'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: "/" }),
  function(req, res) {
    console.log(res.accessToken);
    console.log(res,req);
    res.set("TOKEN", "test");
    res.redirect("/")
    // res.set('TOKEN');
    // res.send("yes");
    // res.redirect("/profile?access_token=" + req.user.access_token);
  });

app.get('/',
  function(req, res) {

  });