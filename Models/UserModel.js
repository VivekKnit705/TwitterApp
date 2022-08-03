const bcrypt=require('bcrypt');
const validator=require('validator');


const UserSchema=require('../Schemas/UserSchema');


let User=class{
    username;
    email;
    password;
    name;
    phonenumber;
    profilePic;

    constructor({username,email,password,name,phonenumber,profilePic}){
        this.username=username;
        this.email=email;
        this.password=password;
        this.name=name;
        this.phonenumber=phonenumber;
        this.profilePic=profilePic;
    }

    static verifyUsernameAndEmailExist({username,email}){
        return new Promise(async (resolve,reject)=>{
            try{
                const user=await UserSchema.findOne({$or:[{username},{email}]})
                
                if(!user){
                    return resolve();
                }

                if(user && user.email==email){
                    return reject("user with email exist");
                }
                if(user && user.username==username){
                    return reject("user with username exist");
                }


                return reject("Some unknown error occured");

            }
            catch(err){
                return reject(err);
            }
        })
    }
    registerUser(){
        return new Promise(async (resolve,reject)=>{
            // .log("hello");
            const hashPassword=await bcrypt.hash(this.password,13);
            const user=new UserSchema({
                username:this.username,
                email:this.email,
                password:hashPassword,
                name:this.name,
                phonenumber:this.phonenumber,
                profilePic: this.profilePic
            })
            try{
                
                const dbUser=await user.save();
                return resolve(dbUser);
            }
            catch(err){
                return reject(err);
            }

        })
    }

    static findUserWithLoginId({loginId}){ 
        return new Promise(async (resolve,reject)=>{
            let dbUser;
            try{
                if(validator.isEmail(loginId)){
                    dbUser=await UserSchema.findOne({email:loginId});
                }
                else{
                    dbUser=await UserSchema.findOne({username:loginId});
                }
            }
            catch(err){
               return reject("Database Error");
            }
            if(!dbUser){
                return reject("No User found");
            }
            resolve(dbUser);

        })
    }
    
}

module.exports=User;