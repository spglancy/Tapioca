const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const verifyToken = require('./verifyToken.js');
const cookieParser = require('cookie-parser');


/**
 * Renders Signup template
 */
router.get('/signup', (req, res) => {
  res.render('signup');
})

/**
 * Renders login page
 */

router.get('/login', (req, res) => {
  res.render('login');
})

/**
 *  Register usr with this endpoint
 */

router.post('/register', (req, res) => {
  var user = new User(req.body);
  user.save().then((user) => {
      // var token = jwt.sign({ _id: user._id }, config.SECRET, { expiresIn: "60 days" });
      // res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
      res.redirect('/');
  });
  });


/**
 * Logs the user in.
 */

router.post('/', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404);
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401);
  });
  res.redirect(`/`);
});

module.exports = router;
