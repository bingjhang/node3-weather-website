const request = require('request')
const geocode = (address,callback)=> {
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYmluZ2NoYW5nIiwiYSI6ImNrNnB6ejFpYjA5cmIzanFxNHh1aTI4bW4ifQ.WY0-rRip2Ssj0W42Vmeypg'
    request({url, json:true}, (error,{body}) => {
    if(error) {
    console.log("Unable to connect to location services!");
    }
    else if(body.features.length === 0) {
    callback('Unable to find locatioin.Try another search.', undefined)
    }
    else {
    callback(undefined, {
       latitude:body.features[0].center[1],
       longitude:body.features[0].center[0],
       location:body.features[0].place_name         
       })
    }
    })
    }
    
    module.exports = geocode