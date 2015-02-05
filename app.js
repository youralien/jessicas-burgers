var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose');

// Routes
var index = require('./routes/index');

var app = express();

// Set up Templating
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Set up Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set the Mongo URI
var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";

// Connect to Mongoose DB
mongoose.connect(mongoURI)

// Set the port
var PORT = process.env.PORT || 3000; 

app.get('/stockIngredients', index.stockIngredients);
app.get('/ingredients', index.listIngredients);
app.post('/ingredients', index.toggleIngredients);
app.get('/order', index.makeOrder);
app.post('/order', index.submitOrder);
app.get('/kitchen', index.listOrders);
app.post('/kitchen', index.completeOrder);

app.listen(PORT);
