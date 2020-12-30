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

// Update 'stock' in PostgreSQL after every 1 hour
// It is currently set to update every hours firs minute.
// To test CRON, change 01 into the minute you want to be it running at. 
// For example, if for you it is, 11:35, change 01 to be 40. Then it will run at 11:40.
cron.schedule('00 01 * * * *', () => {
    console.log(createTimeStamp())
    console.log('Update availability data in PostgreSQL.')
    postgres.insertAvailabilityIntopostgres()
    .then(() => console.log("Stock in Postgres database updated!"))
});

// App is set to listen to port just to keep it running.
app.listen(PORT, function() {
    console.log("APP is running.");
    setTimeout(() => console.log('Please wait.'), 1000);
    setTimeout(() => console.log('Loading data ...'), 2000);
  
    // Populate database during installation
    // TODO: uncomment it when finished with development
    //populateDatabase()
})
