//environment setup
var http = require('http'),
    express = require('express'),
    socket = require('socket.io'),
    app = express(),
    server = http.createServer(app),
    io = socket(server),
    clients = 0,list = [],list1 = [];

app.use(express.static('public'));

//connection
io.on('connection', function (socket) {
    clients++;
    console.log('connection made by ' + socket.id);
    io.emit('number', { description: clients + '  online.' });

    //set  username
    socket.on('username', function (data) {
        list.push({
            id: socket.id,
            name: data
        });
        let len = list.length;
        len--;
        list1.push(list[len].name+'</br>');
        io.emit('print', list1);
        io.emit('feed',data);
    });

    //send the message
    socket.on('chat', function (data) {
        var msg = data.message.trim();
        console.log(msg);
        //private
        if (msg.substr(0, 1) === '@') {
            var ind = msg.indexOf(' ');
            var uname = msg.substr(1, ind).trim();
            console.log(uname);
            var msg = msg.substr(ind, msg.length).trim();
            console.log(msg);
            console.log('hello');
            var id, sender, id2;
            for (let i = 0; i < list.length; i++) {
                if (list[i].name === uname) {
                    id = list[i].id;
                    console.log(id);
                    break;
                }
            }
            for (let i = 0; i < list.length; i++) {
                if (list[i].name === data.handle) {
                    id2 = list[i].id;
                    sender = list[i].name;
                    console.log(sender);
                    break;
                }
            }
            io.to(id2).emit('pchat', { message: msg, name: sender });
            io.to(id).emit('pchat', { message: msg, name: sender });
        }
        //public
        else {
            io.emit('chat', data);
        }
    });
    
    //chat room
    socket.on('create',function(data){
        var room=data.room,
            name=data.handle;
        socket.join(room);
        console.log(name+' connected to the room '+room);
        console.log(socket.adapter.rooms);
        io.sockets.to(room).emit('eventJoin',name);
        socket.on('roomChat',function(data){
                io.sockets.to(room).emit('event',data);
        });
    });

    //leave room
    socket.on('leave',function(data){
        var room=data.room,
            name=data.handle;
        socket.leave(room);
        console.log(socket.adapter.rooms);
        console.log(name+' left');
        io.sockets.to(room).emit('eventLeave',name);
    });

    //send the typing thing
    socket.on('typing', function (data) {
        socket.broadcast.emit('typing', data);
    });

    //when disconnected
    socket.on('disconnect', function () {
        clients--;
        var left;
        io.emit('number', { description: clients + '  online.' });
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === socket.id) {
                console.log(list[i].name);

                left=list[i].name;
                list1.splice(i,1);
                console.log('deleted');
            }
        }
        io.emit('print', list1);
        io.emit('feed1',left);
    });
});

server.listen('4040');
console.log('SERVER LISTENING ON 4040');