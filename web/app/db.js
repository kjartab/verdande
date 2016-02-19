var pg = require('pg');


module.exports = function(config){

    function getConnectionString(pgConfig) {
        var pgConString = "postgres://"+ pgConfig.user + ":" + pgConfig.password + "@" + pgConfig.host + "/" + pgConfig.database;
        return pgConString;
    }
    
    var conString = getConnectionString(config.postgresql);
        
    function query(text, values, callback) {
       pg.connect(conString, function(err, client, done) {
            
            if(err) {
                return console.error('error fetching client from pool', err);
            }

            client.query("select * from v_user", null, function(err, result) {
                done();

                if(err) {
                  return console.error('error running query', err);
                }
                console.log(err);
                callback(err, result);
            });


        });
            
    }

    return  {
        query : query
    }

}

