const fetch = require('node-fetch')
const apiLink = 'https://bad-api-assignment.reaktor.com/v2'

const fetchAvailability = (manufacturer) => {
  return fetch(apiLink + '/availability/' + manufacturer, {
    // DEBUG: headers:{ 'x-force-error-mode' : 'all' }
    method: 'GET',
  })
    .then((response) => response.json())
    .then((response) => response.response)
    .then((response) => {
      if (Array.isArray(response)) {
        return response
      } else {
        console.log(
          `Recieved "${response}" as a response on: "${manufacturer}", doing recursive call.`
        )
        return fetchAvailability(manufacturer)
      }
    })
    .catch((error) => console.log(error))
}

const fetchProducts = (category) => {
  return fetch(apiLink + '/products/' + category, { method: 'GET' })
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

module.exports = {
  fetchAvailability,
  fetchProducts,
}
