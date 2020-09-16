const config = require('./config.json');
const url = require('url');
const http = require('http');
const path = require('path');
const fx = require('fx');

const VIEWS_PATH = path.resolve(config.viewsDir);
const STATIC_FILES_PATH = path.resolve(config.staticFileDir);

const routeFileMap = {
    '/':'/home/index.html',
}

function sendFile(res, relativeFilePath){
    const fullFilePath = path.join(VIEWS_PATH, relativeFilePath);
    fx.readFile(fullFilePath, function(err, data){
        const { message }  = err;
        if (err){
            res.writeHead(500, {
                'Content-Length': Buffer.byteLength(message),
                'Content-Type': 'text/plain'
            })
            .end(message);
            return;
        } 
        res.writeHead(200, {
            'Content-Length': Buffer.byteLength(data),
            'Content-Type': 'text/html'
        }).end(data);
    })
}

function httpHandler(req, res){
    const path = url.parse(req.url).pathname;
    const fileRelativePath = routeFileMap[path];

    if(path.includes(`/${config.staticFileDir}/`)){
        
    }

    if(!fileRelativePath ){
        const data = 'Not Found';
        res.writeHead(500, {
            'Content-Length': Buffer.byteLength(data),
            'Content-Type': 'text/plain'
        }).end(data);
        return;
    }
    sendFile(res,fileRelativePath);
}

http.createServer(httpHandler).listen(config.port, function(){
    console.log(`Server is listening on ${config.port}`);
})