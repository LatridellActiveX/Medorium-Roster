const express = require('express');
const cors = require('cors');
var path = require('path')
var app = express();
const router = express.Router();


router.use(cors());
router.use(express.json());

router.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'public', "index.html"));
});

router.get('/index.js', function(req, res){
    res.sendFile(path.join(__dirname,'index.js'));
});

router.get('/src/*', (req, res) =>{
     res.sendFile(path.join(__dirname, 'src', req.params[0]));
 });

router.post('/api/test', (req, res)=>{
    const clientData = req.body;
    console.log("Recieved a request from the client.");
    res.send({"Communication with server successful:": JSON.stringify(clientData)});
});

router.post('/register', (req,res)=>{
    const regData = req.body;
    //Have something that checks the registration code. 
    console.log("Registration action recieved");
    res.send("Successfully registered");

});

router.get('/test', (req, res) =>{
    res.sendFile(path.join(__dirname,'test.html'));
});

router.use(express.static('public'));


module.exports = router;