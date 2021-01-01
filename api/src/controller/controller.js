const config = require('../config/knexfile.js');
const db = require('knex')(config.development);
const redis = require('../repository/redis.js');
const postgres = require('../repository/postgres.js')

const getProductsByCategory = (req, res, next) => {
    postgres.getProductsByCategory(req.params.category, db)
    .then(data => {
        redis.setProductsByCategory(req.params.category, data)
        // TODO: take this into better place
        // Set client cache for 5 minutes
        res.set({'Cache-Control': 'max-age=300' })
        res.send(data)
    })
} 

module.exports = {
    getProductsByCategory
}