const axios = require('axios');

function getProducts(category) {
  return axios({
    url: `http://35.228.187.83:3001/products/${category}`,
    //url: `http://localhost:3001/products/${category}`,
    method: "GET",
  })
  .then(resp => resp.data)
}

module.exports = { getProducts }
