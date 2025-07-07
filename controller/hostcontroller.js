const home = require("../models/home");
const Home=require("../models/home")

exports.getaddhomes=(req,res,next)=>{
    res.render('host/edit-home',{
        pagetitle:'add home to airbnb',
        editing:false,
        isLoggedIn:req.isLoggedIn,
    })
};

exports.getedithome=(req,res,next)=>{
    const homeid=req.params.homeid;
    const editing=req.query.editing === 'true';
    Home.findById(homeid).then((home)=>{
        if(!home){
            console.log('home not found for editing')
            return res.redirect('/host/host-home-list');
        }
        // console.log(homeid,editing,home)
        res.render('host/edit-home',{
            pagetitle:'edit your home',
            editing:editing,
            home:home,
            isLoggedIn:req.isLoggedIn,
        })
    })
};

exports.postaddhomes=(req,res,next)=>{
    const{housename,pricepernight,location,rating,photourl,descreption}=req.body
    const home=new Home({housename,pricepernight,location,rating,photourl,descreption})
    home.save().then(()=>{
        console.log('home saved succefully')
    })
    // rhouses.push(req.body)
    res.redirect('/host/host-home-list')
}


exports.postedithome=(req,res,next)=>{
    const{id,housename,pricepernight,location,rating,photourl,descreption}=req.body
    home.findById(id)
    .then((home)=>{
        home.housename=housename;
        home.pricepernight=pricepernight;
        home.location=location;
        home.rating=rating;
        home.photourl=photourl;
        home.descreption=descreption;
        home.save()
        .then( result=>{
            console.log('home updated')
        })
        .catch(err=>{
            console.log('error while updating',err)
        })
        res.redirect('/host/host-home-list')
    })
    .catch(err=>{
        console.log('error while editing',err)
    })
}

exports.gethosthomes=(req,res,next)=>{
    Home.find().then(rhouses=>{
        res.render('host/host-home-list',{rhouses:rhouses,pagetitle:'host-home-list',isLoggedIn:req.isLoggedIn,
        })
    })
}

exports.postdeletehome=(req,res,next)=>{
    const homeid=req.params.homeid;
    // console.log("came to delete",homeid)
    Home.findByIdAndDelete(homeid).then(()=>{
        res.redirect('/host/host-home-list')
    }).catch(error=>{
        console.log('error while deleting',error)
    })
}

// exports.rhouses=rhouses;