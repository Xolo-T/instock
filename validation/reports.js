const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateReportInput(data) {
    let errors = {};

    data.placeId = validText(data.placeId) ? data.placeId : '';

   

    data.productType = validText(data.productType) ? data.productType : '';

    

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};