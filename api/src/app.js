const express = require('express');
const fetch = require('node-fetch');
const router = require('./router/index.js')
const redis = require('redis')


const PORT = process.env.PORT || 3001;
//const REDIS_PORT = 6379
const app = express();
const client = redis.createClient(process.env.REDIS_URL)
app.use(router)


client.set("transactions", 123, redis.print)
client.get("transactions", redis.print)
client.del("transactions", redis.print)



app.listen(PORT, function() {
  console.log("Listening on port:", PORT);
})
 