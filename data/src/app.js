const express = require('express');
const postgres = require('./controller/controller.js');
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
    .then(() => console.log("Postgres database updated!", '\n', "App is ready for use!"))
}

// Update 'products' data in PostgreSQL every midnight at 00:30
cron.schedule('00 30 00 * * *', () => {
    console.log(createTimeStamp())
    console.log('Update products data in PostgreSQL.')
    populateDatabase()
});

/* Update 'stock' in PostgreSQL after every 5 minutes, during workdays,
*  between 6:00 and 17:00 */
cron.schedule('00 */5 06-17 * * 0-5', () => {
    console.log(createTimeStamp())
    console.log('Update availability data in PostgreSQL.')
    postgres.insertAvailabilityIntopostgres()
    .then(() => console.log("Stock in Postgres database updated!"))
});

// App is set to listen to port just to keep it running.
app.listen(PORT, function() {
    console.log("APP is running.");
    // Populate database during installation
    // TODO: uncomment it when finished with development
    //populateDatabase()
})
