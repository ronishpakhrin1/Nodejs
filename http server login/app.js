const http=require('http');
const express = require('express');
const app=express();
const server = http.createServer(app);

app.use('/',require('./routes/main.js'));
app.use('/main2',require('./routes/main2.js'));
app.use('/main3',require('./routes/main3.js'));

server.listen(7070);
console.log('server running on port 7070');