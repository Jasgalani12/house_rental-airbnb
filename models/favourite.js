const { getdb } = require("../utils/databaseUtil");

module.exports= class Favourite{

    constructor(houseid){
        this.houseid=houseid;
    }

    save(){
        const db=getdb()
        return db.collection('favourite').findOne({houseid:this.houseid}).then(existingfav=>{
            if(!existingfav){
                return db.collection('favourite').insertOne(this);
            }
            return Promise.resolve()
        })

    }

    static getfavourites(){
         const db=getdb()
        return db.collection('favourite').find().toArray();
    }

    static deletebyid(delhomeid){
        const db=getdb()
        return db.collection('favourite').deleteOne({houseid:delhomeid});
    }
}