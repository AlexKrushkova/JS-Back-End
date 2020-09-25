const exprss = require('/exprss');

const app = exprss();

app.get('/', function(req, res){
    res.end('Hello from exprss')
});

app.listen(3000, function(){
    console.log('Exprss is listening...')
});