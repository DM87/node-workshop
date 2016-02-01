var request = require('request');
// load the request 
var issLocationURL = 'http://api.open-notify.org/iss-now.json';

request(issLocationURL, function(error, response, body){
    var location = JSON.parse(body);
    console.log(location);
});

