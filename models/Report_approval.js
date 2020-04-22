const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReportApprovalSchema = new Schema({
  reportId: {
    type: Schema.Types.ObjectId,
    ref: "reports",
  },
  approverId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Report = mongoose.model(
  "reportApproval",
  ReportApprovalSchema
);
