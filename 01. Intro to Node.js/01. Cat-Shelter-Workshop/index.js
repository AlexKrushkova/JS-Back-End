const config = require('./config.json');
const http = require('http');
const url = require('url');
const path = require('path'); // за да конструираме целия път
const fs = require('fs');
const querystring = require('querystring');

// ----------

const VIEWS_PATH = path.resolve(config.viewsDir);
const STATIC_FILES_PATH = path.resolve(config.staticFilesDir);

// ----------

const routerFileMap = {
    '/': '/home/index.html',
    '/addbreed': '/addBreed.html',
    '/addcat': '/addCat.html',
};

// -----------

const mimeTypeMap = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'application/javascript',
    'json': 'application/json'
}

// -----------

function sendFile(res, fullFilePath) {
    const fileExt = path.extname(fullFilePath).slice(1);
    const type = mimeTypeMap[fileExt];

    fs.readFile(fullFilePath, function (err, data) {
        if (err) {
            const { message } = err;
            res.writeHead(500, {
                'Content-Length': Buffer.byteLength(message), // добре да се слага
                'Content-Type': 'text/plain'
            }).end(message);
            return;
        }

        res.writeHead(200, {
            'Content-Length': Buffer.byteLength(data), // добре да се слага
            'Content-Type': type || 'text/plain'
        }).end(data);

    });
}

// http handler

function httpHandler(req, res) {
    const { pathname, query } = url.parse(req.url, true);
    const method = req.method.toUpperCase();

    if (method === 'GET') {
        if (pathname.includes(`/${config.staticFilesDir}/`)) {
            const fullStaticFilePath = path.resolve(pathname.slice(1));
            sendFile(res, fullStaticFilePath);
            return;
        }

        const fileRelativePath = routerFileMap[pathname];

        if (!fileRelativePath) {
            const data = "Not Found!"
            res.writeHead(404, {
                'Content-Length': Buffer.byteLength(data), // добре да се слага
                'Content-Type': 'text/plain'
            }).end(data);
            return;
        }

        const fullFilePath = path.join(VIEWS_PATH, fileRelativePath); // обединяване на пътища за целия път
        sendFile(res, fullFilePath);
    } else if (method === 'PUT') {
        res.write(query.breed);
    }

}

http.createServer(httpHandler).listen(config.port, function () {
    console.log(`Server is listening on ${config.port}`);
})