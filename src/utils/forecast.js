const request = require('request');

var forecast = (long, lat, callback) => 
{
    const url = `https://api.darksky.net/forecast/c5a5197eb7bb9dd4467f778b730efe83/${lat},${long}?lang=en&icon=clear-day`;
    request({url: url, json: true}, (err, {body}) =>
    {
        if(err) callback('Unable to connect to DarkSky API', undefined);
        else if(body.code === 400) callback('Unable to find the location', undefined);
        else {
            callback(undefined, {
               summary: body.currently.summary,
               temperature: body.currently.temperature,
               chanceOfRain: body.currently.precipProbability
            });
        }
    });
}
module.exports = forecast