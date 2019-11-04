var express = require('express');
var bodyParser = require("body-parser");
 
// serveur html
var server = express();
server.use(bodyParser.urlencoded({ extended: true }));
server.listen(80);
 
server.get('/formulaire_connexion.html', function(request, response) {
  response.sendFile( __dirname  + '/formulaire_connexion.html');
});

server.post('/post.html', function(request, response) {
  var p1 = request.body.p1; 
  console.log("p1=" + p1);
});