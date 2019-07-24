var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
http.createServer(function(req,res){
	if(req.url == '/fileupoad')
	{
		var form=new formidable.IncomingForm();
		form.parse(req,function(error,fields,files){
			var oldpath=files.filetoupload.path;
			var newpath='/home/rahaman/nodejsapp'+files.filetoupload.name;
			fs.rename(oldpath,newpath,function(err){
					if(err)
							throw err;
					res.write('File Uploaded');
					res.end();

			});
			
		});
	}
	else
	{
		res.writeHead(200,{'Content-Type':'text/html'});
		res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
		res.write('<input type="file" name="filetoupload"><br>');
		res.write('<input type="submit">');
		res.write('</form>');
	}	res.end();

}).listen(8080);