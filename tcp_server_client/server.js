var net=require('net');
var port=7000;
var host='localhost';

var server=net.createServer(onClientConnected);
server.listen(port,host,function(){
	console.log('server listening on %j',server.address());
});
function onClientConnected(sock){
	var remoteAddress=sock.remoteAddress+':'+sock.remotePort;
	console.log('new client connected %s',remoteAddress);

	sock.on('data',function(data){
			console.log('%s Says: %s', remoteAddress, data);
			sock.write(data);
    		sock.write(' exit');
	});
	sock.on('close',  function () {
   			 console.log('connection from %s closed', remoteAddress);
  	});
  	sock.on('error', function (err) {
   			 console.log('Connection %s error: %s', remoteAddress, err.message);
  });

};