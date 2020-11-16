const axios = require('axios');

function getProducts(payload) {
  return axios({
    url: `https://bad-api-assignment.reaktor.com/products/${payload}`,
    method: "GET",
    params: payload,
  })
    .then(response => response.data.slice(1-100))
}

module.exports = { getProducts }
