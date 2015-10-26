var express = require('express');
var router = express.Router();
var formidable = require('formidable');

// router.use(function timeLog(req, res, next) {
 // next();
// });

router.get('/a', function(req, res) {
 res.sendFile(__dirname + '/views/bug_a.html');
});

router.get('/public/*', function(req, res) {
 res.sendFile(__dirname + req._parsedUrl.path);
});

router.post('/push/:name', function(req, res) {	
    var form = new formidable.IncomingForm();
	form.parse(req, function(err,fields, files){
		console.log(fields);
		console.log(files);
		res.write(JSON.stringify({success:true}));
		res.end();
	});
});

module.exports = router;