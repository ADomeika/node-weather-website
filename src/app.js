const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

const { geocode } = require('./utils/geocode')
const { forecast } = require('./utils/forecast')

// Handlebars engine setup
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

// Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Adomas Domeika'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    name: 'Adomas Domeika'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'Adomas Domeika'
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help Article 404',
    errorMessage: 'Help article not found',
    name: 'Adomas Domeika'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }
  geocode(req.query.address, (error, { location, latitude:lat, longitude:long } = {}) => {
    if (error) return res.send({ error })
    forecast(lat, long, (error, forecast) => {
      if (error) return res.send({ error })
        res.send({
          address: req.query.address,
          location,
          forecast
        })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query)
  res.send({
    products: []
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Page',
    errorMessage: 'Page not found',
    name: 'Adomas Domeika'
  })
})

app.listen(8081, () => {
  console.log('App is listening on localhost:8081')
})
