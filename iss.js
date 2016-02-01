var request = require('request');
var prompt = require('prompt');
Number.prototype.toRadians = function() {
    return this * Math.PI / 180;
}

prompt.start();

var issLocationURL = 'http://api.open-notify.org/iss-now.json';

var issLocate;
var userLocate;

request(issLocationURL, function(error, response, body){
    if (error) {
        console.log('sorry there was a problem fetching the location.');
    }
    else {
        issLocate = JSON.parse(body)['iss_position'];
    }
    
});

prompt.get(['location'], function(error, answers){
    if (error) {
        console.log ('sorry there was a problem fetching the location.');
    } else {
        var coordinatesLink = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + answers.location;
        request(coordinatesLink, function(error, response, body){
        var coordinates = JSON.parse(body).results[0].geometry.location
        if (coordinates) {
            userLocate = coordinates
            isSet();
        }
                
});
    }
});


function isSet() {
    var lat1 = issLocate.latitude;
    var lat2 = userLocate.lat;
    var lon1 = issLocate.longitude;
    var lon2 = userLocate.lng;
    
        var R = 6371000; // metres
        var φ1 = lat1.toRadians();
        var φ2 = lat2.toRadians();
        var Δφ = (lat2-lat1).toRadians();
        var Δλ = (lon2-lon1).toRadians();
        
        var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        
        var d = (R * c)/1000;
    console.log(d + ' ' + 'km');
}

