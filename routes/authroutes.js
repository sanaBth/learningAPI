
const express = require('express');
const router =  express.Router();
const bcrypt = require ('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require('../models/user');
const passport = require('../config/bearer')

// register user with hashed passwored
router.post ("/register", async (req,res) => {
    console.log("creating user ..",req.body);
    let newUser = new User();
    newUser.username = req.body.username;
    newUser.email = req.body.email;
    newUser.password =  await bcrypt.hash(req.body.password, 10)
    User.findOne({email:req.body.email}, function(err, user){
        if(!user) {
            newUser.save()
            .then(result =>res.status(201).json(result) )
            .catch(err => res.status(500).json(err)); 
        }
        else {
            res.status(500).json("email existe deja");
          }
    });


})

//login
 router.post("/login", async (req,res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) 
    {
      return res.status(404).json({
        success: false,
        msg: "Email not found",
      });
    } 
   else
   {
        user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) 
            {
               const token=jwt.sign({
                   id:user._id,
                   email:user.email
               },
               process.env.TOKEN_KEY,{
                   expiresIn:86400
               });
              
                return res.json({success: true,user, token:token});
            } else 
            {
                res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
            }
   })
}
      }) ;




//login with passport security
router.get('/profile', 
passport.authenticate('bearer', { session: false }),
function(req, res) {
  res.json(req.user);
});





module.exports = router;