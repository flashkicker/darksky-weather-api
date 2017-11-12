const request = require('request');

function geocodeAddress(address, callback) {
    var encodedAddress = encodeURI(address);
    
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true
    }, (error, response, body) => {
        if(error) {
            callback("Unable to connect to Google servers.");
        }
        else if(body.status === "ZERO_RESULTS") {
            callback("Address not found");
        }
        else if(body.status === "OK") {
            callback(null, {
                address: body.results[0].formatted_address,
                lat: body.results[0].geometry.location.lat,
                lng: body.results[0].geometry.location.lng
            })
        }
    });
}

module.exports = {
    geocodeAddress
}