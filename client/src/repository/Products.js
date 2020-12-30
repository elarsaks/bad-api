const axios = require('axios');

function getProducts(category) {
  return axios({
    url: `http://localhost:3001/products/${category}`,
    method: "GET",
  })
  // TODO: proper error handling
  .catch(err => console.log(err))
}

module.exports = { getProducts }
