const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// var jwt = require('jwt-simple');
// const jwt = require("jsonwebtoken");
const passport = require('passport');

// require('../../config/passport')(passport)

const Report = require('../../models/Report');
const validateReportInput = require('../../validation/reports');

router.get('/test', (req, res) => {
    res.json({ msg: 'Welcome to reports'})
});

router.post('/',
    // passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateReportInput(req.body);
        debugger
        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newReport = new Report({
            reporterId: req.body.userId,
            placeId: req.body.placeId,
            productType: req.body.productType,
        });

        newReport.save()
            .then(report => res.json(report));
    }
);

router.get('/', (req, res) => {
    debugger
    Report.find()
        .sort({ date: -1 })
        .then(reports => res.json(reports))
        .catch(err => res.status(404).json({ noReportsFound: 'No reports found' }));
});




router.get('/place', (req, res) => {
    debugger
    Report.find({ placeId: req.body.placeId })
    // Report.find({ placeId: 'New York' })
        .sort({ date: -1 })
        .then(reports => res.json(reports))
        .catch(err =>
            res.status(404).json({ noReportsFound: 'No reports found for this location' }
            )
        );
});


router.get('/:id', (req, res) => {
    debugger
    Report.findById(req.params.id)
        .then(report => res.json(report))
        .catch(err =>
            res.status(404).json({ noreportfound: 'No report found with that ID' })
        );
});

router.get('/user/:user_id', (req, res) => {
    Report.find({ reporterId: req.params.user_id })
        .sort({ date: -1 })
        .then(reports => res.json(reports))
        .catch(err =>
            res.status(404).json({ noReportsFound: 'No reports found from that user' }
            )
        );
});


module.exports = router;