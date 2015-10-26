
var http = require('http');
var app = require("./server");
//var router = require("./router");
//var requestHandlers = require("./requestHandlers");
var port = app.get('port');

http.createServer(app).listen(port, function(){
	console.log('visit to localhost:' + port);
});