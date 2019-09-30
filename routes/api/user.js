const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../../modals/User.js');

// @route   POST  api/users
// @desc    Register User
// @access  Public

router.post(
  '/',
 [
   check('name', 'Name is Required').not().isEmpty(),
   check('email', "Please add valid email").isEmail(),
   check('password', "Please enter valid password with min 6 character").isLength({min:6})
 ],
 async (req, res) => {
   const errors = validationResult(req);
   if(!errors.isEmpty()){
     return res.status(400).json({errors: errors.array()})
  };

  const { name, email, password } = req.body;



   try {
     let user = await User.findOne({ email });
     if(user){
       return res.status(400).json({errors: [{ msg: "User already exist" }] });
     } else {
       console.log('sdfsdfsdfs');
     }

     user = new User({
       name, email, password
     });
     const salt = await bcrypt.genSalt(10);
     user.password = await bcrypt.hash(password, salt);
     console.log(user);

     await user.save();
     //res.send('User Registered');

     const payload = {
       user: {
         id: user.id
       }
     }
     jwt.sign(
       payload,
       "secrettoken",
       { expiresIn : 360000},
       (err, token) => {
         if(err) throw err;
         res.json({ token });
       }
     )

   } catch(err){
     //console.log(err.message);
     res.status(500).send('Server error');
   }


});

module.exports = router;
