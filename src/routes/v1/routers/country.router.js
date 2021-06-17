const express = require('express');
const asyncify = require('express-asyncify'); // use this to get async functions to work in router.use()
 
const {
   getCountries,
   getCountry,
   getStates
} = require('../../../controllers/country.controller');
 
const advancedResults = require('../../../middleware/advancedResults.mw');
 
// router
const router = express.Router({ mergeParams: true });
const Country = require('../../../models/Country.model');
 
router.get('/', advancedResults(Country), getCountries);
router.get('/:id',  getCountry);
router.get('/states/:id',  getStates);
 
module.exports = router;