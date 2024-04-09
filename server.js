const http = require('http');
const fs = require('fs');
const path = require('path');


const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        // Serve index.html
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error reading file');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.url === '/client.js') {
        // Serve client.js
        fs.readFile(path.join(__dirname, 'client.js'), (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/javascript' });
                res.end(data);
            }
        });
    } else if (req.url === '/objects.json') {
        // Serve objects.json
        fs.readFile(path.join(__dirname, 'objects.json'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error reading file');
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(data);
            }
        });
    } else {
        res.writeHead(404);
        res.end('Page not found');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});