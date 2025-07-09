const mongoose = require("mongoose");

const userschema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    usertype:{
        type:String,
        required:true,
        enum:['guest','host']
    },
    tac:{
        type:String,
    }
});

module.exports=mongoose.model('User',userschema)