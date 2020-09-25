const express = require('express');
const path = require('path');

const app = express();
const jsonBodyParser = express.json();

// function logRequestedDate(req, res, next){
//     console.log(new Date());
//     setTimeout(function (){
//         next();
//     }, 3000)
// }

// app.use(logRequestedDate);
app.use(jsonBodyParser);
app.use('/public', express.static('./static'));

app.get('/', function(req, res){
    res.sendFile(path.resolve('./index.html'));
});

app.post('/',  function(req, res){
    console.log(req.body)
    res.send(req.body);
});

app.listen(3000, function(){
    console.log('App is listening on port 3000');
});
