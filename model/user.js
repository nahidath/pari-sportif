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

/*var mongoose = require('mongoose');
var  Schema = mongoose.Schema;
var   bcrypt = require('bcryptjs');
var  SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
});



UserSchema.pre('save', function(next){
    var user=this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
    
        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
    
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });   
});     

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};*/
//module.exports = mongoose.model('User', userSchema);