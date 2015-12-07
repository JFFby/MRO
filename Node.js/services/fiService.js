var fs = require('fs');

function FiService() {
    var self = this;
    var path = './public/files/fi/codes.json';


    self.save = function (number, codes) {

        if (number.toString().length == 0) {
            return;
        }

        fs.stat(path, function (err, stat) {
            if (err == null) {
                addNewCode(number, codes);
            } else if (err.code == 'ENOENT') {
                var obj = {}
                obj.numbers = [number];
                obj = writeCodes(obj, codes, number);
                fs.writeFile(path, JSON.stringify(obj));
            } else {
                console.log('Some other error: ', err.code);
                throw new Error('Fi save error');
            }
        });
    }

    self.get = function() {
        return fs.readFileSync(path);
    }

    var addNewCode = function (number, codes) {
        var content = fs.readFileSync(path);
        var obj = JSON.parse(content);
        obj.numbers = obj.numbers.concat([number]);
        obj = writeCodes(obj, codes, number);
        fs.writeFile(path, JSON.stringify(obj));
    }

    var writeCodes = function (obj, codes, number) {
        codes = codes || [];
        for (var i = 0; i < codes.length; i++) {
            pushCode(obj, codes[i], number);
        }

        return obj;
    }

    var pushCode = function (obj, code, number) {
        obj[code] = obj[code] ? obj[code].concat(number) : [number];
    }
}

var service = new FiService();

module.exports = service;