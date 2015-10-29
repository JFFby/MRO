var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var bugService = require('./services/bugSevice');

router.get('/a', function (req, res) {
    res.sendFile(__dirname + '/views/bug_a.html');
});

router.get('/public/*', function (req, res) {
    res.sendFile(__dirname + req._parsedUrl.path);
});

router.post('/push/:name', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        bugService.serialize(req.params.name, fields, function(data) {
            res.write(JSON.stringify(data));
            res.end();
        });
    });
});

router.get('/fetch/:name', function(req, res) {
    console.log(req.params);
    console.log(req.query);
    bugService.deserialize(req.params.name, req.query.fileName, function(data) {
        res.write(JSON.stringify(data));
        res.end();
    });
});

module.exports = router;