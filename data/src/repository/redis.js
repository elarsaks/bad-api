const redis = require('redis')
const client = redis.createClient(process.env.REDIS_URL)

const insertProductsByCategory = (category, data) => {
    return client.hmset(category, {
        category: category,
        data: JSON.stringify(data),
    })
}

module.exports = {
    insertProductsByCategory
}
