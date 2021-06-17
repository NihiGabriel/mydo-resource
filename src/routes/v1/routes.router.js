const express = require('express');
 
// routers
const countryRoutes = require('./routers/country.router');
const languageRoutes = require('./routers/language.router');
const payRoutes = require('./routers/payment.router');
 
// create router
const router = express.Router();
 
// define routes
router.use('/countries', countryRoutes);
router.use('/languages', languageRoutes);
router.use('/payments', payRoutes);
 
// for unmapped routes
router.get('/', (req, res, next) => {
 
   res.status(200).json({
       status: 'success',
       data: {
           name: 'todo-resources-service',
           version: '0.1.0'
       }
   })
  
});
 
module.exports = router;
 

