const axios = require('axios')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.weatherstack.com/current?access_key=1124f99c0b4bb498e784e68c17980bb5&query=' + latitude + ',' + longitude + '&units=m'

    axios.get(url).then(response => {
        if(response.status === 200) {
            //callback(response.data)
            callback(undefined, response.data.current.weather_descriptions[0] + ". It is currently " + response.data.current.temperature + " degress out. It feels like " + response.data.current.feelslike + " degress out. The humidity is " + response.data.current.humidity + "%.")
        } else if(response.status === 404) {
            callback('Unable to find location', undefined)
        }
    }).catch(error => {
        callback('Unable to connect to weather services!', error)
    })
}

module.exports = forecast