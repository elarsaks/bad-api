const postgres = require('../repository/postgres.js')
const config = require('../config/knexfile.js');
const db = require('knex')(config.development);
const redis = require('../repository/redis.js')

const updateProductsInredis = (category) => {
    return postgres.getProductsByCategory(category, db)
    .then(data => redis.insertProductsByCategory(category, data))
    .catch(err => console.log(err))
}


module.exports = {
    updateProductsInredis
}