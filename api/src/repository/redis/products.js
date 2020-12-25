const redis = require('redis')
const REDIS_PORT = 6379
const client = redis.createClient(process.env.REDIS_URL)

const insertProducts = (product) => {
    //console.log(product)
    //client.set(product.id, JSON.stringify(product))
    client.hmset(product.id, [
        'id', product.id,
        'type', product.type,
        'name', product.name,
        //'color', Insert Array,
        'price', product.price,
        'manufacturer', product.manufacturer,
    ],
    function(err, reply){
        if(err){
            console.log(err)
        }
        console.log(reply)
    })

    client.hgetall(product.id)
    .then(data = console.log(data))
    // res.redirect('/')
}

module.exports = {
    insertProducts,
  }


//client.set("transactions", 123, redis.print)
//client.get("transactions", redis.print)
//client.del("transactions", redis.print)