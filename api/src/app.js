const express = require('express');
const router = require('./router/index.js')
const products = require('./controller/products.js');


const PORT = process.env.PORT || 3001;
const app = express();
app.use(router)

const categories = ["gloves", "facemasks", "beanies"]

categories.forEach(category => {
  products.insertProductsIntoRedis(category)
})

app.listen(PORT, function() {
  console.log("Listening on port:", PORT);
})
 