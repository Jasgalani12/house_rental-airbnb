const express=require('express')
const housecontroller=require('../controller/hostcontroller.js')
const hostrouter=express.Router()

hostrouter.get("/add-home",housecontroller.getaddhomes);

hostrouter.post("/add-home",housecontroller.postaddhomes);

hostrouter.get("/host-home-list",housecontroller.gethosthomes);

hostrouter.get('/edit-home/:homeid',housecontroller.getedithome);

hostrouter.post('/edit-home/',housecontroller.postedithome);

module.exports=hostrouter;