const request = require('request');
const API_KEY = '8f63c557acdef7bae349c2a2cd9ae411'

function getWeather(lat, lng, callback) {
    request({
        url: `https://api.darksky.net/forecast/${API_KEY}/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if(response.statusCode === 200) {
            callback(null, {
                temperature: body.currently.temperature,
                feelsLike: body.currently.apparentTemperature
            });
        }
        else {
            callback(error);
        }
    })
}

module.exports = {
    getWeather
}