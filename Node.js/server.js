var express = require('express');
var a_router = require('./routes/a_router');
var v_router = require('./routes/v_router');
var common_router = require('./routes/common');

var app = module.exports = exports = express();

app.set('port', 3300);
app.set('views', './views');

app.use(express.static(__dirname + '/public'));
app.use('/a/', a_router);
app.use('/v/', v_router);
app.use('/', common_router);