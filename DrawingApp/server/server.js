const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = 3000;

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + '/../client')));

app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname + '/../client/script.js'));
});

app.get('/api/test', (req, res) => {
    res.end('Test works!');
});

app.listen(PORT, () => {
    console.log(`App is live on port ${PORT}`);
});