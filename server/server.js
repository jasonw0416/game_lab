// https://www.youtube.com/watch?v=xVcVbCLmKew

const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();

const clientPath = `${__dirname}/../client`;
//const clientPath = `/Users/wonjunlee/WebstormProjects/game_lab/client/gomoku.html`;
console.log(`Serving static from ${clientPath}`);

app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);

io.on('connection', (sock) => {
    console.log('Someone connected');
    sock.emit('message', 'Hi, you are connected');

    sock.on('join', function(room) {
        sock.leave("room");
        console.log("joined " + room);
        sock.join(room);
    });

    sock.on('message room', (text, room) => {
        console.log("sending " + text + " to room: " + room);
        io.to(room).emit('message', text);
    });

    sock.on('message', (text) => {
        io.emit('message', text);
    });

    sock.on('red', (text) => {
        io.emit('red', text);
    })
});

server.on('error', (err) => {
    console.error('Server error:', err);
});

server.listen(7000, () => {
    console.log('RPS started on 7000');
});


