const axios = require('axios');

function getProducts(payload) {
  return axios({
    url: `https://bad-api-assignment.reaktor.com/products/${payload.category}`,
    method: "GET",
    headers: {
      //  Come back to that!
      //  'Forwarded': 'x-force-error-mode'
    },
    params: payload,
  })
    .then(response => response.data.slice(1 - payload.amount))
}

module.exports = { getProducts }
