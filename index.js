var express = require('express');
var app = express();
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());

var lista = ['carne', 'oleo', 'arroz', 'macarr�o'];
var users = {};


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/coisas/:id', function(req, res) {
  if (req.params.id) {
      var l = users[req.params.id];
      if (!l) {
	l = [];
	users[req.params.id] = l;
      }
      res.send(JSON.stringify(l));
  } else {
    res.send(JSON.stringify(lista));
  }
});

app.post('/coisas', function(req, res) {
  console.log('Params: ', req.body);
  if(req.body.id) {
    users[req.body.id] = req.body.coisas;
  }
  res.send('OK');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
