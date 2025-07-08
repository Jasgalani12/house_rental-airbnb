const express=require('express')
const authrouter=express.Router()
const authcontroller=require('../controller/authcontroller.js')

authrouter.get("/login",authcontroller.getlogin);
authrouter.get("/signup",authcontroller.getsignup);

authrouter.post("/login",authcontroller.postlogin);
authrouter.post("/signup",authcontroller.postsignup);
authrouter.post("/logout",authcontroller.postlogout);
module.exports=authrouter;