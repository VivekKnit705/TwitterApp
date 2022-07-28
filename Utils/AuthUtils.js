const validator=require('validator');

function cleanUpAndValidate({email,userName,phoneNo,password}){
    return new Promise((resolve,reject)=>{
        if(typeof(emial)!=string){
            return reject('Email is Not String');
        }
        if(!validator.isEmail(email)){
            return reject("Invalid Email");
        }
        if(userName.length<3){
            return reject('userName to Short');
        }
        if(userName.length>30){
            return reject('userName to Long');
        }
        if(phoneNo && phoneNo.length!=10){
            return reject('Phone number not valid');
        }
        if(password && password.lenght<6){
            return reject("Password is to Short");
        }
        if(password && !validator.isAlphanumeric(psssword)){
            return reject('Passwod should contain alphabet and numbers');
        }
        return resolve();

        
        
    });
}
module.exports={cleanUpAndValidate};