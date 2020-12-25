const fetch = require('node-fetch');

const fetchProducts = ( params ) => {
    return  fetch(' https://bad-api-assignment.reaktor.com/v2/products/' + params.category, {
      headers:{
        //'Cache-Control': 'no-store',
        // Add assignment headers here!!
      },
      method: "GET",
    })
    .then(response => {
      return response
    })
  }
  
  
  module.exports = {
    fetchProducts,
  }
  