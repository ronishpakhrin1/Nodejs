var http = require('http');
var express = require('express');
var app=express();
var server = http.createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 5050;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

server.listen(port, function(){
  console.log('listening on *:' + port);
});