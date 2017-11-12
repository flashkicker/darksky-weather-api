const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.address, (err, result) => {
    if(err) {
        console.log(err);
    }
    else{
        console.log(result.address);
        weather.getWeather(result.lat, result.lng, (err, weatherResult) => {
            if(err) {
                console.log(err);
            }
            else {
                console.log(`It's currently ${weatherResult.temperature}. It feels like ${weatherResult.feelsLike}`);
            }
        });
    }
});
