const express = require('express')
const postgres = require('./controller/postgresController.js')
const reaktor = require('./controller/reaktorController.js')
var cron = require('node-cron')

const PORT = process.env.PORT || 3002
const app = express()

const productCategories = ['gloves', 'facemasks', 'beanies']

function timeStamp() {
  var date = new Date().getTime()
  return new Date(date).toLocaleString()
}

function populateDatabase() {
  postgres
    .deleteAllProducts()
    .then(() => reaktor.getProductsByCategories(productCategories))
    .then((productsList) => postgres.insertProductsIntoPostgres(productsList))
    .then(() => updateAvailabilityData())
}

function updateAvailabilityData() {
  postgres
    .getManufacturerList()
    .then((manufacturerList) => reaktor.getAvailabilityData(manufacturerList))
    .then((data) => postgres.insertAvailabilityIntoPostgres(data))
}

// Update 'products' data in PostgreSQL every midnight at 00:30
cron.schedule('00 30 00 * * *', () => {
  console.log(`${timeStamp()} - Update products data in PostgreSQL.`)
  populateDatabase()
})

// Update 'stock' in PostgreSQL after every 5 minutes, during workdays, between 6:00 and 17:00 a clock. */
cron.schedule('00 */5 06-17 * * 0-5', () => {
  console.log(`${timeStamp()} - Update availability data in PostgreSQL.`)
  updateAvailabilityData().then(() =>
    console.log('Stock in Postgres database updated!')
  )
})

// App is set to listen to port just to keep it running.
app.listen(PORT, function () {
  console.log('APP is running.')
  // Populate database during installation
  populateDatabase()
})
