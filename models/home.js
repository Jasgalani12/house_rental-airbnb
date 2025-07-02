const mongoose = require("mongoose");
const favourite = require("./favourite");

const homeschema=new mongoose.Schema({
    housename:{type:String,required:true},
    pricepernight:{type:Number,required:true},
    location:{type:String,required:true},
    rating:{type:Number,required:true},
    photourl:String,
    descreption:String
});

homeschema.pre('findOneAndDelete',async function(next) {
    const homeid=this.getQuery()['_id'];
    await favourite.deleteMany({houseid:homeid});
    next()
})

module.exports=mongoose.model('home',homeschema)