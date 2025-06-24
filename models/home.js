const path=require('path')
const fs=require('fs')
const root=require('../utils/pathUtil')

module.exports= class Home{
    constructor(housename,pricepernight,location,rating,photourl){
        this.housename=housename;
        this.pricepernight=pricepernight;
        this.location=location;
        this.rating=rating;
        this.photourl=photourl;
    }

    save(){
        this.id=Math.random().toString();
        Home.fetchall(rhouses=>{
        rhouses.push(this);
        const homedatapath=path.join(root,'data','homes.json')
        fs.writeFile(homedatapath,JSON.stringify(rhouses),error=>{
            console.log(error);
        });
        })
        
    }
    static fetchall(callback){
        const homedatapath=path.join(root,'data','homes.json')
        fs.readFile(homedatapath,(err,data)=>{
            if(!err){
                callback(JSON.parse(data))
            }
            else{
                callback([])
            }
        })
    }
}