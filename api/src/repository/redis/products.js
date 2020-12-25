const redis = require('redis')
const REDIS_URL = 6379
const client = redis.createClient(process.env.REDIS_URL)

const insertProducts = (product) => {
    return client.hmset(product.id, [
        'id', product.id,
        'type', product.type,
        'name', product.name,
        'color', JSON.stringify(product.color),
        'price', product.price,
        'manufacturer', product.manufacturer,
    ], 
    (err, reply) => err ? console.log(err) : reply)
}

const getAllKeys = () => {
    client.keys('*', function (err, keys) {
        if (err) return console.log(err);

        for(var i = 0, len = keys.length; i < len; i++) {
            console.log(keys[i]);
        }
    });  
}

module.exports = {
    insertProducts,
    getAllKeys,
  }
