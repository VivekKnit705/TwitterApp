const express=require('express');

const {cleanUpAndValidate}=require('../Utils/AuthUtils');
const {verifyUsernameAndEmailExist}=require('../Models/UserModel');

const auth=express.Router();

auth.get('/',(req,res)=>{
    console.log("Receives a request");
    res.send("Hello Auth");
})

auth.post('/register', async (req, res) => {

    const { email, username, password, name, phoneNumber, profilePic } = req.body;

    // Validate data
    cleanUpAndValidate({email, username, phoneNumber, password}).then(async () => {
        // Validate if user is already registered
        try {
            await UserModel.verifyUsernameAndEmailExist({username, email});
        }
        catch(err) {
            return res.send({
                status: 401,
                message: "Error Occured",
                error: err
            })
        }

        // Save the data in db

        const user = new UserModel( { email, username, password, name, phoneNumber, profilePic } );

        try {
            const dbUser = await user.registerUser();

            // Newletter, Welcome email

            return res.send({
                status: 200,
                message: "Registration Successfull",
                data: {
                    name: dbUser.name,
                    userId: dbUser._id,
                    email: dbUser.email,
                    username: dbUser.username
                }
            })
        }
        catch(err) {
            return res.send({
                status: 401,
                message: "Internal error",
                error: err
            })
        }

    }).catch((err) => {
        return res.send({
            status: 400,
            message: "Invalid Data",
            error: err
        })
    })
})



auth.get('/login',(req,res)=>{
    res.send("Landed at Login Page");
})

module.exports=auth;
