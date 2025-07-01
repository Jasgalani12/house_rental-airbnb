const { ObjectId } = require("mongodb");
const { getdb } = require("../utils/databaseUtil");

module.exports= class Home{
    constructor(housename,pricepernight,location,rating,photourl,descreption,_id){
        this.housename=housename;
        this.pricepernight=pricepernight;
        this.location=location;
        this.rating=rating;
        this.photourl=photourl;
        this.descreption=descreption;
        if(_id){
            this._id=_id;
        }
    }

    save(){
        const db=getdb()
        const data={
            housename:this.housename,
            pricepernight:this.pricepernight,
            location:this.location,
            rating:this.rating,
            photourl:this.photourl,
            descreption:this.descreption
        }
        if(this._id){//update
             return db.collection('homes').updateOne({_id:new ObjectId(String(this._id))},{$set:data})
        }
        else{//new
            return db.collection('homes').insertOne(this);
        }
    }
    
    static fetchall(){
        const db=getdb()
        return db.collection('homes').find().toArray();
    }

    static findbyid(homeid){
        const db=getdb()
        return db.collection('homes').find({_id:new ObjectId(String(homeid))}).next();
    }
    static deletebyid(homeid){
        const db=getdb()
        return db.collection('homes').deleteOne({_id:new ObjectId(String(homeid))});
    }
}