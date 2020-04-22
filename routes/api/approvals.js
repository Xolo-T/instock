const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const passport = require("passport");

const ReportApproval = require("../../models/Report_approval");
const validateReportApprovalInput = require("../../validation/report-approvals");

router.get("/test", (req, res) => {
    debugger
    res.json({ msg: "Welcome to reportsApprovals" });
});

router.post("/",
    (req, res) => {
        const { errors, isValid } = validateReportApprovalInput(req.body);
        // debugger
        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newReportApproval = new Report({
            reportId: req.body.reportId,
            approverId: req.body.approverId,
        });

        newReportApproval.save().then((ReportApproval) => res.json(ReportApproval));
    }
);

router.get("/report", (req, res) => {
  //   debugger;
    ReportApproval.find({ reportId: req.body.reportId })
    .sort({ date: -1 })
    .then((reportsApprovals) => res.json(reportsApprovals))
    .catch((err) =>
        res
            .status(404)
            .json({ noReportApprovalsFound: "No report Approvals found for this report" })
        );
});

router.get("/", (req, res) => {
    // debugger
    ReportApproval.find()
        .sort({ date: -1 })
        .then((reportsApprovals) => res.json(reportsApprovals))
        .catch((err) =>
            res.status(404).json({ noReportsFound: "No reports found" })
        );
});

router.get("/:id", (req, res) => {
  // debugger
    ReportApproval.findById(req.params.id)
        .then((reportApproval) => res.json(reportApproval))
        .catch((err) =>
            res.status(404).json({ noreportfound: "No report found with that ID" })
        );
});

router.get("/user/:user_id", (req, res) => {
    ReportApproval.find({ approverId: req.params.user_id })
        .sort({ date: -1 })
        .then((reportApprovals) => res.json(reportApprovals))
        .catch((err) =>
        res
            .status(404)
            .json({ noreportApprovalsFound: "No reportApprovals found from that user" })
        );
});

module.exports = router;
