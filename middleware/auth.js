/*const {User}= require('../model/user');
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
module.exports=isAuthCheck*/

const express = require('express');
var flash = require('connect-flash');
var app = express();
var session=require('express-session');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(session({
  secret: 'secret', 
  cookie: { maxAge: 60000 },
  resave: false,    // forces the session to be saved back to the store
  saveUninitialized: false  // dont save unmodified
}));
app.use(flash());