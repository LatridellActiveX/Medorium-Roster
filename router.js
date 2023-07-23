const express = require('express');
const cors = require('cors');
var path = require('path');
var app = express();
const router = express.Router();
const roster = require('./Model/modelController');
require('dotenv').config();


router.use(cors());
router.use(express.json());

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', "index.html"));
});

router.get('/index.tsx', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.tsx'));
});

router.get('/src/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', req.params[0]));
});

router.post('/api/login', (req, res) => {
    const clientData = req.body;
    console.log("Recieved a request from the client: ", clientData);

    if (clientData.username === process.env.TEST_USER && clientData.password === process.env.TEST_PASS) {
        console.log("Test user authenticated");
        res.send("1400");
    } else {
        console.log("username: ", clientData.username);
        console.log(process.env.TEST_USER, process.env.TEST_PASS);
        res.send({ "Communication with server successful:": JSON.stringify(clientData) });
    }


});

router.post('/register', (req, res) => {
    const regData = req.body;
    //Have something that checks the registration code. 
    console.log("Registration action recieved");
    res.send("Successfully registered");
});

router.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, 'test.html'));
});

router.get('/roster', (req, res) => {
    console.log("Roster requested. Sending: ", roster());
    res.send(roster());
    console.log("Roster sent");
});

router.use(express.static('public'));


module.exports = router;