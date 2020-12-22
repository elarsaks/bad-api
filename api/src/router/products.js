const express = require('express');
//const countries = require('../controller/countries.js');

const router = express.Router()

//Get all from countries
router.get('/', (req, res)=> { 
    res.status(200).send('OK!')
});

module.exports = router;