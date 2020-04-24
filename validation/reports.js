const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateReportInput(data) {
    let errors = {};

    data.placeId = validText(data.placeId) ? data.placeId : '';

    // if (Validator.isEmpty(data.placeId)) {
    //     errors.placeId = 'placeId field is required';
    // }

    data.productType = validText(data.productType) ? data.productType : '';

    // if (Validator.isEmpty(data.productType)) {
    //     errors.productType = 'Product type field is required';
    // }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};