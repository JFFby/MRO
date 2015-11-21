var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/public/*', function (req, res) {
    var file = path.resolve(__dirname, '..', '.' + req._parsedUrl.path);
    console.log(file);
    res.sendFile(file);
});

router.get('/node_modules/*', function (req, res) {
    var file = path.resolve(__dirname, '..', '.' + req._parsedUrl.path);
    console.log(file);
    res.sendFile(file);
});

module.exports = router;