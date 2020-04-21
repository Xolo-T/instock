const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// var jwt = require('jwt-simple');
// const jwt = require("jsonwebtoken");
const passport = require('passport');

require('../../config/passport')(passport)

const Report = require('../../models/Report');
const validateReportInput = require('../../validation/reports');

router.get('/test', (req, res) => {
    res.json({ msg: 'Welcome to reports'})
});



router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateReportInput(req.body);
        debugger
        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newReport = new Report({
            reporterId: req.user.id,
            placeId: req.body.placeId,
            productType: req.body.productType,
        });

        newReport.save()
            .then(report => res.json(report));
    }
);


module.exports = router;