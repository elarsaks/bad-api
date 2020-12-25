const express = require('express');
const products = require('../controller/products.js');

const router = express.Router()

//Get all products from Reaktor api
router.get('/:category', (req, res)=> { 
    products.fetchProducts(req.params)
  /*  .then(resp => {
        return res.send(resp)
    })
    .catch(err => err) */
});

module.exports = router;