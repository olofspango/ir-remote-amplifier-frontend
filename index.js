const express = require('express');
const https = require('https')
const http = require('http')
const fs = require('fs')

const app = express();
const bodyParser = require('body-parser');
const querystring = require('querystring');
const axios = require('axios');
const cors = require('cors');

app.use(express.static('public'))
app.use(express.static('/var/www/example'))
app.use(cors());


const remoteAPIURL = "http://localhost:5002/remote/"

app.get('/remote/:command/:repeat', (req,res) => {
//    let promise = fetch(remoteAPIRUL + req.params.command + "/" + req.params.repeat);
//    promise.then(response => {
      axios.get(remoteAPIURL + req.params.command + "/" + req.params.repeat).then(response => { // Commented out this line to test using fetch instead of axios
        console.log(`Sending command: ${req.params.command}`)
        res.send(response);
    })
    .catch(err => {
        res.send(err);
    });

})
http.createServer(app).listen(8080, () => {
  console.log("http listening on port 8080");
})

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app).listen(8443, () => {
  console.log("Listening on port 8443");
});
