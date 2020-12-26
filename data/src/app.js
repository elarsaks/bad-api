const express = require('express');
const app = express();
const controller = require('./controller/controller.js');

const PORT = process.env.PORT || 3002;

app.listen(PORT, function() {
  console.log("Listening on port:", PORT);
})

const categories = ["gloves", "facemasks", "beanies"]

categories.forEach(category => {
    console.log('Wait ... loading data ...')
    controller.populatePostgres(category)
  })


