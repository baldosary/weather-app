const request = require('request');

var geocoding = (address, callback) =>
{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYnVzaHJhYWxkb3NhcnkiLCJhIjoiY2p0NGdwMWlyMDB3dzQ0bzVhejNjdTV1OCJ9.3FOq72YNE1TMF0w0cwFcyg`
    request({url: url, json: true}, (err, {body}) => {
        if(err) { 
            callback('Unable to connect to geocoding API', undefined)
        }
        else if(body.features.length === 0) { 
            callback('Unable to find the location. Try another search!', undefined)
         }
        else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name }); 
             }
    }); 
}

module.exports = geocoding