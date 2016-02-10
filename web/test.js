const net = require("net");
var http = require("http");

    process.title = 'overskya';

    clients = []

    var webSocketsServerPort = 8000;
    var webSocketServer = require('websocket').server;
    var http = require('http');

    /**
     * HTTP server
     */
    var httpServer = http.createServer(function(request, response) {
        
    });

    httpServer.listen(webSocketsServerPort, function() {
        console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
    });

    /**
     * WebSocket server
     */
    var wsServer = new webSocketServer({
        httpServer: httpServer
    });


    wsServer.on('request', function(request) {
        console.log((new Date()) + ' Connection from origin ' + request.origin + '.');
        var connection = request.accept(null, request.origin); 
        var index = clients.push(connection) - 1;

        console.log((new Date()) + ' Connection accepted.');


        // user disconnected
        connection.on('close', function(connection) {
                clients.splice(index, 1);
        });

    });



