const bcrypt=require('bcrypt');


const UserSchema=require('../Schemas/UserSchema');


let User=class{
    userName;
    email;
    password;
    name;
    phoneNo;
    profilePic;

    constructor({userName,email,password,name,phoneNo,profilePic}){
        this.userName=userName;
        this.email=email;
        this.password=password;
        this.name=name;
        this.phoneNo=phoneNo;
        this.profilePic=profilePic;
    }

    static verifyUsernameAndEmailExist({userName,email}){
        return new Promise(async (resolve,reject)=>{
            try{
                const user=await UserSchema.findOne({$or:[{userName},{email}]})
                
                if(!user){
                    return resolve();
                }

                if(use && use.email==email){
                    return reject("user with email exist");
                }
                if(use && use.userName==userName){
                    return reject("user with userName exist");
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
            const hashPassword=bcrypt.hash(this.password,13);
            const user=new UserSchema({
                userName:this.userName,
                email:this.email,
                password:this.password,
                name:this.name,
                phoneNo:this.phoneNo,
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
    
}

module.exports=User;