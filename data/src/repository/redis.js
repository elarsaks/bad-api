const redis = require('redis')
//const REDIS_URL = 6379
const client = redis.createClient(process.env.REDIS_URL)

const insertProductsByCategory = (category, data) => {
    return client.hmset(category, {
        category: category,
        data: JSON.stringify(data),
    },
        (err, reply) => err 
            ? console.log(err)
            : console.log(`Category "${category}" added to Redis.`)
    )
}

module.exports = {
    insertProductsByCategory
}
