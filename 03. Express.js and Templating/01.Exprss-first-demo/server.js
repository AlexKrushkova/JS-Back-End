const exprss = require('./exprss');


const app = exprss();

function logRequestedDate(req, res, next){
    console.log(Date.now());
    next();
}

function bodyParser(req, res, next){
    let data;
    req.on('data', function(chunk){
        body = body ? Buffer.concat(body, chunk) : chunk;
    });

    req.on('end', function(){
        const body = JSON.parse(data.toString());
        req.body = body;
        next();
    });
}

app.get('/', logRequestedDate, function(req, res){
    res.end('Hello from exprss')
});

const users = [];

app.post('/', logRequestedDate, bodyParser, function(req, res){
    console.log(req.body);
    res.end(req.body);
});

app.post('/user', bodyParser, function(req, res){
    users.push(req.body);
    res.end('O.K');
});

app.listen(3000, function(){
    console.log('Exprss is listening...')
});