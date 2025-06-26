const Favourite = require("../models/favourite")
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
    Favourite.getfavourites(favourite=>{
        Home.fetchall((rhouses)=>{
            const favouritehomes=rhouses.filter(home=>favourite.includes(home.id))
            res.render('store/favourite-list',{
                favouritehomes:favouritehomes,
                pagetitle:'my favourite list'
            })
        })
    })
     
}

exports.postaddtofavourite=(req,res,next)=>{
    Favourite.addtofavourite(req.body.id,error=>{
        if(error){
            console.log('error while marking favourite: ',error)
        }
        res.redirect('/favourite');
    })
}
exports.postremovefromfavourite=(req,res,next)=>{
    const homeid=req.params.homeid;
    Favourite.deletebyid(homeid,error=>{
        if(error){
            console.log('error while removing favourite',error)
        }
        res.redirect('/favourite');
    })
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
            // console.log(home)
            res.render('store/home-details',{pagetitle:'home details',home:home})
        }
    })
}
