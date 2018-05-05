var express = require('express');

var app = express();

var port = process.env.PORT || '8080';

app.use(express.static('public'));
app.set('views','./src/views');//Tell Templating engine path of views

//var handlebar = require('express-handlebars');
//app.engine('.hbs',handlebar({extname:'.hbs'}));//To setup handlebars

app.set('view engine','ejs');//Setting type of templating engine

app.get('/', function (req, res) {
    res.render('index',{title:'Hello from render',list: ['a','b']});
});

app.get('/books', function (req, res) {
    res.send('Hello Books');
});

app.listen(port, function (err) {
    console.log('Server listening on port ' + port);
});