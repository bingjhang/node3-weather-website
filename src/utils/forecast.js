const request = require('request')

const forecast = (latitude, longitude,callback) => {
const url = 'http://api.weatherstack.com/current?access_key=c21db0f18b201cd6953853b71fcbb520&query='+latitude+','+longitude+'&units=m'

request({url, json:true},(error, {body}) => {
    if(error) {
    callback("Unable to connect to weather services!",undefined);     
    }
    else if(body.error) {
    callback("Unable to find locatioin.Try another search.", undefined);
    }
    else{
    callback(undefined,body.current.weather_descriptions[0] + "Its is currently "+body.current.temperature+" degree out. It feels like " + 
    body.current.feelslike + "degress out. The humidity is " + body.current.humidity + "%.")
}}
)
}
module.exports = forecast