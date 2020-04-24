const express = require('express');
const app = express();
// app.set('view engine', 'pug');
// app.set('views', './views');


app.use(express.static('public'))

// app.get('/', (req, res) => {
//     res.sendFile('./views/index.html');
// });


app.listen(80, () => {
    console.log("Listening on port 80");
});