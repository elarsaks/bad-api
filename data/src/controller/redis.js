const postgres = require('../repository/postgres.js')
const config = require('../config/knexfile.js');
const db = require('knex')(config.development);
const redis = require('../repository/redis.js')

const insertProductsByCategory = (category) => {
    return postgres.getProductsByCategory(category, db)
    .then(data => redis.insertProductsByCategory(category, data))
    .catch(err => console.log(err))
}

const updateProductsInredis = (categories) => {
    let response = categories.map(category => insertProductsByCategory(category))
    return Promise.all(response)
    .then(() => console.log('Redis database updated!'))
}

module.exports = {
    updateProductsInredis
}