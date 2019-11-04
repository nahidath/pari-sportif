//const express = require('express');
const hbs = require('express-handlebars');
//const app = express();
var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
app.use(express.static('public'));

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

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'tototata',
	database : 'connexion'
});


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/formulaire_connexion.html'));
});


app.post('/auth', (req, res)=>  {
	var id = req.body.id;
	var password = req.body.password;
	if (id && password) {
		connection.query('SELECT * FROM accounts WHERE id = ? AND password = ?', [id, password], function(error, results, fields) {
			if (results.length >= 0) {
				req.session.loggedin = true;
				req.session.id = id;
				res.redirect('/home');
			} else {
				res.send('Incorrect Username and/or Password!');
			}			
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
	//res.send('this is the authentication page');
})
app.get('/home', function(req, res) {
	if (req.session.loggedin) {
		res.send('Welcome back, ' + req.session.id + '!');
	} else {
		res.send('Please login to view this page!');
	}
	res.end();
});

module.exports=app;





app.get('/*', function (req, res) {
  res.sendStatus("404");
})

app.listen(3000, function () {
  console.log('Application qui écoute sur le port 3000!');
})
