const express = require('express'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  port = 3000,
  app = express(),
  serverConfig = require('./serverconfig'),
  session = require('express-session'),
  checkForSession = require('./middlewares/checkForSession'),
  swagCtrl = require('./controllers/swagController'),
  authCtrl = require('./controllers/authController'),
  cartCtrl = require('./controllers/cartController'),
  searchCtrl = require('./controllers/searchController');

app.use('/', express.static(__dirname + '/../public/build'));

app.use(session(serverConfig.session));
app.use(cors());
app.use(checkForSession);
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/public'));

app.post('/api/login', authCtrl.login);
app.post('/api/register', authCtrl.register);
app.post('/api/signout', authCtrl.signout);
app.get('/api/user', authCtrl.getUser);

app.get('/api/swag', swagCtrl.read);

app.post('/api/cart', cartCtrl.add);
app.post('/api/cart/checkout', cartCtrl.checkout);
app.delete('/api/cart', cartCtrl.delete);

app.get('/api/search', searchCtrl.search);

app.listen(port, function() {
  console.log('Server listening on port', port);
});
