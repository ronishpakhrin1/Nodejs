//environment setup
var http = require('http'),
    express = require('express'),
    socket = require('socket.io'),
    app = express(),
    server = http.createServer(app),
    io = socket(server),
    mysql = require('mysql');
    list = {},listSize=0;

    //database
    var con = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'password',
        database:'ron'
    });

    con.connect(function(err){
        if(err){
            console.log(err);
        }else{
            console.log('Connection Established');
        }
    });
     
app.use(express.static('public'));

//connection
io.on('connection', function (socket) {
    console.log('connection made by ' + socket.id);
   
 
    //get messages from the database
    con.query('select * from messages',function(err,result){
        if(err){
            console.log(err);
        }else{
                Object.keys(result).forEach(function(key){
                var row=result[key];      
                socket.emit('chatDb',{message:row.msg,time:row.ts});
            });
        }
    });
    
    //online
    socket.on('username',function(data){

        //insert into userRon table
        var record={name: data};
        con.query('insert into userRon set?',record,function(err,res){
            if(err){
                console.log(err);
            }else{
                console.log('data inserted',res.insertId);
            }
        });
            socket.username=data;
            list[socket.username]={online: true,id: socket.id,name:data};
            listSize = Object.keys(list).length;
            io.emit('number', { description: listSize + '  online.' });
            io.emit('print', list);
            io.emit('feed',data);
    });

    //send the message
    socket.on('chat', function (data) {
        var msg = data.message.trim();
        //insert into messages table 
        var text={msg: msg};
        if (msg.substr(0, 1) !== '@'){
                con.query('insert into messages set?',text,function(err,res){
                    if(err){
                        console.log(err);
                    }else{
                        console.log('data onserted',res.insertId);
                    }
                });
        }
        //private
        if (msg.substr(0, 1) === '@') {
            var ind = msg.indexOf(' ');
            var uname = msg.substr(1, ind).trim();
            var msg = msg.substr(ind, msg.length).trim();
            var id, sender, id2;
            for (var i in list) {
                if (list[i].name === uname) {
                    id = list[i].id;
                }
                if (list[i].name === data.handle) {
                    id2 = list[i].id;
                    sender = list[i].name ;
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
        io.sockets.to(room).emit('eventLeave',name);
    });

    //send the typing thing
    socket.on('typing', function (data) {
        socket.broadcast.emit('typing', data);
    });

    //when disconnected
    socket.on('disconnect', function () {
        var left=socket.username;
        console.log(left);
        listSize--;
        io.emit('number', { description: listSize + '  online.' });
        if(!socket.username){
            return;
        }
       list[socket.username].online=false;
        io.emit('print', list);
        io.emit('feed1',left);
    });
});

server.listen('4040');
console.log('SERVER LISTENING ON 4040');