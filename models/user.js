const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require ('bcrypt');
const Joi = require("joi");

const UserSchema = new Schema({
    username:{
        type:String,
        required:[true,'firstName field is required']
    },
    email:{
        type:String,
        required:[true,'email field is required']
    },
     password:{
        type:String,
        required:[true,'password field is required']
    }, role:{
        type:Boolean,
        required:[false]
    },
    token:{
        type: String
    },
    cours:[{
        type: mongoose.Schema.Types.ObjectId, 
    ref: 'formation', 
   required: true
    }]
},
{ timestamps: true ,versionKey: false });

const validate = (user) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    return schema.validate(user);
};
UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

const User = mongoose.model('user', UserSchema);

module.exports={User, validate};