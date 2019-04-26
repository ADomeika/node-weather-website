const request = require('request')

exports.geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWRvbWVpa2E5NCIsImEiOiJjam5kMjZvdHUwM2prM3BubTJjZjJieHlqIn0.dHLXJaoYVW_72cdRTYy4Xg&limit=1`
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services!')
    } else if (!body.features.length) {
      callback('Unable to find location')
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}
