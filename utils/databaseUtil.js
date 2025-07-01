const mongo=require('mongodb');

const mongoclient=mongo.MongoClient;

const mongo_url="mongodb+srv://root:1234@jas.rssa3h4.mongodb.net/?retryWrites=true&w=majority&appName=jas"

let _db;

const mongoconnect=(callback)=>{
    mongoclient.connect(mongo_url)
    .then(client=>{
        _db=client.db('airbnb')
        callback();
    })
    .catch(err=>{
        console.log('error while connecting to mongo',err)
    })
}

const getdb=()=>{
    if(!_db){
        throw new Error('db not connected');
        
    }
    return _db
}
exports.mongoconnect=mongoconnect;
exports.getdb=getdb;