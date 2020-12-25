const reaktor = require('../repository/reaktor/products.js');
const redis = require('../repository/redis/products.js');

const fetchProducts = (category) => {
    return "Under development"
    /*
  return reaktor.fetchProducts(params)
    .then(productList => insertEachProduct(productList))
    .then(data => {
        console.log(data)
        return data
    })
    /*
    .then( response => {
        redis.getAllKeys()
        return response
    }) */
}

const insertEachProduct = (productList) => {
    return productList.forEach(product => {
        redis.insertProducts(product)
    })
}

// Do I need params for req, or I can just put category?
const insertProductsIntoRedis = (category) => {
    return reaktor.fetchProducts(category)
    .then(productList => insertEachProduct(productList))
}

module.exports = {
    fetchProducts,
    insertEachProduct,
    insertProductsIntoRedis,
}