var fs = require('fs');

function FiService() {
    var self = this;
    var path = './public/files/fi/codes.json';


    self.save = function (number, code) {
        console.log(JSON.stringify(code));
        fs.stat(path, function (err, stat) {
            if (err == null) {
                addNewCode(number, code);
            } else if (err.code == 'ENOENT') {
                var obj = {}
                obj[number] = [code];

                console.log('code + ' +JSON.stringify(obj));
                fs.writeFile(path, JSON.stringify(obj));
            } else {
                console.log('Some other error: ', err.code);
                throw new Error('Fi save error');
            }
        });
    }

    var addNewCode = function (number, code) {
        var content = fs.readFileSync(path);
        console.log(content);
        var obj = JSON.parse(content);
        obj[number] = obj[number] ? obj[number].concat([code]) : [code];
        fs.writeFile(path, JSON.stringify(obj));
    }
}

var service = new FiService();

module.exports = service;