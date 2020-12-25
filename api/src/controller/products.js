const reaktor = require('../repository/reaktor/products.js');
const redis = require('../repository/redis/products.js');

const fetchProducts = (params) => {
  return reaktor.fetchProducts(params)
  .then(response => response.json())
  .then(response => response.slice(1-10))
  .then(response => {
    response.forEach(element => {
        redis.insertProducts(element) 
    });
 
     // console.log(response)
    return response
    })
}

module.exports = {
    fetchProducts,
}