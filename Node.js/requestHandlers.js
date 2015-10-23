function save(response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write('save json method');
    response.end();
}

function start(response){
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write('Hrllo World');
    response.end();
}

exports.save = save;
exports.start = start;