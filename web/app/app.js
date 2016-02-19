var express = require('express');
var app = express();
var cors = require('cors');
var config = require('./config');
app.use(cors());
var expressWs = require('express-ws')(app);

var users = require('./auth')
var users = require('./users')


// var cache = require('./cache');

var cache = {};

var connections = {};

app.get('/api', function(req, res, next){
    res.set('verdandetoken','test');
    res.send("testdsdf");
    res.end();
});

app.ws('/api/livedata', function(ws, req) {

    ws.on('message', function(message) {
        var msg = JSON.parse(message);
        ws.send("testsgag"+msg.test);
    });

});

app.ws('/api/livedata/listen', function(ws, req) {

    ws.on('message', function(message) {
        var msg = JSON.parse(message);
        if (cache.hasOwnProperty(msg.token)) {

        } else {
            generateToken();
        }
    });

});


app.listen(3000);

