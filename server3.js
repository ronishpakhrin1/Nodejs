var http = require('http');
var url = require('url');
var fs = require('fs');

var server = http.createServer(function(req,res){
	var q = url.parse(req.url,true);
	var filename = "." + q.pathname;

	fs.readFile(filename,function(error,data){
		if(error)
		{
			res.writeHead(404,{'Content-Type':'text/html'});
			res.write('404 page not found');
			res.end();
		}
		else
			res.writeHead(200,{'Content-Type':'text/html'});
			res.write(data);
			res.end();

	});


});
server.listen(8080);
console.log('server running on port 8080');