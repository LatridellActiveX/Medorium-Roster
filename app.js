//so what do we import up here, express, http, mongoose, cookie-parser, path, cors

var express = require('express');
var http = require('http');
//import mongoose later
var app = express();
const routes = require('./router');

app.use('/', routes);

const server = http.createServer(app);

const port = process.env.PORT ?? 443;

server.listen(port);

console.log("root directory is: " + __dirname)

console.log(`server is on http://localhost:${port}`);