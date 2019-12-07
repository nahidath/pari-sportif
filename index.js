const express = require('express');
const hbs = require('express-handlebars');
var bodyParser=require("body-parser"); 
const mongoose = require('mongoose'); 
const passport= require('passport');
var session=require('express-session');
const flash = require('connect-flash');
const router = express.Router();


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
  extended: false
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
const {User}= require('./model/user');
app.post('/api/user/signup', function(req, res){
  const user= new User({
    email: req.body.email,
    password: req.body.password
  }).save((err, response)=>{
    if(err) res.status(400).send(err)
    res.status(200).send(response)
  })
})

app.post('/api/user/signin', function(req,res){
  const user= new User({
    email: req.body.email,
    password: req.body.password
  })

 user.save(function(err){
   User.find({'email': req.body.email}, function(err, user){

    if(!user)res.json({message:'Echec de connexion, email non trouvé'})

    if(user!=null){
      user.comparePassword(req.body.password, function(err, isMatch){
      if(err) throw err;
      if(!isMatch) return res.status(400).json({
        message:'Mauvais mot de passe'
      });
      res.status(200).send('Connexion reussie !');
    })
    }
    
  })
  })
});







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

