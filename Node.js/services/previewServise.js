//see there how to use this https://github.com/aheckmann/gm
var gm = require('gm');
var fs = require('fs');

PreviewServise = function () {

    var self = this;

    var fileExtesion = '.png';
    var step = 1500;

    self.createPreview = function (object, imgsfolder, callback) {

        var path = imgsfolder + "/" + object.Number + fileExtesion;
        if (isFileExists(path)) {
            callback && callback(processPath(path));
            return;
        }

        mkdirSync(imgsfolder);
        createImage(object, path, callback);
    }

    // нафига я это заимплеменил ? ладно, пусть будет :)
    var removeOldImages = function (imgsfolder) {
        fs.readdir(imgsfolder, function (err, files) {
            if (err) throw err;

            files.forEach(function (file) {
                console.log("delete: " + file);
                fs.unlinkSync(imgsfolder + "/" + file);
            });
        });
    }

    var createImage = function (object, path, callback) {
        gm(object.Width, object.Height, "#ffffffff").write(path, function () {
            colorize(object, path, 0, callback);
        });;
    }

    var colorize = function (object, path, i, callBack) {
        var img = gm(path);
        var nextStep = (i + step) < object.Pixels.length ? i + step : object.Pixels.length;
        for (var j = i; j < nextStep; ++j) {
            var px = object.Pixels[j];
            img = img.drawPoint(px.X - object.MaxLeftPx.X, px.Y - object.MaxTopPx.Y);
        }

        img.write(path, function () {
            if (nextStep < object.Pixels.length) {
                colorize(object, path, nextStep, callBack);
            } else {
                callBack && callBack(processPath(path));
            }
        });
    }

    var mkdirSync = function (path) {
        try {
            fs.mkdirSync(path);
        } catch (e) {
            if (e.code != 'EEXIST') throw e;
        }
    }

    var isFileExists = function(path) {
        try {
            var stats = fs.statSync(path);
            return true;
        }
        catch (e) {
            return false;
        }
    }

    var processPath = function(path) {
        return path.replace('.', '');
    }
}

var service = new PreviewServise();

module.exports = service;