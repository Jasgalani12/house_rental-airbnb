const express=require('express')
const housecontroller=require('../controller/hostcontroller.js')
const hostrouter=express.Router()

hostrouter.get("/add-home",housecontroller.getaddhomes);

hostrouter.post("/add-home",housecontroller.postaddhomes);

hostrouter.get("/host-home-list",housecontroller.gethosthomes);

module.exports=hostrouter;