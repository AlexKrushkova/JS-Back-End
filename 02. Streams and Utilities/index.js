// for (let i = 0; i < 10; i++) {
//     console.log(i);
// }

// Local Module

// const utils = require('./utils');

// console.log(utils.sum(1, 3));
// console.log(utils.sub(1, 3));





// Lodash

// const _ = require('lodash');

// const res = _.chunk(['a', 'b', 'c', 'd'], 2);

// console.log(res)




// File System Module
// FS е Core Module

// const fs = require('fs');
// // така автоматично се преобразува до обект от node.js
// const config = require('./config.json');
// console.log(config.port);


// try {
//     let content = fs.readFileSync('./config.json', { encoding: 'utf-8' });
//     content = JSON.parse(content);
//     console.log(content.port);
// } catch (error) {
//     console.error(error);
// }




// Creating a simple Node.js web server

const config = require('./config.json');
const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer((req, res) => {
    const path = url.parse(req.url).pathname;
    if (path === '/') {
        fs.readFile('./text.txt', { encoding: 'utf-8' }, function (err, data) {
            res.end(data.toUpperCase());
        });
    } else if (path === '/test') {
        res.end('HELLO!');
    }
    // res.write('Hello world!');
    // res.end('Hello World!');
}).listen(config.port);



// Request Wrapper Example

const newPort = 3003;

http.createServer((req, res) => {
    let path = url.parse(req['url']).pathname;
    if (path === '/') {
        res.write('Welcome to home page!');
        res.end();
    }
}).listen(newPort);



// Response Wrapper Example

const newPort2 = 3004;

http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.write('Hello from Node.js');
    res.end();
}).listen(newPort2);