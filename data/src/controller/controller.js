const reaktor = require('../repository/reaktor.js');
const postgres = require('../repository/postgres.js')
const config = require('../config/knexfile.js');
const db = require('knex')(config.development);
const filter = require('../services/filter.js')

const deleteAllProducts = () => {
    return postgres.deleteAllProducts(db)
}

const getAvailabilityData = (manufacturerList) => {
    let availabilityData = manufacturerList.map(manufacturer => 
        reaktor.fetchAvailability(manufacturer.manufacturer))
    return Promise.all(availabilityData) 
}

const insertProductsIntoPostgres = (productList) => {
    let response = productList.map(product => postgres.postProduct(product, db))
    return Promise.all(response)
}

const insertStockIntoPostgres = (data) => {
    let response = data.map(product => postgres.putStock(product, db))
    return Promise.all(response)
}

const insertAvailabilityIntopostgres = () => {
    return postgres.getManufacturerList(db)
    .then(manufacturerList => getAvailabilityData(manufacturerList))
    .then(data => filter.cleanAvailabilityData(data))
    .then(data => insertStockIntoPostgres(data))
    // TODO: Find a better place for error handling.
    .catch(err => console.log(err))
}

const populatePostgres = (categories) => {
    let allCategoriesData = categories.map(category => reaktor.fetchProducts(category))
    return Promise.all(allCategoriesData)
        .then(productList => insertProductsIntoPostgres(productList))
 }

module.exports = {
    deleteAllProducts,
    populatePostgres,
    insertAvailabilityIntopostgres,
}