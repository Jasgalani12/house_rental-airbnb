const Home=require("../models/home")

exports.getaddhomes=(req,res,next)=>{
    res.render('host/edit-home',{
        pagetitle:'add home to airbnb',
        editing:false,
    })
};

exports.getedithome=(req,res,next)=>{
    const homeid=req.params.homeid;
    const editing=req.query.editing === 'true';
    Home.findbyid(homeid).then(([homes])=>{
        const home=homes[0]
        if(!home){
            console.log('home not found for editing')
            return res.redirect('/host/host-home-list');
        }
        // console.log(homeid,editing,home)
        res.render('host/edit-home',{
            pagetitle:'edit your home',
            editing:editing,
            home:home,
        })
    })
};
// const rhouses=[]
exports.postaddhomes=(req,res,next)=>{
    const{housename,pricepernight,location,rating,photourl,descreption}=req.body
    const home=new Home(housename,pricepernight,location,rating,photourl,descreption)
    home.save()
    // rhouses.push(req.body)
    res.redirect('/host/host-home-list')
}
exports.postedithome=(req,res,next)=>{
    const{id,housename,pricepernight,location,rating,photourl,descreption}=req.body
    const home=new Home(housename,pricepernight,location,rating,photourl,descreption,id)
    home.save()
    res.redirect('/host/host-home-list')
}

exports.gethosthomes=(req,res,next)=>{
    Home.fetchall().then(([rhouses])=>{
        res.render('host/host-home-list',{rhouses:rhouses,pagetitle:'host-home-list'})
    })
}

exports.postdeletehome=(req,res,next)=>{
    const homeid=req.params.homeid;
    // console.log("came to delete",homeid)
    Home.deletebyid(homeid).then(()=>{
        res.redirect('/host/host-home-list')
    }).catch(error=>{
        console.log('error while deleting',error)
    })
}

// exports.rhouses=rhouses;