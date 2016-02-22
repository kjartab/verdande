var express = require('express');
var app = express();
var moment = require('moment');
var cors = require('cors');
app.use(cors());

// var server = require('http').createServer()
var url = require('url')
var WebSocketServer = require('ws').Server
// var wss = new WebSocketServer({ server: server, path: "/api/ws" });
var config = require('./config');
var port = 3000;
var server = app.listen(port);
var wss = new WebSocketServer({ server: server, path: "/api/livedata/ws" });

config.server = "localhost:"+port;
var db = require('./db')(config);
var user = require('./user')(config, db);
var auth = require('./auth')(config, app, user, "/db");


var rand = function() {
    return Math.random().toString(36).substr(2); // remove `0.`
};

var generateToken = function() {
    return rand() + rand(); // to make it longer
};


var cache = {};
var connections = {};

function authorize(token) {
    
    if (cache.hasOwnProperty(token)) {
        return true;
    }

}

app.get('/api', function(req, res, next) {
    res.set('verdandetoken','test');
    res.send("testdsdf");
    res.end();
});


app.get('/api/user/', function(req, res, next) {
    res.send("users ");
    res.end();
});


app.get('/api/user/{id}', function(req, res, next) {
    res.send("user with id");
    res.end();
});

app.get('/db', function (req, res) {
    db.query('SELECT * from v_user;', null, function(err, result) {
        res.send(result.rows);
    });

});

app.get('/error', function(req, res) {
    res.send('uhoh');
})


var clients= {};
var wsClients = {};

function parseMessage(message) {
    var data = null;
    try {
        data = JSON.parse(message);
    } catch(e) {

    }
    return data;
}

function handleClientsUpdate(data, userId) {    
    var payload = getValidatedPayload(data);
    if (payload) {

        var update = user.storePayload(payload);
        

        console.log("timestamped update");
    }
}

function getValidatedPayload(data) {
    if (data && data.hasOwnProperty('payload')) {            
        var payload = data.payload;
        if (payload.hasOwnProperty('timestamp')) {
            return payload;
        }
    }
    return null;
}


function handleMessage(socketData, callback) {
    var data = parseMessage(socketData);

    if(data) {
        console.log("data is here");
        switch(data.type) {
            case 'tokenResponse':
                console.log("token response");
                // what happens 

            break;
                
            case 'clientUpdates':
                var authorizedUserId = user.authorize(data.verdande_token);
                if (authorizedUserId) {
                    handleClientsUpdate(data.clientUpdate, authorizedUserId);
                } else {
                    callback({
                        error : {
                            code : 401,
                            message : "Unauthorized"
                        }
                    });
                }
                
            break;


            default:
            break;
        }
    } else {
        console.log("data is null");
    }

}

wss.on('connection', function connection(ws) {

    var access_token = generateToken();
    
    ws.on('message', function incoming(data, flags) {
        handleMessage(data);
    });
    
});



wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        client.send(data);
    });
};

function getNewUserUpdates() {

}


function getUsers(timeDelta, userFilter) {
    return {
        users: [
            {
                "id" : "1",
                "username" : "username",
                "image" : "base64img",
                "data" : [
                    {
                        timestamp : "",
                        properties : "props"
                    }
                ]
            }
        ]
    }
}

function getUsersUpdates(timeDelta, userFilter) {
    return {
        usersupdates: [
            { 
                id : "1",
                data : [
                    { 
                        timestamp : "", 
                        properties : "props"
                    }
                ]
            },
            {
                id : "2",
                data : [
                    { 
                        timestamp : "", 
                        properties : "props"
                    }
                ]
            }
        ]
    }
}

function broadcastUserData() {
    var data = getUsersUpdates();
    wss.broadcast(data);
}
    

function timeouteSend() {
    setTimeout(function() {

        var data = {
            type : 'dataupdate',
            uservalue : "52"
        }

        wss.broadcast(JSON.stringify(data));
        timeouteSend()
    }, 500);
}

timeouteSend();
