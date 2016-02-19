var express = require('express');
var passport = require('passport');
var config = require('./config');

var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;

var app = express();

var clients = {}

app.use(express.static('public'));

app.use(passport.initialize());

passport.use(new FacebookStrategy({
    clientID: config.auth.facebook.APP_ID,
    clientSecret: config.auth.facebook.APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {  
  	done(null, {profile: profile, accessToken: accessToken });
  }
));



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});



// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get(
  '/auth/facebook',
    passport.authenticate('facebook', { session: false, scope: [] })
);

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { session: false, failureRedirect: "/" }),
  function(req, res) {
  	console.log(res.accessToken);
  	console.log(res,req);
  	res.set('TOKEN', "test");
  	res.send("yes");
    // res.redirect("/profile?access_token=" + req.user.access_token);
  }
);