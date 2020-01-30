const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../../modals/User');


// @route   POST  api/auth
// @desc    Authenticate user and get token
// @access  Public

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch(err){
    res.send(500).send('Server error');
  }
});

router.post(
  '/',
  [
    check('email', "Please enter valid email").isEmail(),
    check('password', "Please enter valid password").exists()
  ],
  async (req, res) => {

  const { email, password } = req.body;

  try {
    //Check if user already registered
    let user = await User.findOne({ email });
    if (!user){
      return res.status(400).json({errors: [{msg: 'Invalid email or passwordddd'}] });
    }

    //Match username and password
    const doesMatch = await bcrypt.compare(password, user.password);
    if(!doesMatch){
      return res.status(400).json({errors: [{msg: 'Invalid email or password'}] });
    }

    //Save json Web Token
    const payload = {
      user: { id: user.id }
    };
    jwt.sign(payload, config.get('jwtSecret'), { expiresIn : 360000}, (err, token) => {
        if(err) throw err;
        res.json({ token });
      }
    );

  } catch(err){
      res.status(500).send('Server errorrr');
  }

});

module.exports = router;
