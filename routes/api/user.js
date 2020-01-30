const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//const { check, validationResult } = require('express-validator');
const User = require('../../modals/User');

// @route   POST  api/users
// @desc    Register User
// @access  Public
router.post('/',  async (req, res) => {

  const { name, email, password } = req.body;

  try {
    //Check if user already registered
    let user = await User.findOne({ email });
    if (user){
      return res.status(400).json({errors: [{msg: 'User already registerd'}] });
    }

    user = new User({
     name, email, password
    });

    //encrypt passowrd
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    //Save data in database
    await user.save();

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
      res.status(500).send('Server error');
  }

});

module.exports = router;
