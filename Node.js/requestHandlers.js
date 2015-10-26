var fs = require("fs");

function save(response, postData) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write('save json method');
    response.write(postData);
    fs.writeFile("/a", postData, function (err) {
        if (err) {
            return console.log(err);
        }
    });
    response.end();
}

function start(response){
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write('Hrllo World');
    response.end();
}

exports.save = save;
exports.start = start;