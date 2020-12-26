const reaktor = require('../repository/reaktor.js');
const postgres = require('../repository/postgres.js')
const config = require('../config/knexfile.js');
const db = require('knex')(config.development);
const filter = require('../services/filter.js')

const getAvailabilityData = (manufacturerList) => {
    let availabilityData = []

    manufacturerList.forEach(manufacturer => {
        availabilityData.push(reaktor.fetchAvailability(manufacturer.manufacturer)) 
    })

    return Promise.all(availabilityData) 
}

const insertProductsIntoPostgres = (productList) => {
    return productList.forEach(product => {
        postgres.postProduct(product, db)
    });
}

const insertAvailabilityIntopostgres = (manufacturer) => {
    return postgres.getManufacturerList(db)
    .then(manufacturerList => getAvailabilityData(manufacturerList))
    .then(data => filter.cleanAvailabilityData(data))
    .then(data => console.log(data))
    // Find a place where to put error handling
    .catch(err => console.log(err))
}

const populatePostgres = (category) => {
    return reaktor.fetchProducts(category)
    .then(productList => insertProductsIntoPostgres(productList))
}

module.exports = {
    populatePostgres,
    insertAvailabilityIntopostgres,
}