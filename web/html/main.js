

var verd = verd || {};

(function(ns) {
    "use strict";    

    ns.app = function(config) {

        var subscriptions = {};
        var connection;
        var sendAction;
        var position;

        function initialize() {
            window.WebSocket = window.WebSocket || window.MozWebSocket;
        }

        function establishConnection() {
            
            var connection = new WebSocket(config.serverAddress);

            connection.onopen = function () {

                var token = getToken();
                getSettings()
                if (token) {
                    connection.send({'verande_token' : token });
                }
            };

            connection.onerror = function (error) {
                // just in there were some problems with conenction...
                console.log("ERROR");
            };

            // most important part - incoming messages
            connection.onmessage = function (message) {
                // var json = JSON.parse(message.data);
                
                k = handleMessage(message);

                // servers.addStatus(json.data.id, json.data);
            };
        }


        function handleMessage(message) {
            var data = parseMessage(message);
            if (data) {
                if (data.type === 'dataupdate') {
                    if ($('.triangles').is(':visible')) {
                        setTimeout(function(){
                            $('.triangles').hide();
                        }, 500);
                    }
                    $('#contributors').text(data.uservalue);
                }
            }
        }

        function parseMessage(message) {
            console.log(message.data);
            var data = null;
            try {
                data = JSON.parse(message.data);                
            } catch (e) {

            }
            return data;
        }

        function getClientUpdate() {
            var data = {
                verdandeToken : "test",
                type: "clientUpdate",
                clientUpdate : {
                    position : position,
                    timestamp : position.timestamp
                }
            }
            return data;
        }

        function getPosition(geolocation) {
            var coords = geolocation.coords;
            return {
                timestamp: geolcation.timestamp,
                latitude: coords.latitude,
                longitude: coords.longitude,
                altitude: coords.altitude,
                accuracy: coords.accuracy,
                speed: coords.speed,
                heading: coords.heading,
                altitudeAccuracy: coords.altitudeAccuracy
            }
        }

        function sendUpdate() {
            if (connection) {
                connection.send(getClientUpdate());
            }
        }


        function startSubscribe() {

            geoAction = setInterval(updatePosition, 200);
            sendAction = setInterval(function() {
                sendUpdate();
            }, 500);
        }

        function stopSubscribe() {
            clearInterval(sendAction);
        }

        function updatePosition() {
            getLocation(function(data) {
                position = getPosition(data);
            });
        }

        function getLocation(callback) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(data) {
                    callback(data);
                });
            } else {
            
            }
        }

        return {
            establishConnection: establishConnection,
            startSubscribe: startSubscribe,
            stopSubscribe: stopSubscribe,
            startPush: startPush,
            stopPush: stopPush
        }
    }


})(verd);