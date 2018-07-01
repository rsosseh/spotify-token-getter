var express = require('express');
var request = require('request');
var app = express();

app.set('port', process.env.PORT || 3000);

app.get('/token', function(req, resp) {
	resp.header('Access-Control-Allow-Origin', '*');
  	resp.header('Access-Control-Allow-Headers', 'X-Requested-With');

	var client_id = process.env.SPOTIFY_CLIENT_ID;
	var client_secret = process.env.SPOTIFT_CLIENT_SECRET;

	var authOptions = {
		url: 'https://accounts.spotify.com/api/token',
		headers:{
			Authorization: 'Basic ' + new Buffer(client_id+':'+client_secret).toString('base64')
		},
		form: {
			grant_type: 'client_credentials'
		},
		json:true
	};

	request.post(authOptions, function(err, res, body){
		if(!err && res.statusCode === 200){
			resp.json({token: body.access_token})
		}
	})

})

app.listen(app.get('port'), function(){
	console.log("we're running! ", app.get('port'))
})