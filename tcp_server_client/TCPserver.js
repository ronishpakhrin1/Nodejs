var net = require('net');
var colors = require('colors');

var server = net.createServer();
server.on('connection',function(socket){
    var remoteAddress = socket.remoteAddress +':'+socket.remotePort;
    console.log('New connection made by: %s'.green,remoteAddress);

    socket.on('data',function(data){
        console.log('Data received from %s : %s'.cyan,remoteAddress,data);
        socket.write('This is server :'+ data);
    });
    socket.on('error',function(err){
        console.log('ERROR'.red,err.message);
    });
    socket.once('close',function(){
        console.log('Terminated by %s'.yellow,remoteAddress);
    });
});

server.listen(9000,function(){
    console.log('Listening to port :  %j'.cyan, server.address().port);
});