const express = require('express');
const router = express.Router()

// Provide information about API links
router.get('/', (req, res) => {
    res.send({
      products: {
        get_products_by_category: '/products/:category',
      },
    });
})

//Get all products from Reaktor api
router.get('/products/:category', (req, res)=> { 
  products.fetchProducts(req.params)
  .then(resp => {
      return res.send(resp)
  })
  .catch(err => err) 
});

module.exports = router;