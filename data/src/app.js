const express = require('express');
const postgres = require('./controller/postgres.js');
const redis = require('./controller/redis.js');
var cron = require('node-cron');

const PORT = process.env.PORT || 3002;
const app = express();

function createTimeStamp(){
    var date = new Date().getTime()
    return new Date(date).toLocaleString()
}

function populateDatabase(){
    postgres.deleteAllProducts()
    .then(() => postgres.populatePostgres(["gloves", "facemasks", "beanies"]))
    .then(() => postgres.insertAvailabilityIntopostgres())
    .then(() => console.log("Postgres database updated!" ))
}

// Update 'products' data in PostgreSQL every Sunday midnight at 00:30
cron.schedule('00 30 00 * * 7', () => {
    console.log(createTimeStamp())
    console.log('Update products data in PostgreSQL.')
    populateDatabase()
});

// Update 'stock' in PostgreSQL after every 1 hour
cron.schedule('00 04 * * * *', () => {
    console.log(createTimeStamp())
    console.log('Update availability data in PostgreSQL.')
    postgres.insertAvailabilityIntopostgres()
    .then(() => console.log("Stock in Postgres database updated!" ))
});

// App is set to listen to port just to keep it running.
app.listen(PORT, function() {
    console.log("APP is running.");
    setTimeout(() => console.log('Please wait.'), 1000);
    setTimeout(() => console.log('Loading data ...'), 2000);
  
    // Populate database during installation
    populateDatabase()
  
})






/*
 Take redis updates into redis_client_api

// Make this a function, so that Redis can be populated after that
categories.forEach(category => {
   // postgres.populatePostgres(category)
})


app.get('/', function (req, res) {
    redis.updateProductsInredis("beanies")
   // .then(() => console.log('APP IS Ready FOR USE!') )
})

*/