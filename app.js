const data = require('./data');
const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');

app.engine('mustache', mustacheExpress());
// where to look
app.set('views', './views');
// what to look for "mustache extension"
app.set('view engine', 'mustache');

// load static files in public folder
app.use(express.static('public'));

app.get('/', function(request, response) {
  response.render('index', data);
})


for (let i = 0; i <data.users.length; i++) {
  if (data.users[i].job === null) {
    data.users[i].job = 'Available for work';
  }
}

// loops through data.users and finds username property value that matches /'xxxx'
// renders just that object
app.get('/:user', function(request, response) {
  let userName = request.params.user;
  for (let i = 0; i < data.users.length; i++) {
    if (data.users[i].username === userName) {
      response.render('user', data.users[i]);
    }
  }
});

app.listen(3000)
