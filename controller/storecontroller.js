const Home=require("../models/home")
const User=require('../models/user')

exports.gethomes=(req,res,next)=>{
    Home.find().then(rhouses=>{
        res.render('store/home-list',{rhouses:rhouses,pagetitle:'airbnb Home-list',isLoggedIn:req.session.isLoggedIn,user:req.session.user})
    })
}

exports.getindex=(req,res,next)=>{
    // console.log('session value',req.session)
    Home.find().then(rhouses=>{
        res.render('store/index',{rhouses:rhouses,pagetitle:'airbnb index',isLoggedIn:req.session.isLoggedIn,user:req.session.user})
    })
}

exports.getbookings=(req,res,next)=>{
    res.render('store/bookings',{pagetitle:'my bookings',isLoggedIn:req.session.isLoggedIn,user:req.session.user})   
}

exports.getfavouritelist=async(req,res,next)=>{
    const userid=req.session.user._id;
    const user=await User.findById(userid).populate('favourites')
    res.render('store/favourite-list',{
        favouritehomes:user.favourites,
        pagetitle:'my favourite list',isLoggedIn:req.session.isLoggedIn,
        user:req.session.user
    })
}
     


exports.postaddtofavourite=async(req,res,next)=>{
    const homeid=req.body.id;
    const userid=req.session.user._id;
    const user=await User.findById(userid).populate('favourites')
    if(!user.favourites.includes(homeid)){
       user.favourites.push(homeid)
       await user.save()
    }
    res.redirect('/favourite')
}
exports.postremovefromfavourite=async(req,res,next)=>{
    const homeid=req.params.homeid;
    const userid=req.session.user._id;
    const user=await User.findById(userid)
    if(user.favourites.includes(homeid)){
        user.favourites=user.favourites.filter(fav=>fav !=homeid)
        await user.save()
    }
    res.redirect('/favourite');
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
            res.render('store/home-details',{pagetitle:'home details',home:home,isLoggedIn:req.session.isLoggedIn,user:req.session.user})
        }
    })
}
