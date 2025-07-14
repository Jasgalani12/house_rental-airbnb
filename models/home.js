const mongoose = require("mongoose");

const homeschema=new mongoose.Schema({
    housename:{type:String,required:true},
    pricepernight:{type:Number,required:true},
    location:{type:String,required:true},
    rating:{type:Number,required:true},
    photo:String,
    descreption:String
});

module.exports=mongoose.model('home',homeschema)