const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
    reporterId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    reporterName: {
        type: String,
        required: true
    },
    vendorPlaceId: {
        type: String,
        required: true
    },
    vendorName: {
        type: String,
        required: true,
    },
    vendorAddress: {
        type: String,
        required: true,
    },
    vendorLat: {
        type: Number,
        required: true,
    },
    vendorLng: {
        type: Number,
        required: true,
    },
    productType: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    approvals: {
        type: Number
    }
});

module.exports = Report = mongoose.model('report', ReportSchema);