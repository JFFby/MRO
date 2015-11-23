var express = require('express');
var router = express.Router();
var path = require('path');
var imgService = require('./../services/imgService');

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

router.get('/imgs', function (req, res) {
    console.log(req.query.path);
    var imgPath = path.resolve(__dirname, '..','' + req.query.path);
    console.log(imgPath);
    var files = imgService.getFiles(imgPath);
    res.write(JSON.stringify({ files: files, basePath: path.resolve(__dirname, '..') }));
    res.end();
});

module.exports = router;