var http = require('http');
var app = require("./server");
var port = app.get('port');

http.createServer(app).listen(port, function(){
	console.log('server start:' + port);
});