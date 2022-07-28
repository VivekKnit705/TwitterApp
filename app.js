// Package import here
const express=require("express");
const session=require('express-session');
const mongoDbSession=require('connect-mongodb-session')(session);
const mongoose=require("mongoose");

//files import here
const privateConstants=require('./private-constants');
// Routes Import
const AuthController=require('./Controller/AuthController');




const app=express();

// Connect to database
mongoose.connect(privateConstants.MONGODBURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(res=>{
    console.log('connected to detabase');
}).catch(err=>{
    console.log("failed to load",err);
})

// MiddleWare
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// session based auth
const store = new mongoDbSession({
    uri: privateConstants.MONGODBURI,
    collection: 'tb_sessions'
})

app.use(session({
    secret: privateConstants.SESSIONKEY,
    resave: false,
    saveUninitialized: false,
    store: store
}))

//Router this will not run al
app.use('/Auth',AuthController);

app.get('/',(req,res)=>{
    res.send('Landed on HomePage');
})

app.listen(process.env.PORT || 3000,()=>{
    console.log("Listening to Port 3000");
})