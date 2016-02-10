



var heartRate = 0;


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


clients = []

