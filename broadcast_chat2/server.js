var http = require('http');
var express = require('express');
var socket = require('socket.io');
var readline = require('readline');

var app = express();
var server = http.createServer(app);
var io = socket(server);

app.use(express.static('public'));
var clients = 0;
var users=[];
io.on('connection',function(socket){
    clients++;
    console.log('connection made by ' + socket.id);
    users.push(socket.id +'<br/>');
    io.emit('number',{description: clients + '  online.',
        Name: users
    });
   /*//from here
   socket.on('add user', (username) => {
    // we store the username in the socket session for this client
    users.push(username +'<br/>');
    });
   //to here*/
    socket.on('chat',function(data){
        io.emit('chat',data);   
    });
  
    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data);
    });

    socket.on('disconnect',function(){
        clients--;
        io.emit('number',{description: clients + '  online.'});
        users.splice(1,1);
        if(clients==0){
                users.splice(0,1);
        }
    });
});

server.listen('4040');
console.log('SERVER LISTENING ON 4040');