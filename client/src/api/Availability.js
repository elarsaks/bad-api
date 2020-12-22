const axios = require('axios');

function getAvailability(manufracturer) {
  return axios({
    url: `https://bad-api-assignment.reaktor.com/availability/${manufracturer}`,
    headers: {
      'Cache-Control': 'no-store',
    //  Come back to that!
    //  'Forwarded': 'x-force-error-mode'
    },
    method: "GET",
    params: manufracturer,
  })
    .then(response => response.data.response)
    .catch(err => console.log(err))
}

module.exports = { getAvailability }
