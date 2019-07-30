const express = require('express');
const app=express();
app.use('/',require('./routes/main'));
app.use('/main2',require('./routes/main2'));

const PORT = process.env.PORT || 8080;
app.listen(PORT,console.log(`server listening on ${PORT}`));