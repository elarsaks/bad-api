const express = require('express');
const router = require('./router/index.js')
const controller = require('./controller/controller.js');

const PORT = process.env.PORT || 3001;
const app = express();
app.use(router)


app.listen(PORT, function() {
  console.log("Listening on port:", PORT);
})
 