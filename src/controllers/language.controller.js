const ErrorResponse = require('../utils/errorResponse.util');
const { asyncHandler, strIncludesEs6, strToArrayEs6 } = require('@nijisog/todo_common');

const Language = require('../models/Language.model');

// @desc    Get All Languages
// @route   GET /api/identity/v1/languages
// access   Public
exports.getLanguages = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
})

// @desc    Get A Language
// @route   GET /api/identity/v1/language/:id
// access   Public
exports.getLanguage = asyncHandler(async (req, res, next) => {
    const lang = await Language.findById(req.params.id)

    if(!lang){
        return next(new ErrorResponse('Cannot find language', 404, ['Cannot find language']))
    }

    res.status(200).json({
        error: false,
        errors: [],
        data: lang,
        message: 'successful',
        status: 200
    })
})