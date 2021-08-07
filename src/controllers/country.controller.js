const ErrorResponse = require('../utils/errorResponse.util');
const { asyncHandler, strIncludesEs6, strToArrayEs6 } = require('@nijisog/todo_common');
const mongoose = require('mongoose');

const Country = require('../models/Country.model')

// @desc    Get All Countries
// @route   GET /api/resources/v1/countries
// access   Public
exports.getCountries = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
})

// @desc    Get A Country
// @route   GET /api/resource/v1/countries/:id
// access   Public
exports.getCountry = asyncHandler(async (req, res, next) => {
	let reqId = req.params.id 
    let country;

	if(strIncludesEs6(reqId, '+')){ // find a country by phoneCode
		country = await Country.findOne({ phoneCode: reqId });
	}

	if(mongoose.Types.ObjectId.isValid(reqId)){ // find by valid mongoose ID
		country = await Country.findById(reqId); 
	}  
    if(!country){
        return next(new ErrorResponse('Cannot find country', 404, `[Cannot find country [${req.params.id}]]`))
    }

    res.status(200).json({  
        error: false,
        errors: [],
        data: country,
        message: 'Successful',
        status: 200
    })
})

// @desc     Get all states for a country
// @route    GET /api/v1/countries/states/:id
// @access   Public
exports.getStates = asyncHandler(async (req, res, next) => {
	const c = await Country.findById(req.params.id)

	if (!c) {
		return next(
			new ErrorResponse(`Cannot find country]`, 404, [`Cannot find country [${req.params.id}`])
		);
	}    

	const states = c.states;
	const countryData = {
		_id: c._id,
		name: c.name,
		code2: c.code2,
		code3: c.code3,
		region: c.region,
		subregion: c.subregion
	}

	res.status(200).json({
        error: false,
        errors: [],
		message: `Country data fetched successfully`,
		country: countryData,
        data: states,
        status: 200
	});
});