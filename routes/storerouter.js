const express=require('express');
const storerouter=express.Router()
const homescontroller=require('../controller/storecontroller')
storerouter.get("/",homescontroller.getindex); 
storerouter.get("/homes",homescontroller.gethomes); 
storerouter.get("/bookings",homescontroller.getbookings); 
storerouter.get("/favourite",homescontroller.getfavouritelist); 
storerouter.get("/homes/:homeid",homescontroller.gethomedetails); 
module.exports=storerouter;