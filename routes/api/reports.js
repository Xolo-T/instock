const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Report = require('../../models/Report');
const validateReportInput = require('../../validation/reports');

router.get('/test', (req, res) => {
    res.json({ msg: 'Welcome to reports'})
});



router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateTweetInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newTweet = new Tweet({
            text: req.body.text,
            user: req.user.id
        });

        newTweet.save().then(tweet => res.json(tweet));
    }
);


module.exports = router;