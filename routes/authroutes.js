
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { User } = require('../models/user');
const passport = require('../config/bearer')
const Token = require("../models/token");
const sendEmail = require("../config/sendmail");
const crypto = require("crypto");
const Joi = require("joi");



// register user with hashed passwored
router.post("/register", async (req, res) => {
    console.log("creating user ..", req.body);
    let newUser = new User();
    newUser.username = req.body.username;
    newUser.email = req.body.email;
    newUser.role = 0;
    newUser.password = await bcrypt.hash(req.body.password, 10)
    User.findOne({ email: req.body.email }, function (err, user) {
        if (!user) {
            newUser.save()
                .then(result => res.status(201).json(result))
                .catch(err => res.status(500).json(err));
        }
        else {
            res.status(500).json("Email existe déjà");
        }
    });


})




//login
router.post("/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).json({
            success: false,
            msg: "Veuillez vérifier votre adresse mail!",
        });
    }
    else {
        user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) {
                const token = jwt.sign({
                    id: user._id,
                    email: user.email
                },
                    process.env.TOKEN_KEY, {
                    expiresIn: 86400
                });

                return res.json({ success: true, user, token: token });
            } else {
                res.status(401).send({ success: false, msg: 'Vérifier votre mot de passe!' });
            }
        })
    }
});




//login with passport security
router.get('/profile',
    passport.authenticate('bearer', { session: false }),
    function (req, res) {
        res.json(req.user);
    });


//forgot password

router.post("/forgot", async (req, res) => {
    try {
        const schema = Joi.object({ email: Joi.string().email().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(400).send("user with given email doesn't exist");

        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const link = `${process.env.BASE_URL}/resetpassword/${user._id}/${token.token}`;
        await sendEmail(user.email, "Password reset", link);

        res.status(200).json({ msg: "password reset link sent to your email account", token });
    } catch (error) {
        res.status(500).json({ err: "An error occured" });
        console.log(error);
    }
});
//reset password
router.post("/:userId/:token", async (req, res) => {
    try {
        const schema = Joi.object({ password: Joi.string().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findById(req.params.userId);
        if (!user) return res.status(400).send("invalid link or expired");

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link or expired");

        user.password = await bcrypt.hash(req.body.password, 10);
        await user.save();
        await token.delete();

        res.status(200).json({ msg: "password reset sucessfully." });
    } catch (error) {
        res.status(500).json({ msg: "An error occured" });
        console.log(error);
    }
});

//get profile
router.get('/details/:id', (req, res) =>
    User.findOne({
        _id: req.params.id
    }).populate("cours")
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json(err))

);

//get all users
router.get('/allusers', (req, res) => {
    User.find()
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json(err));
});

//update role user
router.put('/role/:id', (req, res) =>
{
    User.findByIdAndUpdate(
        req.params.id
        ,
        {
                role:true
        }
        , { new: true })
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json(err))
});


//update user
router.put('/user/:id', (req, res) =>
    User.findOneAndUpdate({
        _id: req.params.id
    },
        req.body, { new: true }
    ).then(result => res.json(result))
        .catch(err => res.status(500).json(err))

);

module.exports = router;