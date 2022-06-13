const mongoose = require('mongoose');
const ErrorResponse = require('../utils/errorResponse.util');
const {
   asyncHandler,
   dateToWordRaw
} = require('@nijisog/todo_common');
const { uploadBase64ImageFile } = require('../utils/s3.util');
const Payment = require('../models/Payment.model');
 
// @desc    Get all payment methods
// @route   GET /api/resources/v1/payments
// @access  Public
exports.getPayments = asyncHandler(async (req, res, next) => {
   res.status(200).json(res.advancedResults);
});
 
// @desc     Get a payment method
// @route    GET /api/resources/v1/payments/:id
// @access   Public
exports.getPayment = asyncHandler(async (req, res, next) => {
 
   const payment = await Payment.findById(req.params.id);
 
   if (!payment) {
       return next(
           new ErrorResponse(`Not found.`, 404, [`Cannot find payment method`])
       );
   }
 
   res.status(200).json({
       error: false,
       errors: [],
       data: payment,
       message: `successful`,
       status: 200
   });
});
 
// @desc     Add a payment method
// @route    POST /api/resources/v1/payments
// @access   Private
exports.createPayment = asyncHandler(async (req, res, next) => {
 
   const { name, type, icon } = req.body
 
   // if(!icon){
   //     return next(new ErrorResponse('Error', 400, ['Payment icon is required']))
   // }
  
   const payment = await Payment.create({       
       name,
       type
   });
 
   // upload the icon to s3 bucket
   let result;
   if(icon){
      
       const mime = icon.split(';base64')[0].split(':')[1];
 
       if(!mime){
           return next(new ErrorResponse('Invalid format.', 400, ['Icon is expected to be a base64 image']));
       }
 
       const fileName = name + '-' + 'icon';
 
       const fileData = {
           file: icon,
           filename: fileName,
           mimeType: mime
       }
 
       req.setTimeout(0);
       const s3Data =  await uploadBase64ImageFile(fileData);
 
       result = {
           url: s3Data.url,
           createdOn: dateToWordRaw()
       }
 
       // update payment data
       payment.icon = result.url;
       await payment.save();
 
   }
 
   res.status(200).json({
       error: false,
       errors: [],
       data: payment,
       message: `successful`,
       status: 200,
   });
});
 
// @desc     Update a payment method
// @route    PUT /api/resources/v1/payments/:id
// @access   Private
exports.updatePayment = asyncHandler(async (req, res, next) => {
 
   const payment = await Payment.findById(req.params.id);
   const { name, type, icon } = req.body
 
   if(!payment){
       return next(new ErrorResponse('Not found', 400, ['cannot find payment method']))
   }
 
   // upload the icon to s3 bucket
   let result;
   if(icon){
      
       const mime = icon.split(';base64')[0].split(':')[1];
 
       if(!mime){
           return next(new ErrorResponse('Invalid format.', 400, ['Icon is expected to be a base64 image']));
       }
 
       const fileName = name + '-' + 'icon';
 
       const fileData = {
           file: icon,
           filename: fileName,
           mimeType: mime
       }
 
       req.setTimeout(0);
       const s3Data =  await uploadBase64ImageFile(fileData);
 
       result = {
           url: s3Data.url,
           createdOn: dateToWordRaw()
       }
   }
 
   payment.name = name ? name : payment.name;
   payment.type = type ? type : payment.type;
   payment.icon = result.url ? result.url : payment.icon;
   await payment.save();
 
   res.status(200).json({
       error: false,
       errors: [],
       data: payment,
       message: `successful`,
       status: 200,
   });
});
 