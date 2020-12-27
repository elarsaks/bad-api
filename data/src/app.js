const express = require('express');
const postgres = require('./controller/postgres.js');
const redis = require('./controller/redis.js');

const PORT = process.env.PORT || 3002;
const app = express();

app.listen(PORT, function() {
  console.log("Listening on port:", PORT);
})

const categories = ["gloves", "facemasks", "beanies"]

setTimeout(() => console.log('Please wait.'), 1000);
setTimeout(() => console.log('Loading data ...'), 2000);


// Make this a function, so that Redis can be populated after that
categories.forEach(category => {
   // postgres.populatePostgres(category)
   console.log('APP IS Ready FOR USE!')
})


app.get('/', function (req, res) {
    redis.updateProductsInredis("beanies")
   // .then(() => console.log('APP IS Ready FOR USE!') )
})