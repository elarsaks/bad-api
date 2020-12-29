const config = require('../config/knexfile.js');
const db = require('knex')(config.development);
const redis = require('../repository/redis.js');
const postgres = require('../repository/postgres.js')



const getProductsByCategory = (req, res, next) => {
    const category = req.params.category

    postgres.getProductsByCategory(category, db)
    .then(data => {
        redis.setProductsByCategory(category, data.slice(1-3))
        res.send(data)
    })
} 

module.exports = {
    getProductsByCategory
}