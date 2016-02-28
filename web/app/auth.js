var passport = require('passport');
var Auth = function(config, app, users, postCallbackUrl) {

var FacebookStrategy = require('passport-facebook').Strategy
var GoogleStrategy = require('passport-google-oauth20').Strategy;   
// app.use(express.static('public'));

app.use(passport.initialize());

var authCache = {}

setupStrategies(users.findOrCreate);
setupAuthEndPoints(postCallbackUrl);

function setupStrategies(userCallback) {

    passport.use(new FacebookStrategy({
            clientID: config.auth.facebook.APP_ID,
            clientSecret: config.auth.facebook.APP_SECRET,
            callbackURL: "http://localhost:3000/auth/facebook/callback"
        },
        function(accessToken, refreshToken, profile, done) {
            userCallback(accessToken, profile, done);
        })
    );

    passport.use(new GoogleStrategy({
            clientID: config.auth.google.clientID,
            clientSecret: config.auth.google.clientSecret,
            callbackURL: "http://localhost:3000/auth/google/callback"
        },
        function(accessToken, refreshToken, profile, done) {
            userCallback(accessToken, profile, done);
        })
    );   

}

function setupAuthEndPoints(postCallbackUrl) {

    app.get('/auth/facebook',
        passport.authenticate('facebook', { session: false, scope: [] })
    );

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { session: false, failureRedirect: "/" }),
        function(req, res) {
            res.set('verdande_token', res.verdandeToken);
            res.set('Location', 'http://localhost/verdande/web/html/');
            res.statusCode = 302;
            res.send();
        }
    );

    app.get('/auth/google', 
        passport.authenticate('google', { session: false, scope: ['profile'] })
    );

    app.get('/auth/google/callback',
        passport.authenticate('google', { session: false, failureRedirect: "/error" }),
        function(req, res) {
            res.set('verdande_token', req.user.verdandeToken);
            // res.set('Location', 'http://localhost/verdande/web/html/');
            // res.send();
            // res.statusCode = 302;
            res.send("<html>Redirecting...</html><body><script>window.location.href='http://localhost/verdande/web/html'</script></body>");
        });


    }

}


module.exports = Auth;