const config = require('./config.json');
const http = require('http');

http.createServer(function(req, res){
    // res.write("Hello World");
    res.end("Hello World");
}).listen(config.port);