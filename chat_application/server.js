var http = require('http');
var express = require('express');
var socket = require('socket.io');
var readline = require('readline');

var app = express();
var server = http.createServer(app);
var io = socket(server);

app.use(express.static('public'));
var clients = 0;
var list=[];
var list1=[];
//connection
io.on('connection',function(socket){
    clients++;
    console.log('connection made by ' + socket.id);
    io.emit('number',{description: clients + '  online.'});
    //set  username
    socket.on('username',function(data){
            list.push({
                id: socket.id,
                name: data
            });
            let len = list.length;
            len--;
            list1.push(list[len].name+'<br/>');
            io.emit('print',list1);
        });
   //send the message
    socket.on('chat',function(data){
        var msg = data.message.trim();
        console.log(msg);
        if(msg.substr(0,1) ==='@'){
            var ind = msg.indexOf(' ');
            var uname = msg.substr(1,ind).trim();
            console.log(uname);
            var msg = msg.substr(ind,msg.length).trim();
            console.log(msg);
            console.log('hello');
            var id,sender,id2;
            for(let i=0;i<list.length;i++){
                if(list[i].name === uname){
                    id=list[i].id;
                    console.log(id);
                    break;
                }
              }
              for(let i=0;i<list.length;i++){
                  if(list[i].name === data.handle){
                      id2=list[i].id;
                      sender=list[i].name;
                      console.log(sender);
                      break;
                  }
              }
              io.to(id2).emit('pchat',{message: msg,name: sender});
              io.to(id).emit('pchat',{message: msg,name: sender});
            console.log('outside the loop');
            }
        else{
            io.emit('chat',data);   
        }  
    });
    //send the typing thing
    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data);
    });
   //when disconnected
    socket.on('disconnect',function(){
        clients--;
        io.emit('number',{description: clients + '  online.'});
        for(let i=0;i<list.length;i++){
          if(list[i].id === socket.id){
              list1.splice(i,1);
          }
        }
       io.emit('print',list1);
    });
});

server.listen('4040');
console.log('SERVER LISTENING ON 4040');