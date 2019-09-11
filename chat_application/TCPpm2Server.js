var net = require('net');
var colors = require('colors');
var pm2 = require('pm2');
var server = net.createServer();

var str;

pm2.connect(function(err){
    if(err){
        console.log('ERROR', err);
        process.exit(2);
    }

    pm2.start('/home/rahaman/Nodejs/chat_application/ecosystem.config.js',function(err,apps){
        pm2.disconnect();
        if(err){
            throw err;
        }
    });
    pm2.describe('server',function(err,list){
        str= JSON.stringify(list);
});
});
server.on('connection',function(socket){
    console.log('Connection Established'.green);
    socket.write(str);
});
server.listen(9000,function(){
    console.log('Listening to port : %s',server.address().port);
});