var mongo = require('../../config/db.js');
var mongoURL = "mongodb://localhost:27017/ZuluInc";

exports.list_all_tasks = function(req, res) {
	res.sendFile("index.html", {"root": "./public/"});	
};

exports.addRequest = function(req, res) {
	console.log(req.body);
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);

        var coll = mongo.collection('requests');
        coll.insert(req.body.data, function(err, user)
		{
            var json_res;
            if (user) {
                json_res = {"statusCode" : 200,"id":user};
            } else {
                console.log("returned false login");
                json_res = {"statusCode" : 401};
            }
            console.log("RESPONSE"+json_res);
              res.send(json_res);
        });
	});
};

exports.getAllRequests = function(req, res) {
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);

        var coll = mongo.collection('requests');
        coll.find({}).toArray( function(err, user){
            if (user) 
            {
                json_res = {"statusCode" : 200,"requests":user};
            } 
            else 
            {
                json_res = {"statusCode" : 401};
            }
            res.send(json_res);
        });	
    });
};