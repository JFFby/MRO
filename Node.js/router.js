var express = require('express');
var router = express.Router();

router.use(function timeLog(req, res, next) {
 console.log('Time: ', Date.now());
	console.log(req._parsedUrl);
 next();
});
router.get('/a', function(req, res) {
 res.sendFile(__dirname + '/views/bug_a.html');
});

router.all('/push/:name', function(req, res) {
	console.log(req.params);
	console.log(req._parsedUrl);
	res.end();
});

module.exports = router;