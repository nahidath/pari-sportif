const express = require('express');
const hbs = require('express-handlebars');
var bodyParser=require("body-parser"); 
const mongoose = require('mongoose'); 
const passport= require('passport');

//Registration
const uri="mongodb+srv://dbProject:DANT10@cluster0-r2dpv.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(function() {
    console.log('now connected to mongodb!');
  })
  .catch(function (err) {
    console.log ("Erreur lors de la connection à mongodb : ", err);
  })


var db=mongoose.connection; 
db.on('error', console.log.bind(console, "Erreur connexion")); 
db.once('open', function(callback){ 
    console.log("Connecté"); 
}) 
const app = express();

app.use(express.static('public'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ 
  extended: true
})); 

app.post('/sign_up', function(req,res){ 
  var nom = req.body.nom; 
  var prenom =req.body.prenom; 
  var email = req.body.email; 
  var tel =req.body.tel;
  var mdp=req.body.mdp;
  var cmdp=req.body.cmdp;
  var icon_cb =req.body.icon_cb; 
  var num_carte=req.body.num_carte;
  var crypt=req.body.crypt;
  var gender=req.body.gender;
  var offre=req.body.offre;
  var accept=req.body.accept;

var data = { 
  "nom": nom, 
  "prenom":prenom, 
  "email":email, 
  "tel":tel,
  "mdp":mdp,
  "cmdp":cmdp,
  "icon_cb":icon_cb,
  "num_carte":num_carte,
  "crypt":crypt,
  "gender":gender,
  "offre":offre,
  "accept":accept 
} 

db.collection('details').insertOne(data,function(err, collection){ 
  if (err) throw err; 
  console.log("Nouvelle personne ajoutée !"); 
          
}); 
      
return res.redirect('page_principale.html'); 
}) 
app.get('/',function(req,res){
  res.set({ 
    'Access-control-Allow-Origin': '*'
    }); 
  return res.redirect('page_principale.html'); 
  })


// login
const User = require('./model/user'); 
  
const LocalStrategy = require('passport-local').Strategy; 
passport.use(new LocalStrategy(User.authenticate())); 
app.use(passport.initialize()); 
app.use(passport.session()); 
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser()); 




app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'index',
  layoutsDir: __dirname + '/views/',
}));
app.set('view engine', 'hbs');
app.get('/inscription', function(req,res){
  console.log(req.query);
  res.sendStatus("200");
})


app.get('/contenu', function(req,res){
	console.log(req.headers['user-agent']);	
 	res.sendFile(__dirname+'/public/page_principale.html');
})




app.get('/*', function (req, res) {
  res.sendStatus("404");
})

app.listen(3000, function () {
  console.log('Application qui écoute sur le port 3000!');
})

