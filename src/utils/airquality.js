const axios = require('axios');

//Using OpenWeatherMap API
const openWeatherMapAppId = process.env.OPEN_WEATHER_MAP_APP_ID;
const airquality = (latitude, longitude, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${openWeatherMapAppId}`

    axios.get(url).then(response => {
        if(response.status === 200) {

            let airQuality = '';

            switch (response.data.list[0].main?.aqi) {
                case 1:
                    airQuality = 'Good';
                    break;
                    case 2:
                        airQuality = 'Fair';
                        break;
                        case 3:
                            airQuality = 'Moderate';
                            break;
                            case 4:
                                airQuality = 'Poor';
                                break;
                                case 5:
                                    airQuality = 'Very Poor';
            }

            callback(undefined, "Air quality  is " + airQuality
                + ". Сoncentration of CO (Carbon Monoxide) is " + response.data.list[0].components?.co + ", Сoncentration of NO (Nitrogen Monoxide) is " + response.data.list[0].components?.no
                + ", and Сoncentration of NO (Nitrogen dioxide) is " + response.data.list[0].components?.no2 + ", and Сoncentration of O3 (Ozone) is " + response.data.list[0].components?.o3
                + ", and Сoncentration of SO2 (Sulfur dioxide) is " + response.data.list[0].components?.so2 + ", and PM2.5 (Fine particles matter) is " + response.data.list[0].components?.pm2_5
                + ", and PM10 (Coarse particulate matter) is " + response.data.list[0].components?.pm10 + ", Сoncentration of NH3 (Ammonia) is " + response.data.list[0].components?.nh3);
        } else if (response.status === 404) {
            callback('Unable to find location', undefined);
        }
    }).catch(error => {
        callback('Unable to connect to weather services!', error)
    })
}

module.exports = airquality;
