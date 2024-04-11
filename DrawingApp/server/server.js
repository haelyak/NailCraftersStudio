const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = 3000;

const app = express();
const { WebSocketServer } = require('ws');

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

const wss = new WebSocketServer({ port: 8080 });
wss.on('connection', ws => {
    console.log('A connection!');
    ws.on('message', data => {
        console.log('Data from frontend:', data.toString());
        wss.clients.forEach(client => client.send(data));
    });
});

const { Sequelize } = require('sequelize');
const db = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/collab.sqlite'
});
const Room = db.define('Room', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    image: Sequelize.STRING
}, {
    freezeTableName: true,
    timestamps: false
});

app.get('/api/room/:name', async(req, res) => {
    const { name } = req.params;
    const result = await Room.findOne({ where: { name } });
    res.send({ result });
});
app.post('/api/room/:name', async(req, res) => {
    const { name } = req.params;
    const { image } = req.body;
    const result = await Room.findOne({ where: { name } });
    if (result) {
        // update
        result.image = image;
        await result.save();
        res.send({ result });
    } else {
        // insert
        const newImage = await Room.create({ name, image });
        res.send({ result: newImage });
    }
});