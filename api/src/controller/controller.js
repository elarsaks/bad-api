const config = require('../config/knexfile.js');
const db = require('knex')(config.development);
const redis = require('../repository/redis.js');
const postgres = require('../repository/postgres.js')



const getProductsByCategory = (req, res, next) => {
    postgres.getProductsByCategory(req.params.category, db)
    .then(data => {
        redis.setProductsByCategory(req.params.category, data)
        res.send(data)
    })
} 

module.exports = {
    getProductsByCategory
}