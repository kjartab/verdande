module.exports = function(config, db) {


    var cache = {};

	function findOrCreate(profile, accessToken, done) {

        function success(data) {

            console.log(data);
            console.log(cache);
            console.log()
            console.log("SUCCESShandleNewUser!");
            // console.log(data.verdandeToken);
            done(null, data);
        }

        function error(err) {
            done(err);
        }
        
        function handleNewUser(profile, accessToken) {
            createUser(profile, accessToken, success, error);
        }

        if (cache.hasOwnProperty()) {
            getExistingUser(profile, accessToken, success, error, handleNewUser);
        } else {
            handleNewUser(profile, accessToken);
        }
    
	}

    function cacheHit(profile, verdandeToken) {

    }

    function uuid() {
        return "testairjao";
    }

    function createUser(profile, accessToken, success, error) {

        var tokenCreationTime = "now";
        var user = {
            id : uuid(),
            name : "kjartan",
            email : "kjartanbjorset@gmail.com"
        };
        db.query("\
            INSERT INTO verdande_user(id, name, email) \
            VALUES ('" + user.id + "' '" + user.name + "', '" + user.email + "'; ",
            function(err, data) {
                console.log(data);
            });

        success({user : user, verdandeToken : "tokenv"});
    }

    function logoutUser(verdandeToken) {

    }

    function deleteUser(verdandeToken) {

    }


    function storeUserUpdate(verdandeToken, persistent) {
        db.query('INSERT INTO ')
    }

    function getExistingUser(profile, accessToken, success, error, handleNewUser) {

        res = db.query("\
            SELECT \
                u.id, u.name, u.email, t.token, t.token_creation_time \
            FROM \
                verdande_user u \
            LEFT JOIN \
                verdande_token t \
            ON u.id = t.uid \
            ORDER BY t.token_creation_time DESC \
            LIMIT 1; \
            ",
            function(err, result) {
                if (result.rows.length === 0) {
                    handleNewUser(profile, accessToken);
                } else if (result.rows.length > 0) {
                    res = result.rows[0];

                    var userToken = parseUserToken(result.rows[0]);

                    success({
                        verdandeToken : "test",
                        user: userToken 
                        });

                } else {
                    if (err) {
                        error(err);                        
                    } else {
                        error({
                            statusCode : 401,
                            statusMessage : "Unauthorized"
                        });
                    }
                }
            });


        var tokenCreationTime = "now";
        
        success({user : getMockUser(), verdandeToken : "tokenv"}); 
    }

    function getMockUser(token) {
        var user = {
            id : uuid(),
            name : "kjartan",
            email : "kjartanbjorset@gmail.com"
        };
    }

    function parseUserToken(row) {
        console.log(row);
        return getMockUser();
    }

    function getUserByToken(token) {
        var user = cacheHit(token);
        if (user) {
            return user;
        } else {
            
        }
        return getMockUser(token);
    }

    function getUserById(id) {

    }

    function authorize(token) {
        return getUserByToken(token);
    }

    return {
        authorize: authorize,
        getUserById : getUserById,
        getUserByToken: getUserByToken,
        findOrCreate : findOrCreate
    }

};
