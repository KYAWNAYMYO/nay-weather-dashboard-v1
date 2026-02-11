const axios = require('axios')

const googleapisaccesskey = process.env.GOOGLE_APIS_ACCESS_KEY;
const API_URL = `https://www.googleapis.com/geolocation/v1/geolocate?key=${googleapisaccesskey}`;

/* const requestBody = {
    // Optional: consider the IP address as a fallback
    considerIp: true,
    // Optional: add cell tower data for more accuracy
    // cellTowers: [
    //   {
    //     homeMobileCountryCode: 310,
    //     homeMobileNetworkCode: 410,
    //     radioType: "lte",
    //     carrier: "Vodafone",
    //     cellId: 12345,
    //     locationAreaCode: 1234,
    //     mobileManagementAreaCode: 0,
    //     age: 0,
    //     signalStrength: -60,
    //     timingAdvance: 0
    //   }
    // ],
    // Optional: add WiFi access point data for best accuracy
    wifiAccessPoints: [
      {
        macAddress: "e2:1c:b4:2d:15:34",
        signalStrength: -43,
        signalToNoiseRatio: 0
      }
    ]
}; */

const geolocation = (callback) => {
    axios.post(API_URL, { "considerIp": "true" }).then(response => { //, {requestBody} request body is not needed for this API, it will use the IP address of the request to determine location.
        if(response.status === 200) {
            callback(undefined, {
                latitude: response.data.location.lat,
                longitude: response.data.location.lng
            })
        } else if (response.status === 404) {
            callback('Unable to find location. Try another search.', undefined)
        }
    }).catch(error => {
        callback('Unable to connect to Google Geo-location services!', error)
    })
}

module.exports = geolocation