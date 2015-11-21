var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var bugService = require('./../services/bugSevice');
var path = require('path');

var urlToFetchPreview = "/fetchPreview/";

router.get('/bug', function (req, res) {
    res.render("./a/bug.jade");
});

router.get('/thin', function (req, res) {
    res.render("./a/thining.jade");
});

router.post('/push/:name', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        bugService.serialize(req.params.name, fields, function (data) {
            res.write(JSON.stringify(data));
            res.end();
        });
    });
});

router.get('/results/:name', function (req, res) {
    bugService.deserialize(req.params.name, req.query.filename, function (data) {
        data.fileName = "/a" + urlToFetchPreview + req.query.filename;
        res.render("results.jade", {
            localData: data
        });
    });
});

router.get('/ex', function (req, res) {
    res.render("./a/binryExtension.jade");
});

router.get(urlToFetchPreview + ':file', function (req, res) {
    bugService.renderImage(req.params.file, req.query.number, function (url, size) {
        res.write(JSON.stringify({ url: url, size: size }));
        res.end();
    });
});

module.exports = router;