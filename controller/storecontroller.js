const Favourite = require("../models/favourite")
const Home=require("../models/home")

exports.gethomes=(req,res,next)=>{
    Home.fetchall().then(rhouses=>{
        res.render('store/home-list',{rhouses:rhouses,pagetitle:'airbnb Home-list'})
    })
}

exports.getindex=(req,res,next)=>{
    Home.fetchall().then(rhouses=>{
        res.render('store/index',{rhouses:rhouses,pagetitle:'airbnb index'})
    })
}

exports.getbookings=(req,res,next)=>{
    res.render('store/bookings',{pagetitle:'my bookings'})   
}

exports.getfavouritelist=(req,res,next)=>{
    Favourite.getfavourites().then(favourite=>{
        favourite=favourite.map(fav=>fav.houseid)
        Home.fetchall().then(rhouses=>{
                const favouritehomes=rhouses.filter(home=>favourite.includes(home._id.toString()))
                res.render('store/favourite-list',{
                    favouritehomes:favouritehomes,
                    pagetitle:'my favourite list'
                })
            })
        })
     
}

exports.postaddtofavourite=(req,res,next)=>{
    const homeid=req.body.id;
    const fav=new Favourite(homeid)

    fav.save()
    .then(result=>{
        console.log('fav added')
    })
    .catch(err=>{
        console.log('error while adding favourite:',err)
    })
    .finally(()=>{
        res.redirect('/favourite');
    })
}
exports.postremovefromfavourite=(req,res,next)=>{
    const homeid=req.params.homeid;
    Favourite.deletebyid(homeid).then(result=>{
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
    Home.findbyid(homeid).then((home)=>{
        if(!home){
            console.log('no home')
            res.redirect('/homes')
        }
        else{
            res.render('store/home-details',{pagetitle:'home details',home:home})
        }
    })
}
