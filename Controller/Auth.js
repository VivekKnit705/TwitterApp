const express=require('express');

const auth=express.Router();

auth.get('/',(req,res)=>{
    console.log("Receives a request");
    res.send("Hello Auth");
})

auth.get('/login',(req,res)=>{
    res.send("Landed at Login Page");
})

module.exports=auth;
