const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    username:{
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
    phonenumber:{
        type:String,
        required:false
    },
    profilePic:{
        type:String,
        required:false
    }

})

module.exports=mongoose.model('user',userSchema);