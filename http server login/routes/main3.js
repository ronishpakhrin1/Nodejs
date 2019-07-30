const express = require('express');
const router = express.Router();
const path = require('path');
    router.get('/dash',(req,res)=>res.sendFile('dash.html',{root: __dirname}));

module.exports = router;