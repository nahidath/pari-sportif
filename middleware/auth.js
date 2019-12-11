const {User}= require('../model/user');
const express = require('express');
const app = express();

const isAuthCheck= (req, res, next) =>{
    if (!req.user){
        res.redirect('/api/user/signin');
    }else{
        req.user=user;
       next();
    }
};


app.get('/profile', isAuthCheck, (req, res)=>{
  res.render('profile', {user:req.user});
  console.log({user:req.user});
});
module.exports=isAuthCheck