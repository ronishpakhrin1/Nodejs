var http = require('http');
var express = require('express');
var socket = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socket(server);

app.use(express.static('public'));
     
io.on('connection',function(socket){
    console.log('connection made');

    socket.on('chat',function(data){
        io.emit('chat',data);
        
    });
    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data);
    });
});

server.listen('4040');
console.log('SERVER LISTENING ON 4040');