const path=require('path')
const fs=require('fs')
const root=require('../utils/pathUtil')
const Favourite = require('./favourite')

const homedatapath=path.join(root,'data','homes.json')

module.exports= class Home{
    constructor(housename,pricepernight,location,rating,photourl){
        this.housename=housename;
        this.pricepernight=pricepernight;
        this.location=location;
        this.rating=rating;
        this.photourl=photourl;
    }

    save(){
        Home.fetchall(rhouses=>{
            if(this.id){
                rhouses=rhouses.map(home=>
                    home.id === this.id ? this:home)
            }
            else{
                this.id=Math.random().toString();
                rhouses.push(this);
        }
        
        fs.writeFile(homedatapath,JSON.stringify(rhouses),error=>{
            if(error){
                console.log(error);
            }
        });
        })
    }
    
    static fetchall(callback){
        fs.readFile(homedatapath,(err,data)=>{
            if(!err){
                callback(JSON.parse(data))
            }
            else{
                callback([])
            }
        })
    }

    static findbyid(homeid,callback){
        this.fetchall(homes=>{
            const homefound=homes.find(home=>home.id===homeid);
            callback(homefound)
        })
    }
    static deletebyid(homeid,callback){
        this.fetchall(homes=>{
            homes=homes.filter(home=>home.id !== homeid);
            fs.writeFile(homedatapath,JSON.stringify(homes),error=>{
                Favourite.deletebyid(homeid,callback);
            });
        })
    }
}