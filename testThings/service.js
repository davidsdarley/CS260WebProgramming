const express = require('express')
const app = express()

app.get('/general', (req, res) => {
    console.log("recieved request")
    res.send('You are a bold one.');
});

app.get('/helloThere', (req, res) => {
    console.log("recieved request at /helloThere")
    res.send('General Kenobi!');
});

app.use(express.static('public'));

app.listen(3000);
console.log("Running on port 3000")