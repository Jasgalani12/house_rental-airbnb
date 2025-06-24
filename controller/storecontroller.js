const Home=require("../models/home")

exports.gethomes=(req,res,next)=>{
    const rhouses=Home.fetchall((rhouses)=>res.render('store/home-list',{rhouses:rhouses,pagetitle:'airbnb Home-list'}))
}

exports.getindex=(req,res,next)=>{
    const rhouses=Home.fetchall((rhouses)=>res.render('store/index',{rhouses:rhouses,pagetitle:'airbnb index'}))
}

exports.getbookings=(req,res,next)=>{
    res.render('store/bookings',{pagetitle:'my bookings'})   
}

exports.getfavouritelist=(req,res,next)=>{
     const rhouses=Home.fetchall((rhouses)=>res.render('store/favourite-list',{rhouses:rhouses,pagetitle:'my favourite list'}))
}

exports.gethomedetails=(req,res,next)=>{
    const homeid=req.params.homeid;
    // console.log('at home details page',homeid)
    Home.findbyid(homeid,home=>{
        if(!home){
            console.log('no home')
            res.redirect('/homes')
        }
        else{
            console.log(home)
        res.render('store/home-details',{pagetitle:'home details',home:home})
        }
    })
}
