var net = require('net');
var http = require("http");
var config = require('./config.js');
var dataServer = require('./dataserver.js');

console.log("test");


var dataServer = new dataServer(config);

var userData = {};

console.log(dataServer);



//We need a function which handles requests and send response
function handleHttpRequest(request, response){
    if (request.method === 'POST') {
        handlePost(request,response);
        console.log("post");
        response.end('Post');
    } else {
        fullBody = request.url;
        console.log(request.url);
        response.end('mhm..');
    }
}

function handleHttpPost(req, res) {
            
    var fullBody = '';
    
    req.on('data', function(chunk) {
      fullBody += chunk.toString();
    });

    req.on('end', function() {
        heartRate = fullBody;
        updateData();
        console.log(heartRate);
        res.end();
    });
}

function notifyClients() {
    var json = JSON.stringify( { heartRate: heartRate, lat : lat, lng : lng } );
    dataServer.sendUtfDataToClients(json);
}


dataServer.setWebscoketRequestCallback(null);

dataServer.setHttpServerRequestCallback(handleHttpRequest);