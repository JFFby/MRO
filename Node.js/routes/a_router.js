var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var bugService = require('./../services/bugSevice');
var path = require('path');

router.get('/', function (req, res) {
    var file = path.resolve(__dirname, '..', 'views/bug_a.html');
    console.log(file);
    res.sendFile(path.resolve(file));
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
    //console.log(req.params);
    //console.log(req.query);
    bugService.deserialize(req.params.name, req.query.filename, function(data) {
        res.write(JSON.stringify(data));
        res.end();
    });
});

module.exports = router;