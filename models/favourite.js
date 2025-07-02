const mongoose = require("mongoose");

const favouriteschema=new mongoose.Schema({
    houseid:{type:mongoose.Schema.Types.ObjectId,ref:'',required:true,unique:true}
    
});

module.exports=mongoose.model('favourite',favouriteschema)