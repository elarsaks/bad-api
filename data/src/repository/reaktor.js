const { response } = require('express');
const fetch = require('node-fetch');

const fetchAvailability = ( manufacturer ) => {
  return  fetch(' https://bad-api-assignment.reaktor.com/v2/availability/' + manufacturer, {
    headers:{
      // DEBUG
      //'x-force-error-mode' : 'all'
    },
    method: "GET",
  })
  .then(response => response.json())
  .then(response => response.response.slice(1-2))

  // Call fetchAvailability until it returns data
  .then(response => {  
    if (Array.isArray(response)) {
      return response
    } else {
      console.log(`Recieved "${response}" as a response on: "${manufacturer}", doing recursive call.`)
      return fetchAvailability(manufacturer)
    }
  })
  .catch(error => console.log(error))
}

const fetchProducts = ( category ) => {
    return  fetch(' https://bad-api-assignment.reaktor.com/v2/products/' + category, {
      method: "GET",
    })
    .then(response => response.json())
    .catch(error => console.log(error))
  }
  
  module.exports = {
    fetchAvailability,
    fetchProducts,
  }
  