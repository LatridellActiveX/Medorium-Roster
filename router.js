const express = require('express');
const cors = require('cors');
var path = require('path')
var app = express();
const router = express.Router();

router.use(cors());


router.get('/', function(req, res){
    res.sendFile(path.join(__dirname, "index.html"));
});

router.get('/index.js', function(req, res){
    res.sendFile(path.join(__dirname, "index.js"));
});

router.get('/index.css', function(req, res){
    res.sendFile(path.join(__dirname, "index.css"));
});


module.exports = router;