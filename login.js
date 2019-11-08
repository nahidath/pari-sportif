var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'tototata',
	database : 'connexion'
});

var app = express();
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
			if (results.length > 0) {
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
	res.send('this is the authentication page');
})
app.get('/home', function(req, res,_next) {
	if (req.session.loggedin) {
		res.send('Welcome back, ' + req.session.id + '!');
	} else {
		res.send('Please login to view this page!');
	}
	res.end();
});

module.exports=app;

app.listen(3000);
