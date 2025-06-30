const db=require('../utils/databaseUtil.js');

module.exports= class Home{
    constructor(housename,pricepernight,location,rating,photourl,descreption,id){
        this.housename=housename;
        this.pricepernight=pricepernight;
        this.location=location;
        this.rating=rating;
        this.photourl=photourl;
        this.descreption=descreption;
        this.id=id;
    }

    save(){
        if(this.id){
            return db.execute('UPDATE homes SET housename=?,pricepernight=?,location=?,rating=?,photourl=?,descreption=? WHERE id=?',[this.housename,this.pricepernight,this.location,this.rating,this.photourl,this.descreption,this.id])
        }
        else{
            return db.execute('INSERT INTO homes (housename,pricepernight,location,rating,photourl,descreption) VALUES (?,?,?,?,?,?)',[this.housename,this.pricepernight,this.location,this.rating,this.photourl,this.descreption])
        }
        
    }
    
    static fetchall(){
       return db.execute('SELECT * FROM homes')
    }

    static findbyid(homeid){
        return db.execute('SELECT * FROM homes where id=?',[homeid])
    }
    static deletebyid(homeid){
        return db.execute('DELETE FROM homes where id=?',[homeid])
    }
}