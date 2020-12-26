const express = require('express');
const app = express();
const controller = require('./controller/controller.js');

const PORT = process.env.PORT || 3002;

const startApp = () => {
    const categories = ["gloves", "facemasks", "beanies"]

    categories.forEach(category => {
        controller.populatePostgres(category)
      })
}

app.listen(PORT, function() {
  console.log("Listening on port:", PORT);
})


app.get('/', function (req, res) {
    controller.insertAvailabilityIntopostgres()
    //startApp()
    res.send('hello world')
})


