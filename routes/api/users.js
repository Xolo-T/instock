const express = require("express");
const router = express.Router();

const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const keys = require('../../frontend/src/config/keys');
const jwt = require("jsonwebtoken");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const passport = require('passport');


router.get("/test", (req, res) => {
    res.json({ msg: "This is the users route" });    
}); 

router.post("/register", (req, res) => {


  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
      return res.status(600).json(errors);
  }

  User.findOne({ email: req.body.email })
  .then((user) => {
    if (user) {
        return res
        .status(400)
        .json({ email: "A user has already registered with this email" });
    } else {
        const newUser = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            });
        
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save()
                    .then((user) => res.json(user))
                    // .catch((err) => res.json(err));
            });
        });
    }

  });

});


router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    
    if (!isValid) {
        return res.status(600).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ email: "This user does not exist" });
            }

            bcrypt.compare(password, user.password)
                .then((isMatch) => {
                    if (isMatch) {
                        const payload = { id: user.id, name: user.userName };
                        // res.json({ msg: 'Success!'});
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn: 3600 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token,
                                });
                            }
                        );
                    } else {
                        return res.status(400).json({ password: "Incorrect password" });
                    }
                });
        });
});


// Logout
router.get('/logout', (req, res) => {
    req.logout();
    // req.flash('success_msg', 'You are logged out');
    // res.redirect('/users/login');
    res.json({ message: 'You are logged out'})
});

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        userName: req.user.handle,
        email: req.user.email
    });
})

module.exports = router;
