const net = require("net");
var webSocketServer = require('websocket').server;
var http = require("http");

process.title = 'verdande-server';


var dataServer = (function(config)  {

    var httpServer;
    var wsServer;
    var clients = [];
    var setWebscoketRequestCallback;
    var httpServerRequestCallback;

    function init(config) {

        httpServer = http.createServer(handleHttpRequest);

        httpServer.listen(config.serverPort, function() {
            console.log((new Date()) + " Server is listening on port " + config.serverPort);
        });

        wsServer = new webSocketServer({
            httpServer: httpServer
        });

        wsServer.on('request', handleWsRequest);

        console.log("initialized");
    }

    function handleHttpRequest(request, response) {
        console.log(request);
        if (httpServerRequestCallback) {
            httpServerRequestCallback(request, response);
        }
        response.end("test");
    }

    function handleWsRequest(request) {

        console.log((new Date()) + ' Connection from origin ' + request.origin + '.');
        var connection = request.accept(null, request.origin); 
        var index = clients.push(connection) - 1;

        console.log((new Date()) + ' Connection accepted.');
        
        connection.sendUTF(JSON.stringify( { heartRate: "test"} ));

        // user disconnected
        connection.on('close', function(connection) {
            clients.splice(index, 1);
        });

    }

    function setHttpServerRequestCallback(callback) {
        httpServerRequestCallback = callback;
    }

    function setWebscoketRequestCallback(callback) {
        webscoketRequestCallback = callback;
    }

    function sendUtfDataToClients(json) {
        if (clients.length > 0) {
            for (var i=0; i < clients.length; i++) {
                clients[i].sendUTF(json);
            }
        }
    }

    init(config);

    return {
        sendUtfDataToClients: sendUtfDataToClients,
        setWebscoketRequestCallback : setWebscoketRequestCallback,
        setHttpServerRequestCallback: setHttpServerRequestCallback
    }
});

module.exports = dataServer;
