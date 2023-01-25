const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

// @route  POST api/users
// desc :register a user
// access: public

router.post(
  '/register',
  [
    check('type', 'Please include a valid user typel').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // check if data has errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password, type } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
      user = new User({ email, password, type });
      //   encrypt password ans save to db
      let salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      let payload = {
        user: {
          id: user.id,
          user_type: user.type,
        },
      };
      jwt.sign(
        payload,
        process.env.SECRET,
        {
          expiresIn: '7d',
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token, user_type: user.type });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: 'Server error' });
    }
  }
);

// @route  POST api/users
// desc : login user and get token
// access: public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
      let isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
      let payload = {
        user: {
          id: user.id,
          user_type: user.type,
        },
      };
      jwt.sign(
        payload,
        process.env.SECRET,
        {
          expiresIn: '7d',
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token, user_type: user.type });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: 'Server error' });
    }
  }
);
module.exports = router;
