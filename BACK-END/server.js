const port = process.env.PORT || 8080;
const host = process.env.HOST || '127.0.0.1';
const express = require('express');
const app = express();
const cors = require("cors");
app.use(cors());
app.use(cors({
  exposedHeaders: ['Location'],
}));


//load global libraries
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressSanitizer = require('express-sanitizer');
const expressValidator = require('express-validator');


//start the application
app.use(bodyParser.json(), bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(expressValidator());

app.listen(port, function(err) {
  if (!err) {
    console.log('Your app is listening on ' + host + ' and port ' + port);
  }
  else {
    console.log(err);
  }
});

module.exports = app;
require('./routes/CarrinhoRoute');
require('./routes/ProdutosRoute');
require('./routes/ProdutosCarrinhoRoute');
require('./routes/utilizadoresRoute');
require('./routes/MailRoute.js');
require('./loader.js');
