var fs = require('fs');
var previewServise = require('./previewServise');

function BugService() {
    var self = this;

    self.serialize = function (path, data, callback) {
        path = pathHelper[path] + data.name + pathHelper.extensions.json;//create folder if not exists
        fs.writeFile(path, data.data, function (error) {
            var success = true;
            if (error) {
                console.log(error);
                success = false;
            }

            callback && callback({ success: success, path: path });
        });
    }

    self.deserialize = function (path, filename, callback) {
        path = pathHelper[path] + filename + pathHelper.extensions.json;
        fs.readFile(path, function read(error, data) {
            if (error != null) {
                console.log(error);
                throw error;
            }

            var objects = JSON.parse(data);
            for (var i = 0, l = objects.length; i < l; ++i) {
                objects[i].Pixels = objects[i].Pixels.length;
            }

            callback && callback({ objects: objects });

        });
    }

    self.renderImage = function (file, number, callback) {
        var path = pathHelper.a + file + pathHelper.extensions.json;
        fs.readFile(path, function (error, data) {
            if (error) {
                console.log(error);
                throw error;
            }

            var objects = JSON.parse(data);
            var object = getObject(objects, number);
          
            if (object) {
                previewServise.createPreview(object, pathHelper.imgs + file, function (url, size) {
                    callback && callback(url, size);
                });
            } else {
                callback(JSON.stringify({ success: false}));
            }
        });

    }

    var getObject = function(objects, number) {
        for (var i = 0, l = objects.length; i < l; i++) {
            if (objects[i].Number == number)
                return objects[i];
        }

        return null;
    }

    var pathHelper = {
        a: './public/files/bug_a/',
        imgs: './public/imgs/a/',
        extensions: {
            json: '.json'
        }
    };
}

var sevice = new BugService();

module.exports = sevice;