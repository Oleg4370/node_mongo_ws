/**
 * Created by oleh on 03.05.17.
 */
const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const db = require('./db');

const api = require('./server/routes/api');
const articles = require('./server/routes/articles');
const index = require('./server/routes/index');


const myWs = require('./controllers/my_ws');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to index file
/*app.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname, 'index.html'));
    res.render('layout', { title: 'Express' });
});*/

app.use('/', index);

/*app.get('/', function(req, res) {
    res.send('Server works fine and you can put some data here, instead of this text');
});*/

app.use(favicon(path.join(__dirname, 'assets/img', 'otakoyi_favicon.ico')));

// Set our api routes
app.use('/api', api);

// Set articles routes
app.use('/articles', articles);

// Catch all other routes and return the index file
/*app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});*/

app.get('/assets/css/:file', (req, res) => {
    res.sendFile(path.join(__dirname, 'assets/css/'+req.params.file));
});
app.get('/assets/img/articles/:file', (req, res) => {
    res.sendFile(path.join(__dirname, 'assets/img/'+req.params.file));
});
app.get('/assets/js/:file', (req, res) => {
    res.sendFile(path.join(__dirname, 'assets/js/'+req.params.file));
});


/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

const wsPort = 8081;

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

db.connect('mongodb://localhost:27017/myapi',function (err) {
    if(err){
        return console.log(err);
    }else{
        server.listen(port, function(){
            console.log(`API running on localhost:${port}`)
        });
        myWs.newWebSocket(wsPort);
    }
});