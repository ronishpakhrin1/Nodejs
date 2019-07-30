const express = require('express');
const router = express.Router();
const path = require('path');
    router.get('/home',(req,res)=>res.sendFile('home.html',{root: __dirname}));
    router.get('/register',(req,res)=>res.sendFile('register.html',{root: __dirname}));

module.exports = router;