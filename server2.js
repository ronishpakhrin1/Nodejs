var http = require('http');
var fs = require('fs');
var server = http.createServer(function(req,res){
	if(req.url==="/"){
		fs.readFile("index.html",function(error,pgRes){
			if(error){
				res.writeHead(404);
				res.write('Page Not FOUND');
			}
			else{
				res.writeHead(200,{'Content-Type':'text/html'});
				res.write(pgRes);
			}

			res.end();
		});
	}
	else{
		res.writeHead(200,{'Content-Type':'text/html'});
		res.write('<h1>Default</h1>');
		res.end();
	}
});
server.listen(6060);
console.log('SErver is listening at 6060');
