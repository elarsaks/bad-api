const postgres = require('../repository/postgres.js')
const config = require('../config/knexfile.js')
const db = require('knex')(config.development)

const deleteAllProducts = () => postgres.deleteAllProducts(db)

const getManufacturerList = () => postgres.getManufacturerList(db)

const insertAvailabilityIntoPostgres = (data) =>
  Promise.all(data.map((product) => postgres.putStock(product, db)))

const insertProductsIntoPostgres = (productList) =>
  Promise.all(productList.map((product) => postgres.postProduct(product, db)))

module.exports = {
  deleteAllProducts,
  getManufacturerList,
  insertAvailabilityIntoPostgres,
  insertProductsIntoPostgres,
}
