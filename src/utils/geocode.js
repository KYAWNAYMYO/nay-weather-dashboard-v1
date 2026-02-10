const axios = require('axios')

const geocode = (address, callback) => {
    const mapBoxAccessToken = process.env.MAP_BOX_ACCESS_TOKEN;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${mapBoxAccessToken}&limit=1`

    axios.get(url).then(response => {
        if(response.status === 200) {
            callback(undefined, {
                latitude: response.data.features[0].center[1],
                longitude: response.data.features[0].center[0],
                location: response.data.features[0].place_name
            })
        } else if (response.status === 404) {
            callback('Unable to find location. Try another search.', undefined)
        }
    }).catch(error => {
            callback('Unable to connect to location services!', error)
    })
}

module.exports = geocode