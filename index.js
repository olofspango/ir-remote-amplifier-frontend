const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const querystring = require('querystring');
const axios = require('axios');
const cors = require('cors');

app.use(express.static('public'))
app.use(cors());


const remoteAPIURL = "http://192.168.1.221:5002/remote/"

app.get('/remote/:command/:repeat', (req,res) => {
    axios.get(remoteAPIURL + req.params.command + "/" + req.params.repeat).then(response => {
        console.log(`Sending command: ${req.params.command}`)
        res.send(response);
    })
    .catch(err => {
        res.send(err);
    });

})

app.listen(80, () => {
    console.log("Listening on port 80");
});