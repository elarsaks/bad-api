const reaktor = require('../repository/reaktor.js');
const postgres = require('../repository/postgres.js')
const config = require('../config/knexfile.js');

const db = require('knex')(config.development);

const insertProductsIntoPostgres = (productList) => {
    return productList.forEach(product => {
        postgres.postProduct(product, db)
    });
}

const insertAvailabilityIntopostgres = (manufacturer) => {
    return postgres.getManufacturerList(db)
    .then(manufacturerList => {
        console.log(manufacturerList)
        manufacturerList.forEach(manufacturer => reaktor.fetchAvailability(manufacturer.manufacturer))
        .then(data => console.log(data))
    })

    /*reaktor.fetchAvailability(manufacturer)
    .then(data => console.log(data)) */
}

const populatePostgres = (category) => {
    postgres.getManufacturerList(db)

    /*
    return reaktor.fetchProducts(category)
    .then(productList => insertProductsIntoPostgres(productList)) */
}

module.exports = {
    populatePostgres,
    insertAvailabilityIntopostgres,
}