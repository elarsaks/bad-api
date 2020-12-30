const express = require('express');
const router = express.Router()
const controller = require('../controller/controller.js');
const redis = require('../repository/redis.js');

// TODO: configure router
router.use((req, res, next)=>{
  res.header("Access-Control-Allow-Origin", "*")
  next()
})

// Provide information about API links
router.get('/', (req, res) => {
    res.send({
      products: {
        get_products_by_category: '/products/:category',
      },
    });
})
 
// Check if Redis has data, if not fetch it from Postgres
router.get('/products/:category',
  redis.getProductsByCategory,
  controller.getProductsByCategory
);


module.exports = router;