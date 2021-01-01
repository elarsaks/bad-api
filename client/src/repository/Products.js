const axios = require('axios');

function getProducts(category) {
  return axios({
    url: `http://35.228.187.83:3001/products/${category}`,
    method: "GET",
  })
  .then(resp => resp.data)
  .catch(err => err)
}

module.exports = { getProducts }
