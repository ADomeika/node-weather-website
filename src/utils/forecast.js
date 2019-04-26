const request = require('request')

exports.forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/b7971a334cdbda7c1a0081f03753fd0f/${latitude},${longitude}?units=si`
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather services')
    } else if (body.error) {
      callback('Unable to find location')
    } else {
      const { currently } = body
      callback(undefined, {
        summary: `${body.daily.data[0].summary}
          It is currently ${currently.temperature} degrees out.
          The high today is ${body.daily.data[0].temperatureHigh}.
          The low today is ${body.daily.data[0].temperatureLow}.
          There is a ${currently.precipProbability}% chance of rain.`,
        temperature: currently.temperature,
        rainProbability: currently.precipProbability
      })
    }
  })
}
