const config = require('../config/knexfile.js');
const db = require('knex')(config.development);
const redis = require('../repository/redis.js');
const postgres = require('../repository/postgres.js')
const validator = require('../services/validator.js')

const getRequestedProducts = (req, res, next) => {
    // Set client cache on 5 minutes
    res.set({'Cache-Control': 'max-age=300' })

    postgres.getProductsByCategory(req.params.category, db)
    .then(data => validator.validatePostgresData(data))
    .then(data => {
        // Set requested products into Redis
        redis.setProductsByCategory(req.params.category, data)
        // Set rest of the products into Redis
        setRemainingProductsIntoRedis(req.params.category)

        res.send(data)
    })
    .catch(err => res.status(500).send(err))
} 

const setRemainingProductsIntoRedis = (requestCategory) => {
    const categories = ['beanies', 'facemasks', 'gloves']
    categories.forEach(category => {
        if (category != requestCategory){
            postgres.getProductsByCategory(category, db)
            .then(data => redis.setProductsByCategory(category, data))
        }
    })
}

module.exports = {
    getRequestedProducts,
}