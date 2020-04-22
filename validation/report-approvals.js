const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateReportApprovalInput(data) {
  let errors = {};

  data.reportId = validText(data.reportId) ? data.reportId : "";

  if (Validator.isEmpty(data.reportId)) {
    errors.reportId = "reportId field is required";
  }

  data.approverId = validText(data.approverId) ? data.approverId : "";

  if (Validator.isEmpty(data.approverId)) {
    errors.approverId = "Approver Id field is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
