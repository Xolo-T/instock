const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateReportInput(data) {
    let errors = {};
    // likely do not need these validations because the user does not directly submit them
    data.reporterId = validText(data.reporterId) ? data.reporterId : '';
    data.reporterName = validText(data.reporterName) ? data.reporterName : '';
    data.vendorPlaceId = validText(data.vendorPlaceId) ? data.vendorPlaceId : '';
    data.vendorName = validText(data.vendorName) ? data.vendorName : '';
    data.vendorAddress = validText(data.vendorAddress) ? data.vendorAddress : '';
    data.vendorPhone = validText(data.vendorPhone) ? data.vendorPhone : '';
    data.vendorLat = validText(data.vendorLat) ? data.vendorLat : '';
    data.vendorLng = validText(data.vendorLng) ? data.vendorLng : '';
    data.productType = validText(data.productType) ? data.productType : '';

    

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};