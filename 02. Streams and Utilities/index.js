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
// FS is Core Module

// const fs = require('fs');
// // thats how it automatically get transformed to object in node.js

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
// Re-arrange the server while adding stream manipulations  

const config = require('./config.json');
const http = require('http');
const fs = require('fs');
const url = require('url');
const stream = require('stream');
const zlib = require("zlib");

// Creating zlib and implement it in the server data stream
const zips = zlib.createGzip();

// Creating transform stream that transform lower to uppercase 

function createUppercaseStream(){
    const ts = stream.Transform({
        transform(chunk, enc, ext){
            chunk = Buffer.from(chunk.toString().toUpperCase());
            next(null, chunk);
        }
    })
    return ts;
}

const us = createUppercaseStream()

http.createServer((req, res) => {
    const path = url.parse(req.url).pathname;
    if (path === '/') {
        const rs =  fs.createReadStream('./text.txt, { highWaterMark: 10}');
        res.on('data', function(chunk){
            console.log(chunk);
        })
        rs.pipe(us).pipe(res);
        // fs.readFile('./text.txt', { encoding: 'utf-8' }, function (err, data) {
        //     res.end(data.toUpperCase());
        // });
    } else if (path === '/test') {
        res.end('HELLO!');
    }
    // res.write();
    // res.end('Hello World!');
}).listen(config.port);





// // Request Wrapper Example

// const newPort = 3003;

// http.createServer((req, res) => {
//     let path = url.parse(req['url']).pathname;
//     if (path === '/') {
//         res.write('Welcome to home page!');
//         res.end();
//     }
// }).listen(newPort);




// // Response Wrapper Example
// const newPort2 = 3004;

// http.createServer((req, res) => {
//     res.writeHead(200, {
//         'Content-Type': 'text/plain'
//     });
//     res.write('Hello from Node.js');
//     res.end();
// }).listen(newPort2);





// //Creating readable stream:

// const stream = require('stream');

// function createReadableStream(data){
//     let counter = 0;
//     const rs = stream.Readable({
//         read(size){
//             const item = data[counter++] || null;
//             this.push(item ? Buffer.from(item.toString()) : null);
//         }
//     });
//     return rs;
// }


// // Creating Writable Stream

// function createWritableStream(){
//     let data;

//     const ws = stream.Writable({
//         write(chunk, enc, next){
//             data = !data ? chunk : Buffer.concat([data, chunk]);
//             next();
//         },
//         final(){
//             console.log(data);
//         }
//     });
//     return ws;
// }

// const rs = createReadableStream([1,2,3,4,5,6,7]);
// const ws = createWritableStream();

// ws.on('finish',function(){
//     console.log(data);
// });

// //Sending the data from the readable stream to the writable.. 
// rs.pipe(ws);


