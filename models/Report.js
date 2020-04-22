const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
    reporterId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    placeId: {
        type: String,
        required: true
    },
    productType: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Report = mongoose.model('report', ReportSchema);