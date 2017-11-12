const request = require('request');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        var encodedAddress = encodeURI(address);

        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
            json: true
        }, (error, response, body) => {
            if(error) {
                reject("Unable to connect to Google servers.");
            }
            else if(body.status === "ZERO_RESULTS") {
                reject("Address not found");
            }
            else if(body.status === "OK") {
                resolve({
                    address: body.results[0].formatted_address
                });
            }
        });
    });
}

geocodeAddress('97333').then((results) => {
    console.log(results.address);
}).catch((errorMessage) => {
    console.log(errorMessage);
});

