const http = require('http');
const todaysDate = new Date();
const weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var today = todaysDate.getDay();
today = weekDays[today];
var hour = todaysDate.getHours();
const min = todaysDate.getMinutes();
const sec = todaysDate.getSeconds();
const prepHand = (hour >= 12)?'PM' : 'AM';
hour=(hour >=12) ? hour - 12 : hour;
http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/html'});
	res.write("Today is : "+today+"."+"<br/>");
	res.write("Current time is : "+hour+" "+prepHand+" : "+min+" : "+sec+".");
	res.end();
}).listen(8080);
console.log('server running on port 8080');