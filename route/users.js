const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../model/user');


// Login Page
router.get('/login', function(req,res){
    res.render('login', {title: 'Login'});
  });
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/',
      failureFlash: true
    })(req, res, next);
  });

module.exports=router;