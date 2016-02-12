var express = require('express');
var wsHandler = require('./websocketHandler');
var user = require('./users');
var config = require('./config');
var auth = require('./auth');



var app = express();
var users = new Users(config);
var auth = new Auth(config, app, users);
var wsHandler = new websocketHandler(config, app, auth);

app.get('/', function (req, res) {
	if (!auth.validateRequest(req)) {

	}
  res.send('Hello World!');
});

app.get('/user/{id}', function (req, res) {
	if (!auth.validateRequest(req)) {
		
	}
});



app.get('/users', function (req, res) {
	// return user information

});
