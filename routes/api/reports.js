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
        
        if (!isValid) {
            return res.status(600).json(errors);
        }

        const newReport = new Report({
            reporterId: req.body.reporterId,
            reporterName: req.body.reporterName,
            placeId: req.body.placeId,
            storeName: req.body.storeName,
            description: req.body.description,
            lng: req.body.lng,
            lat: req.body.lat,
            approvals: 0,
        });

        newReport.save()
            .then(report => res.json(report));
            // .then(
            //     Report.find()
            //         .sort({ date: -1 })
            //         .then(reports => res.json(reports))
            //         .catch(err => res.status(404).json({ noReportsFound: 'No reports found' }))
            // );
    }
);

// router.patch('/update', (req, res) => {
//     Report.findById(req.body.id, function (err, reportToUpvote) {
//         if (!reportToUpvote)
//             return next(new Error('Could not find report'));
//         else {
//             // updating
//             reportToUpvote.approval += 1;
//             reportToUpvote.save(function (err) {
//                 if (err)
//                     console.log('error')
//                 else
//                     console.log('success')
//             });
//         }
//     });
// });

router.patch('/update', (req, res) => {
    Report.findById(req.body.id).then((report) => {
        report.approvals += 1;
        report.save();
        res.json(report)
    })
})

router.get("/:placeId", (req, res) => {

  Report.find({ placeId: req.params.placeId })
    // Report.find({ placeId: 'New York' })
    .sort({ date: -1 })
    .then((reports) => res.json(reports))
    .catch((err) =>
      res
        .status(404)
        .json({ noReportsFound: "No reports found for this location" })
    );
});


router.get('/', (req, res) => {
    
    Report.find()
        .sort({ date: -1 })
        .then(reports => res.json(reports))
        .catch(err => res.status(404).json({ noReportsFound: 'No reports found' }));
});


router.get('/:id', (req, res) => {
    
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