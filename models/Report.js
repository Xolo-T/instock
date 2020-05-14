const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
    reporterId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    placeId: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    lng: {
        type: Number,
        required: true,
    },
    lat: {
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