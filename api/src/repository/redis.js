const { response } = require('express')
const redis = require('redis')
const client = redis.createClient(process.env.REDIS_URL)

// Log connection info
client.on('connect', function () {
  console.log('Connected to Redis')
})

// Log connection errors
client.on('error', function (err) {
  console.log('Redis error: ' + err)
})

const getProductsByCategory = (req, res, next) => {
  return client.get(req.params.category, (err, reply) => {
    if (reply !== null) {
      res.send(JSON.parse(reply))
    } else {
      next()
    }
  })
}

const setProductsByCategory = (category, data) => {
  // Set category data into redis with time to live 300s / 60 = 5 minutes
  return client.set(category, JSON.stringify(data), 'EX', 300, (err) => {
    if (err) {
      res.send(JSON.parse(reply.data))
    } else {
      console.log(`'${category}' data added to Redis`)
    }
  })
}

module.exports = {
  getProductsByCategory,
  setProductsByCategory,
}
