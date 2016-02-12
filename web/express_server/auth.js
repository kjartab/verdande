var passport = require('passport');

var Auth = (function(config, app, users) {

	passport.initialize();
	var FacebookStrategy = require('passport-facebook').Strategy;
	var GoogleStrategy = require('passport-google-oauth20').Strategy;

	passport.use(new FacebookStrategy({
	    clientID: FACEBOOK_APP_ID,
	    clientSecret: FACEBOOK_APP_SECRET,
	    callbackURL: "http://localhost:3000/auth/facebook/callback"
	  },
	  function(accessToken, refreshToken, profile, done) {
	  	done(null, {profile: profile, accessToken: accessToken });
	  }
	));


	passport.use(new GoogleStrategy({
	    clientID: config.googleClientID,
	    clientSecret: config.googleClientSecret,
	    callbackURL: "http://localhost:3000/auth/google/callback"
	  },
	  function(accessToken, refreshToken, profile, done) {
	  	// users.createOrFind(profile);
	    /// store the user TO DATABASE
	    done(null, {profile: profile, accessToken: accessToken });
	  }
  ));	


	app.get('/auth/google', passport.authenticate('google', { session: false, scope: ['profile'] }));

	app.get('/auth/google/callback',
		passport.authenticate('google', { session: false, failureRedirect: "/" }),
		function(req, res) {
		console.log(res.accessToken);
		console.log(res,req);
		res.set("TOKEN", "test");
		res.redirect("/");
		// res.set('TOKEN');
		// res.send("yes");
		// res.redirect("/profile?access_token=" + req.user.access_token);
	});


	app.get('/auth/facebook',
	    passport.authenticate('facebook', { session: false, scope: [] })
	);

	app.get('/auth/facebook/callback',
	  passport.authenticate('facebook', { session: false, failureRedirect: "/" }),
	  function(req, res) {
	  	res.set('TOKEN', "test");
	  	res.redirect('/verdande/web/html');
	  }
	);

	function checkToken(token) {
		return true;
	}


	return {
		checkToken: checkToken
	}

})(config);


