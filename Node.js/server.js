var express = require('express');
var router = require('./router');

var app = module.exports = exports = express();

app.set('port', 3300);
app.set('views','./views');

app.use(express.static(__dirname + '/public'));
app.use('/',router);