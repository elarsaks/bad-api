const axios = require('axios');

function getProducts(category) {
  return axios({
    url: `http://localhost:3001/products/${category}`,
    method: "GET",
  })
  .catch(err => err)
}

module.exports = { getProducts }
