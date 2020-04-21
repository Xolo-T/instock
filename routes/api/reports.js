const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Report = require('../../models/Report');
// const validateReportInput = require('../..');

router.get('/', (req, res) => {
    res.json({ msg: 'Welcome to reports'})
});


module.exports = router;