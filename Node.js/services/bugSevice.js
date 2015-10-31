var fs = require('fs');
var previewServise = require('./previewServise');

function BugService() {
    var self = this;

    self.serialize = function (path, data, callback) {
        //console.log(path);
        path = pathHelper[path] + data.name + (data.comment ? data.comment : "") + pathHelper.extensions.json;
        //console.log("full path: "+path);
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
        //console.log(path);
        fs.readFile(path, function read(error, data) {
            var success = true;
            if (error) {
                console.log(error);
                success = false;
            }

            var objects = JSON.parse(data);
         //   imfge creation  
        //    previewServise.createPreview(objects[0], pathHelper.imgs + filename,function() {
                callback && callback({ success: success, data:data });
        //    });
        });
    }

    var pathHelper = {
        a: './public/files/bug_a/',
        imgs: './public/imgs/',
        extensions: {
            json: '.json'
        }
    };
}

var sevice = new BugService();

module.exports = sevice;