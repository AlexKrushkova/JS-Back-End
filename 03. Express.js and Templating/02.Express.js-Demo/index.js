const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');

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
const urlEncodedParserBody = express.urlencoded({ extended : true})


const users = [
    { name: 'Maria Petrova', age: 20},
    { name: 'Jordan Kirov', age: 16}
];


app.engine('hbs', handlebars({
    extname: '.hbs'
}));

app.set('view engine', 'hbs');
app.use('/public', express.static('./static'));

// app.get('/', function(req, res){
//     res.sendFile(path.resolve('./index.html'));
// });

app.get('/', function(req, res){
    res.render('home', {users});
    });

app.get('/about', function(req, res){
        res.render('about');
    });

app.get('/user/:idx', function (req, res){
    const selectedUser = users[req.params.idx]
    res.render('home', { users, selectedUser});
})

app.post('/user', urlEncodedParserBody ,function(req, res){
    const { name, age } = req.body;
    users.push({name, age: +age});
    res.redirect('/');
    
})
    

app.post('/',  function(req, res){
    console.log(req.body)
    res.send(req.body);
});

app.listen(3000, function(){
    console.log('App is listening on port 3000');
});
