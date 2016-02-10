var http = require('http');

//Lets define a port we want to listen to
const PORT=8099; 

//We need a function which handles requests and send response
function handleRequest(request, response){
	if (request.method === 'POST') {
		handlePost(request,response);
	    response.end('Post');
	    updateClients();
	} else {

 	   response.end('mhm..');
	}
}

function handlePost(req, res) {

    console.log("[200] " + req.method + " to " + req.url);
    var fullBody = '';
    
    req.on('data', function(chunk) {
		fullBody += chunk.toString();
    });

	req.on('end', function() {
		res.writeHead(200, "OK", {'Content-Type': 'text/html'});
		console.log(fullBody);
		res.end();
	});
}

function updateClients() {
	
    if (clients.length > 0) {
        var json = JSON.stringify( { type: 'status', data: data} );
        for (var i=0; i < clients.length; i++) {
            clients[i].sendUTF(json);
        }
    }
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});