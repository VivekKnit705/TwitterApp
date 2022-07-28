const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    phoneNo:{
        type:String,
        required:false
    },
    profilePic:{
        type:String,
        required:true
    }

})

module.exports=mongoose.model('user',userSchema);