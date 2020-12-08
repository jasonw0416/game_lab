// https://www.youtube.com/watch?v=xVcVbCLmKew

const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();

const clientPath = `${__dirname}/client`;
//const clientPath = `/Users/wonjunlee/WebstormProjects/game_lab/client/gomoku.html`;
console.log(`Serving static from ${clientPath}`);

app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);

var room1 = 0;

let rooms = [];
var clientData = [];
/* the data are stored like:
[[room1, client1, client2],
 [room2, client3]
 [room3, client4, client5]...]
*/
var clients = [];
// the data are stored like: [[client1, room1], [client2, room2], [client3, room3], ...]]


io.sockets.on('connection', function(sock) {
    console.log('Someone connected');
    sock.emit('message', 'Hi, you are connected');

    sock.on('join', function(room) {
        var check = false;
        for (let i = 0; i < clientData.length; i++){
            if (clientData[i][0] === room){
                clientData[i].push(sock.id);
                check = true;
                break;
            }
        }
        if (!check){
            clientData.push([room, sock.id]);
        }
        clients.push([sock.id, room]);
        sock.join(room);
    });

    sock.on('leave', function(room) {
        for (let i = 0; i < clientData.length; i++){
            if (clientData[i][0] === room){
                for (let j = 0; j < clientData[i].length; j++){
                    if (clientData[i][j] === sock.id){
                        clientData[i].splice(j,1);
                        break;
                    }
                }
            }
        }
        for (let i = 0; i < clients.length; i++){
            if (clients[i][0] === sock.id){
                clients.splice(i,1);
                break;
            }
        }
        sock.leave(room);
        if (room !== "room") {
            io.to(room).emit('left');
        }
    });

    sock.on('message room', (text, room) => {
        console.log("sending " + text + " to room: " + room);
        io.to(room).emit('message', text);
    });

    sock.on('message', (text) => {
        io.emit('message', text);
    });

    sock.on('red', (text, room) => {
        io.to(room).emit('red', text);
    });

    sock.on('blue', (text, room) => {
        io.to(room).emit('blue', text);
    });

    sock.on('join_attempt', (socketId, code) => {
        if (rooms.includes(code)){
            io.to(socketId).emit('joining', code);
        }
        else{
            io.to(socketId).emit('join_error', code);
        }
    });

    sock.on('create_attempt', (socketId, code) =>{
        if (rooms.includes(code)){
            io.to(socketId).emit('create_error', code);
        }
        else{
            rooms.push(code);
            console.log('created room ' + code);
            io.to(socketId).emit('creating', code);
        }
    });

    sock.on('request-restart', (room) =>{
        for (let i = 0; i < clientData.length; i++){
            if (clientData[i][0] === room){
                for (let j = 1; j < clientData[i].length; j++){
                    if (clientData[i][j] !== sock.id){
                        io.to(clientData[i][j]).emit('restart-request');
                    }
                }
                break;
            }
        }
    });

    sock.on('restart-yes', (room)=>{
        for (let i = 0; i < clientData.length; i++){
            if (clientData[i][0] === room){
                for (let j = 1; j < clientData[i].length; j++){
                    if (clientData[i][j] !== sock.id){
                        io.to(clientData[i][j]).emit('restart-yes');
                    }
                }
                break;
            }
        }
    });

    sock.on('restart-no', (room)=>{
        for (let i = 0; i < clientData.length; i++){
            if (clientData[i][0] === room){
                for (let j = 1; j < clientData[i].length; j++){
                    if (clientData[i][j] !== sock.id){
                        io.to(clientData[i][j]).emit('restart-no');
                    }
                }
                break;
            }
        }
    });


    sock.on('disconnect', function(){
        var room_code = '';
        for (let i = 0; i < clients.length; i++){
            if (clients[i][0] === sock.id){
                room_code = clients[i][1];
                clients.splice(i,1);
                break;
            }
        }
        for (let i = 0; i < clientData.length; i++){
            if (clientData[i][0] === room_code){
                for (let j = 0; j < clientData[i].length; j++){
                    if (clientData[i][j] === sock.id){
                        clientData[i].splice(j,1);
                        break;
                    }
                }
            }
        }
        if (room_code !== "room") {
            io.to(room_code).emit('disconnection');
        }
    })
});


server.on('error', (err) => {
    console.error('Server error:', err);
});

server.listen(7000, () => {
    console.log('RPS started on 7000');
});

/*
server.listen(process.env.PORT || 7000, () => {
    console.log('RPS started on 7000');
});
 */

