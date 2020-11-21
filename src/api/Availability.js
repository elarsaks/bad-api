const axios = require('axios');

function getAvailability(manufracturer) {
  return axios({
    url: `https://bad-api-assignment.reaktor.com/availability/${manufracturer}`,
    headers: {
      'Cache-Control': 'no-store'
    },
    method: "GET",
    params: manufracturer,
  })
    .then(response => response.data.response)
    .catch(err => console.log(err))
}

module.exports = { getAvailability }
