//so what do we import up here, express, http, mongoose, cookie-parser, path, cors

var express = require('express');
var http = require('http');
const cors = require('cors');
//import mongoose later
var app = express();
const routes = require('./router');

app.use(cors());
app.use('/', routes);
app.use(express.json());


const server = http.createServer(app);

const port = process.env.PORT ?? 3000;

server.listen(port);

console.log("root directory is: " + __dirname)

console.log(`server is on http://localhost:${port}`);