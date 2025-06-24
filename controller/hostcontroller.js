const Home=require("../models/home")

exports.getaddhomes=(req,res,next)=>{
    res.render('host/addhome',{pagetitle:'add home to airbnb'})
};
// const rhouses=[]
exports.postaddhomes=(req,res,next)=>{
    const{housename,pricepernight,location,rating,photourl}=req.body
    const home=new Home(housename,pricepernight,location,rating,photourl)
    home.save()
    // rhouses.push(req.body)
    res.render('host/homeadded',{pagetitle:'home added succefully'})
}

exports.gethosthomes=(req,res,next)=>{
    const rhouses=Home.fetchall((rhouses)=>res.render('host/host-home-list',{rhouses:rhouses,pagetitle:'host-home-list'}))
}



// exports.rhouses=rhouses;