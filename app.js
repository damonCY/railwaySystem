var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./routes')(app);


app.use(express.static(path.join(__dirname,'public')));
app.listen(3000);
console.log('start')