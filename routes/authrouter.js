const express=require('express')
const authrouter=express.Router()
const authcontroller=require('../controller/authcontroller.js')

authrouter.get("/login",authcontroller.getlogin);

authrouter.post("/login",authcontroller.postlogin);
authrouter.post("/logout",authcontroller.postlogout);
module.exports=authrouter;