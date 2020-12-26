const fetch = require('node-fetch');

const fetchAvailability = ( manufacturer ) => {
  return  fetch(' https://bad-api-assignment.reaktor.com/v2/availability/' + manufacturer, {
    headers:{
      //'Cache-Control': 'no-store',
      // Add assignment headers here!!
    },
    method: "GET",
  })
  .then(response => response.json())
  .catch(error => console.log(error))
}

const fetchProducts = ( category ) => {
    return  fetch(' https://bad-api-assignment.reaktor.com/v2/products/' + category, {
      headers:{
        //'Cache-Control': 'no-store',
        // Add assignment headers here!!
      },
      method: "GET",
    })
    .then(response => response.json())
    .catch(error => console.log(error))
  }
  
  module.exports = {
    fetchAvailability,
    fetchProducts,
  }
  