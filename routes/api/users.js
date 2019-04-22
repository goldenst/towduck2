var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var keys = require('../../config/keys');
var passport = require ('passport');

// load imput validation
var validateRegisterinput = require ('../../validation/register');

// load user model
var User = require('../../models/User');

// @route api/user/test
// @desc test user route
// @access Public
router.get('/test', (req, res) => res.json({
  msg: 'users works'
}));

// @route api/user/register
// @desc test register route
// @access Public
router.post('/register', (req, res) => {
var { errors, isValid } = validateRegisterinput(req.body);


// check validation
if(!isValid) {
  return res.status(400).json(errors)
}

  User.findOne({
      email: req.body.email
    })
    .then(user => {
      if (user) {
        return res.status(400).json({
          email: 'email already extsts'
        });
      } else {
        var newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          })
        })
      }
    })
});

// @route api/user/login
// @desc login user / return jwt token
// @access Public
router.post('/login', (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  // find user
  User.findOne({
    email
  }).then(user => {
    if (!user) {
      return res.status(404).json({
        email: 'User not found'
      });
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // user matchet
        var payload = {
          id: user.id,
          name: user.name
        }

        // sign token
        jwt.sign(
          payload, keys.secretOrKey, {
            expiresIn: 3600
          },
          (err, token) => {
            res.json({
              sucess: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        return res.status(400).json({
          password: 'Password Incorrect'
        })
      }
    });
  });
});

// @route api/user/current 
// @desc return current user
// @access Private
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json(user)
})

module.exports = router;