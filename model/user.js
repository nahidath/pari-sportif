const mongoose=require('mongoose');
var passportLocalMongoose = require("passport-local-mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const userSchema=mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: 1,
        trim: true
    },
    password:{
        type: String,
        required: true,
        minlength: 8
    },
    username:{
        type: String, 
        required: true
    }
});
userSchema.plugin(uniqueValidator);

const bcrypt= require('bcryptjs');
let SALT=10;
userSchema.pre('save', function(next){
    var user =this;
    if(user.isModified('password')){
        bcrypt.genSalt(SALT, function(err, salt){
            if(err) return next(err);
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password=hash;
                next();
            })
        })
    }else{
        next();
    }
})
userSchema.methods.comparePassword=  function(candidatePassword, checkpassword){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) return checkpassword(err);
        checkpassword(null, isMatch);
    });
};

const User= mongoose.model('User', userSchema);
module.exports={User}

