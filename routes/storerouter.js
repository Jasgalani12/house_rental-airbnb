const express=require('express');
const storerouter=express.Router()
const storecontroller=require('../controller/storecontroller')
storerouter.get("/",storecontroller.getindex); 

storerouter.get("/homes",storecontroller.gethomes); 

storerouter.get("/bookings",storecontroller.getbookings); 

storerouter.get("/favourite",storecontroller.getfavouritelist); 

storerouter.post("/favourite",storecontroller.postaddtofavourite); 

storerouter.post("/favourite/delete/:homeid",storecontroller.postremovefromfavourite); 

storerouter.get("/homes/:homeid",storecontroller.gethomedetails); 

module.exports=storerouter;