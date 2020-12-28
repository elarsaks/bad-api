const redis = require('redis')
const client = redis.createClient(process.env.REDIS_URL)

client.on("error", function(error) {
    console.error(error);
});

const insertProductsByCategory = (category, data) => {
    return client.hmset(category, {
        category: category,
        data: JSON.stringify(data),
    })
}

module.exports = {
    insertProductsByCategory
}
