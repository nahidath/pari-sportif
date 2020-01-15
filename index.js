const express = require('express');
const hbs = require('express-handlebars');
var bodyParser = require('body-parser'); 
const mongoose = require('mongoose'); 
mongoose.set('useCreateIndex', true);
const passport= require('passport');
var session=require('express-session');
const bcrypt= require('bcryptjs');
const router = express.Router();
const cookieParser = require('cookie-parser');
const {User}= require('./model/user');
const nodemailer = require("nodemailer");
let jsdom = require('jsdom').JSDOM;
var moment=require('moment');

module.exports = router;



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
app.use(bodyParser.urlencoded({ 
  extended: false
})); 
app.use(bodyParser.json()); 
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
// set sessions and cookie parser
app.use(cookieParser());
app.use(session({
  secret: 'secret', 
  resave: false,    // forces the session to be saved back to the store
  saveUninitialized: true  // dont save unmodified
}));
app.use(passport.initialize());
app.use(passport.session());

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

  db.collection('connexion').insertOne(data,function(err, collection){ 
    if (err) throw err; 
    console.log("Nouvelle personne ajoutée !");
    res.render('success', {success_msg:'Inscription réussie, vous pouvez à présent vous connecter !'});          
  }); 
});
      


app.get('/',function(req,res){
  res.set({ 
    'Access-control-Allow-Origin': '*'
    }); 
  return res.redirect('page_principale.html'); 
});




  
// login
app.get('/connexion', (req, res) => res.render('connexion'));

app.post('/api/user/signup', function(req, res){
  const user= new User({
    email: req.body.email,
    password: req.body.password,
    username: req.body.nom
  }).save((err, response)=>{
    if(err) res.status(400).send(err)
    res.status(200).send(response)
  })
})

app.post('/api/user/signin', function(req,res){
  const user= new User({
    email: req.body.email,
    password: req.body.password
  });

 user.save(function log (err){
   
  
  User.findOne({email: req.body.email}).select('email password ').exec(function(err, user){
    if(!user){
      return res.redirect('/ble');
      
    }
    bcrypt.compare(req.body.password, user.password, function(err,isMatch){
      if (err) throw err;

      if(!isMatch) return res.redirect('/ble');
        res.render('profile');
      
    });
    
    
  });
  });
});


app.get('/ble', (req,res)=>{
  res.render('connexion', { message: 'Email ou Mot de passe incorrect !' });
  
})



//contact form
app.post('/email',function(req, res, next) {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Nom: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Objet de la requête: ${req.body.subject}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'bettowindant@gmail.com', // generated ethereal user
        pass: 'Bettowin-93'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });


  var mailOptions = {
    from: '"Bet to Win Contact" <bettowindant@gmail.com>', // sender address
    to: 'bettowindant@gmail.com', // list of receivers
    subject: 'Bet to Win Contact Requête', // Subject line
    text: 'Hello world?', // plain text body
    html: output //html body
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      res.redirect('/');
    }else{
      console.log('Message sent: %s', info.response); 
      res.render('contact', {msg:'Votre message a bien été envoyé !'});
    }
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    
  });
  transporter.close();
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

