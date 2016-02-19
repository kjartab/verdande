var passport = require('passport');

// var Auth = function(config, app, users) {

//     passport.initialize();
//     var FacebookStrategy = require('passport-facebook').Strategy;
//     var GoogleStrategy = require('passport-google-oauth20').Strategy;

//     passport.use(new FacebookStrategy({
//         clientID: config.auth.facebook.APP_ID,
//         clientSecret: config.auth.facebook.APP_SECRET,
//         callbackURL: config.server + "/auth/facebook/callback"
//       },
//       function(accessToken, refreshToken, profile, done) {
//         done(null, {profile: profile, accessToken: accessToken });
//       }
//     ));


//     passport.use(new GoogleStrategy({
//         clientID: config.auth.google.clientID,
//         clientSecret: config.auth.google.clientSecret,
//         callbackURL: config.server + "/auth/google/callback"
//       },
//       function(accessToken, refreshToken, profile, done) {
//         // users.createOrFind(profile);
//         /// store the user TO DATABASE
//         done(null, {profile: profile, accessToken: accessToken });
//       }
//   ));   


//     app.get('/auth/google', passport.authenticate('google', { session: false, scope: ['profile'] }));

//     app.get('/auth/google/callback',
//         passport.authenticate('google', { session: false, failureRedirect: "/" }),
//         function(req, res) {
//         console.log(res.accessToken);
//         console.log(res,req);
//         res.set("TOKEN", "test");
//         res.redirect("/");
//         // res.set('TOKEN');
//         // res.send("yes");
//         // res.redirect("/profile?access_token=" + req.user.access_token);
//     });


//     app.get('/auth/facebook',
//         passport.authenticate('facebook', { session: false, scope: [] })
//     );

//     app.get('/auth/facebook/callback',
//         passport.authenticate('facebook', { session: false, failureRedirect: "/" }),
//         function(req, res) {
//             res.set('TOKEN', "test");
//             res.redirect('/verdande/web/html');
//         }
//     );

//     function checkToken(token) {
//         return true;
//     }


//     return {
//         checkToken: checkToken
//     }

// };

// module.exports = Auth;



var Auth = function(config, app, users, postCallbackUrl) {

var FacebookStrategy = require('passport-facebook').Strategy
var GoogleStrategy = require('passport-google-oauth20').Strategy;   
// app.use(express.static('public'));

app.use(passport.initialize());

console.log(users);

var authCache = {}



setupStrategies(users.findOrCreate);
setupAuthEndPoints(postCallbackUrl);

function setupStrategies(userCallback) {


    passport.use(new GoogleStrategy({
            clientID: config.auth.google.clientID,
            clientSecret: config.auth.google.clientSecret,
            callbackURL: "http://localhost:3000/auth/google/callback"
        },
        function(accessToken, refreshToken, profile, done) {
            // userCallback(accessToken, profile, done);
            done(null, profile);
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
            console.log("TAA");
            res.send(res);
            // res.set('verdande_token', res.verdandeToken);
            // res.set('verdande_uid', res.verdande_user.uid);
            // res.redirect(postCallbackUrl);
        }
    );

    app.get('/auth/google', 
        passport.authenticate('google', { session: false, scope: ['profile'] })
    );

    app.get('/auth/google/callback',
        passport.authenticate('google', { session: false, failureRedirect: "/error" }),
        function(req, res) {  
            res.set('verdande_token', res.verdandeToken);
            res.redirect("/db");
        });


    }

}


module.exports = Auth;