var net = require('net');
 
var host = 'localhost';
var port = 7000;
var client = new net.Socket();
client.connect(port,host,function(){
	console.log('client connected to'+host+':'+port);
	client.write('hello-this is client');
});
client.on('data',function(data){
	console.log('received:'+data);
	if(data.toString().endsWith('exit')){
		client.destroy();
	}

});
client.on('close', function() {
    console.log('Client closed');
});
client.on('error', function(err) {
    console.error(err);
});