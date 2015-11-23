var fs = require('fs');

function ImgService() {
    var self = this;

    self.getFiles = function (path, _files) {
        _files = _files || [];
        var files = fs.readdirSync(path);
        for (var i = 0; i < files.length; i++) {
            var name = path + '/' + files[i];
            if (fs.statSync(name).isDirectory()) {
                self.getFiles(name, _files);
            } else {
                _files.push(name);
            }
        }

        return _files;
    }
}

module.exports = new ImgService();  