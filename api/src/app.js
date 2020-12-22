// Dependencies
const express = require('express');

// Configs
const port = process.env.PORT || 3001;
const app = express();

// Own imports

app.listen(port, function() {
  console.log("listening on port:", port);
})
 