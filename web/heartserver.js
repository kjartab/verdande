const net = require("net");
var http = require("http");

    process.title = 'hserver';

    var heartRate = 0;
    var PORT = 8222;


    var clients = [];


    //We need a function which handles requests and send response
    function handleRequest(request, response){
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

    function handlePost(req, res) {
                
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


    function updateData() {

        if (clients.length > 0) {
            var json = JSON.stringify( { heartRate: heartRate} );
            for (var i=0; i < clients.length; i++) {
                clients[i].sendUTF(json);
            }
        }
    }


    //Create a server
    var httpServer = http.createServer(handleRequest);

    //Lets start our server
    httpServer.listen(PORT, function(){
        //Callback triggered when server is successfully listening. Hurray!
        console.log("Server listening on: http://localhost:%s", PORT);
    });


    clients = []

    var webSocketsServerPort = 8223;
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


        connection.sendUTF(JSON.stringify( { heartRate: heartRate} ));
        // user disconnected
        connection.on('close', function(connection) {
                clients.splice(index, 1);
        });

    });

