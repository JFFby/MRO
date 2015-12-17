var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var bugService = require('./../services/bugSevice');
var fiService = require('./../services/fiService');
var path = require('path');
var request = require('request');
var needle = require('needle');

var urlToFetchPreview = "/fetchPreview/";

var options = {
    open_timeout: 20000
}

router.get('/bug', function (req, res) {
    res.render("./a/bug.jade");
});

router.get('/thin', function (req, res) {
    res.render("./a/thining.jade");
});

router.get('/fi', function (req, res) {
    res.render("./a/fi.jade");
});

router.get('/bin', function (req, res) {
    res.render("./a/bin.jade");
});

router.get('/perc', function (req, res) {
    res.render("./a/perceptrone.jade");
});

router.post('/perc/define', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
        //request.post(
        //     'http://localhost:1220/Determine',
        //     { form: { path: fields.data, resize: true } },
        //     function (error, response, body) {
        //         console.log(body);
        //         if (!error && response.statusCode == 200) {
        //             res.write(body);
        //             res.end();
        //         } else {
        //             res.write('fali');
        //             res.end();
        //         }
        //     }
        // );
        needle.post('http://localhost:1220/Determine', { path: fields.data, resize: true }, options,
            function(error, response, body) {
                console.log(body);
                if (!error && response.statusCode == 200) {
                    res.write(body);
                    res.end();
                } else {
                    res.write('fali');
                    res.end();
                }
            });
    });
});

router.post('/fi/save', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        console.log(JSON.stringify(fields));
        var data = JSON.parse(fields.data);
        fiService.save(data.num, data.code);
        res.end();
    });
});

router.get('/fi/get', function (req, res) {
    res.write(fiService.get());
    res.end();
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