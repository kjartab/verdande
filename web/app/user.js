module.exports = function(config, db) {

	function findOrCreate(profile, accessToken, done) {

        function success(data) {
            console.log("SUCCESS!");
            done(null, data);
        }

        function error(err) {
            done(err);
        }
        
        function handleNewUser(profile, accessToken) {
            createUser(profile, accessToken, success, error);
        }

        getExistingUser(profile, accessToken, success, error, handleNewUser);
    
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
        success("test", {user : user, verdandeToken : "tokenv"})
        // db.query("
        //     insert into verdande_user(id, name, email) values (---);
        //     insert into token_store(verdande_token, access_token, token_creation_time) values (---);
        //     "),
        //     function(err, result) {
        //         if (err) {
        //             error(err);
        //         } else {
        //             success(null, result);
        //         }
        //     });
    }
    

    function getLoggedInUser(verdandeToken, success, error) {

        // db.query("
        //     SELECT u.id, u.name, u.email, t.token, t.token_creation_time 
        //     from verdande_user u
        //     where verdande_token="+verdandeToken +";",
        //     function (err, res) {
        //         if (err) {
        //             done(err);
        //         } else {

        //         }
        //     });
    }

    function logoutUser(verdandeToken) {

    }

    function storeUserUpdate(verdandeToken, persistent) {
        db.query('INSERT INTO ')
    }

    function getExistingUser(profile, accessToken, success, error, handleNewUser) {

        // res = db.query("
        //     select u.id, u.name, u.email, t.token, t.tokencreatetime 
        //     from verdande_user u
        //     left join tokenstore t on u.id=t.uid;",
        //     function(err, result) {
        //         if (result.rows.length == 0) {
        //             handleNewUser(profile, accessToken);
        //         } else if (result.rows.length > 0) {
        //             var userToken = parseUserToken(result.rows[0]);
        //             success(null, user);
        //         } else {
        //             error(err);
        //         }
        //     });


        var tokenCreationTime = "now";
        var user = {
            id : uuid(),
            name : "kjartan",
            email : "kjartanbjorset@gmail.com"
        };
        success(null, {user : user, verdandeToken : "tokenv"}); 
    }

    function parseUserToken(row) {
        return null;
    }

    return {
        findOrCreate : findOrCreate
    }

};
