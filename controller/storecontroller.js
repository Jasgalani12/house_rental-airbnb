const Favourite = require("../models/favourite")
const Home=require("../models/home")

exports.gethomes=(req,res,next)=>{
    Home.find().then(rhouses=>{
        res.render('store/home-list',{rhouses:rhouses,pagetitle:'airbnb Home-list'})
    })
}

exports.getindex=(req,res,next)=>{
    Home.find().then(rhouses=>{
        res.render('store/index',{rhouses:rhouses,pagetitle:'airbnb index'})
    })
}

exports.getbookings=(req,res,next)=>{
    res.render('store/bookings',{pagetitle:'my bookings'})   
}

exports.getfavouritelist=(req,res,next)=>{
    Favourite.find()
    .populate('houseid')
    .then((favourite)=>{
        const favouritehomes=favourite.map((fav)=>fav.houseid)
        res.render('store/favourite-list',{
            favouritehomes:favouritehomes,
            pagetitle:'my favourite list'
        })
    })
}
     


exports.postaddtofavourite=(req,res,next)=>{
    const homeid=req.body.id;
    Favourite.findOne({houseid:homeid}).then((fav)=>{
        if(fav){
            console.log('already marked as favourite')
            return res.redirect('/favourite')
        }
        else{
            fav=new Favourite({houseid:homeid})
            fav.save().then(result=>{
                console.log('fav added')
            })
        }
        return res.redirect('/favourite')
    }).catch(err=>{
        console.log('error while marking fav',err)
    })
}
exports.postremovefromfavourite=(req,res,next)=>{
    const homeid=req.params.homeid;
    Favourite.findOneAndDelete({houseid:homeid}).then(result=>{
        console.log('fav removed')
    })
    .catch(err=>{
        console.log('error while removing favourite:',err)
    })
    .finally(()=>{
        res.redirect('/favourite');
    })
}
exports.gethomedetails=(req,res,next)=>{
    const homeid=req.params.homeid;
    // console.log('at home details page',homeid)
    Home.findById(homeid).then((home)=>{
        if(!home){
            console.log('no home')
            res.redirect('/homes')
        }
        else{
            res.render('store/home-details',{pagetitle:'home details',home:home})
        }
    })
}
