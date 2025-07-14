const home = require("../models/home");
const Home=require("../models/home")
const fs=require('fs')

exports.getaddhomes=(req,res,next)=>{
    res.render('host/edit-home',{
        pagetitle:'add home to airbnb',
        editing:false,
        isLoggedIn:req.session.isLoggedIn,
        user:req.session.user
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
            isLoggedIn:req.session.isLoggedIn,
            user:req.session.user
        })
    })
};

exports.postaddhomes=(req,res,next)=>{
    const{housename,pricepernight,location,rating,descreption}=req.body
    console.log(req.files)

    const photo=req.files.photo ? req.files.photo[0].path : null;
    const rules=req.files.rules ? req.files.rules[0].path : null;

    if(!req.files.photo){
        return res.status(422).send('no image found')
    }
    
    const home=new Home({housename,pricepernight,location,rating,photo,descreption,rules})
    home.save().then(()=>{
        console.log('home saved succefully')
    })
    // rhouses.push(req.body)
    res.redirect('/host/host-home-list')
}


exports.postedithome=(req,res,next)=>{
    const{id,housename,pricepernight,location,rating,descreption}=req.body
    home.findById(id)
    .then((home)=>{
        home.housename=housename;
        home.pricepernight=pricepernight;
        home.location=location;
        home.rating=rating;
        home.descreption=descreption;

        if(req.files && req.files.photo){
            fs.unlink(home.photo,(err)=>{
                if(err){
                    console.log('error while deleting old photo',err)
                }
            })
            home.photo=req.file.path
        }
        if(req.files && req.files.rules){
            fs.unlink(home.rules,(err)=>{
                if(err){
                    console.log('error while deleting old file',err)
                }
            })
            home.rules=req.file.path
        }

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
        res.render('host/host-home-list',{rhouses:rhouses,pagetitle:'host-home-list',isLoggedIn:req.session.isLoggedIn,
        user:req.session.user
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