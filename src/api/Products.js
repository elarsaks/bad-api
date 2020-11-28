const axios = require('axios');

function getProducts(payload) {
  return axios({
    url: `https://bad-api-assignment.reaktor.com/products/${payload.category}`,
    method: "GET",
  /*  headers: {
      'Forwarded': 'x-force-error-mode'
    }, */ // Come back to that!
    params: payload,
  })
    .then(response => response.data.slice(1 - payload.amount))
}

module.exports = { getProducts }
