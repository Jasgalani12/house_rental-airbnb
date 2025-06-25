const path=require('path')
const fs=require('fs')
const root=require('../utils/pathUtil')

const favouritedatapath=path.join(root,'data','favourite.json')

module.exports= class Favourite{

    static addtofavourite(homeid,callback){
        Favourite.getfavourites((favourites)=>{
            
            if(favourites.includes(homeid)){
                callback('home is already marked favourite')
            }
            else{
                favourites.push(homeid);
                fs.writeFile(favouritedatapath,JSON.stringify(favourites),callback);
            }
        })
    }
    static getfavourites(callback){
        fs.readFile(favouritedatapath,(err,data)=>{
            if(!err){
                callback(JSON.parse(data))
            }
            else{
                callback([])
            }
        })
    }
}