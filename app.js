// Package import here
const express=require("express");
const session=require('express-session');
const mongoDbSession=require('connect-mongodb-session')(session);

// Routes Import
const AuthController=require('./Controller/Auth');


//files import here
const app=express();


// MiddleWare
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Router this will not run al
app.use('/Auth',AuthController);

app.listen(process.env.PORT || 3000,()=>{
    console.log("Listening to Port 3000");
})