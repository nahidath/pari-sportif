const express = require('express');
const router= express.Router();

//Login Page
router.get('/login', (req, res)=> res.send('Login'));
//Register Page
router.get('/register', (req, res)=> res.sendFile(__dirname+'/public/forumulaire_connexion.html'));
module.exports=router;