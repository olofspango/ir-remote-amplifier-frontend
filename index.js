const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const querystring = require('querystring');
const axios = require('axios');
const cors = require('cors');
// app.set('view engine', 'pug');
// app.set('views', './views');


app.use(express.static('public'))
app.use(cors());
// app.get('/', (req, res) => {
//     res.sendFile('./views/index.html');
// });

const remoteAPIURL = "http://192.168.1.221:5002/remote/"
const baseAPIURL = "http://192.168.1.221:5002/"
app.get('/remote/:command/:repeat', (req,res) => {    
    axios.get(remoteAPIURL + req.params.command + "/" + req.params.repeat).then(response => {
        console.log(`Sending command: ${req.params.command}`)
        res.send(response);
    })
    .catch(err => {
        res.send(err);
    });

})

// app.get('/repeatOn', (req,res) => {
//     axios.get(baseAPIURL + 'repeatOn').then(response => {
//         console.log(`Starting repeat`)
//         res.send(response);
//     })
//     .catch(err => {
//         res.send(err);
//     });
// })

// app.get('/repeatOff', (req,res) => {
//     axios.get(baseAPIURL + 'repeatOff').then(response => {
//         console.log(`Stopped repeating`)
//         res.send(response);
//     })
//     .catch(err => {
//         res.send(err);
//     });
// })


app.listen(80, () => {
    console.log("Listening on port 80");
});