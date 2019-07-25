var http = require('http');
var server = http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/html'});
	res.end('NodeJs App');
});
server.listen(8080);
console.log('Server is running at localhost:8080');

