const fetch = require('node-fetch');

const fetchProducts = ( category ) => {
    return  fetch(' https://bad-api-assignment.reaktor.com/v2/products/' + category, {
      headers:{
        //'Cache-Control': 'no-store',
        // Add assignment headers here!!
      },
      method: "GET",
    })
    .then(response => response.json())
    // Come back to remove debug!!
    .then(response => response.slice(1-3))
    .catch(error => console.log(error))
  }
  
  
  module.exports = {
    fetchProducts,
  }
  