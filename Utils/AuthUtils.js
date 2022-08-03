const validator=require('validator');

function cleanUpAndValidate({email,username,phonenumber,password}){
    return new Promise((resolve,reject)=>{
        if(typeof(email)!="string"){
            return reject('Email is Not String');
        }
        if(!validator.isEmail(email)){
            return reject("Invalid Email");
        }
        if(username.length<3){
            return reject('username to Short');
        }
        if(username.length>30){
            return reject('username to Long');
        }
        if(phonenumber && phonenumber.length!=10){
            return reject('Phone number not valid');
        }
        if(password && password.lenght<6){
            return reject("Password is to Short");
        }
        if(password && validator.isAlphanumeric(password)){
            return reject('Password should contain alphabet and numbers');
        }
        return resolve();

        
        
    });
}
module.exports={cleanUpAndValidate};