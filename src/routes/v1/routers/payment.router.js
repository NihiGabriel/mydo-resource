const express = require('express');
const asyncify = require('express-asyncify'); // use this to get async functions to work in router.use()
 
const {
   getPayments,
   getPayment,
   createPayment,
   updatePayment,
} = require('../../../controllers/payment.controller');
 
const advancedResults = require('../../../middleware/advancedResults.mw');
const { protect, authorize } = require('../../../middleware/auth.mw')
 
// router
const router = express.Router({ mergeParams: true });
const Payment = require('../../../models/Payment.model');
 
router.get('/', advancedResults(Payment), getPayments);
router.get('/:id',  getPayment);
router.post('/', protect, authorize(['superadmin', 'admin']), createPayment);
router.put('/', protect, authorize(['superadmin', 'admin']), updatePayment);
 
module.exports = router;

