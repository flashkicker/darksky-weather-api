const yargs = require('yargs');
const axios = require('axios');
const API_KEY = '8f63c557acdef7bae349c2a2cd9ae411';

const argv = yargs
.options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'Address to fetch weather for',
        string: true
    }
})
.help()
.alias('help', 'h')
.argv;

var encodedAddress = encodeURI(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl)
.then((response) => {
    if(response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address. Please check your parameter.');
    }
    console.log(response.data.results[0].formatted_address);
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/${API_KEY}/${lat},${lng}`;
    
    return axios.get(weatherUrl)
}).then((response) => {
    if(response.status === 200) {
        temperature = response.data.currently.temperature;
        feelsLike = response.data.currently.apparentTemperature;
    }
    console.log(`It's currently ${temperature}, but it feels like ${feelsLike}`);
}).catch((e) => {
    if(e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers');
    }
    else {
        console.log(e);
    }
});
