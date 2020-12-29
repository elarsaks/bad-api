const { response } = require('express');
const redis = require('redis')
const client = redis.createClient(process.env.REDIS_URL)

// Log connection errors
client.on("error", function(error) {
    console.error(error);
});

const getProductsByCategory = (req, res, next) => {
    const category = req.params.category

    return client.hgetall(category, function(err, reply){
        if (err){console.log(err)}

        if(reply !== null){
            res.send(reply)
        } else {
            next()
        }
    })
}

const setProductsByCategory = (category, data) => {
    return client.hmset(category, {
        category: category,
        data: JSON.stringify(data),
    }, 
    (err) => err 
        ? console.log(err) 
        : console.log(`'${category}' data added to Redis`)
    )
}

module.exports = {
    getProductsByCategory,
    setProductsByCategory
}
