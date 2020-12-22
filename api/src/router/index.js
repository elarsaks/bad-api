const express = require('express');
const router = express.Router()
const products = require('./products.js');


// Provide information about API links
router.get('/', (req, res) => {
    res.send({
      products: {
        test: '/test',
      },
    });
})

router.use('/products', products )

module.exports = router;