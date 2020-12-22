const fetch = require('node-fetch');

const getProducts = ( category ) => {
    return  fetch(' https://bad-api-assignment.reaktor.com/' + category)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }
  
  
  module.exports = {
    getProducts,
  }
  