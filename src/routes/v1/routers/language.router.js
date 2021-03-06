const express = require('express');
const asyncify = require('express-asyncify'); // use this to get async functions to work in router.use()
 
const {
   getLanguages,
   getLanguage,
} = require('../../../controllers/language.controller');
 
const advancedResults = require('../../../middleware/advancedResults.mw');
const Language = require('../../../models/Language.model');
 
// router
const router = express.Router({ mergeParams: true });
 
router.get('/', advancedResults(Language), getLanguages);
router.get('/:id',  getLanguage);
 
module.exports = router;

