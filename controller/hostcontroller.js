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
    Home.findbyid(homeid,home=>{
        if(!home){
            console.log('home not found for editing')
            return res.redirect('/host/host-home-list');
        }
        console.log(homeid,editing,home)
        res.render('host/edit-home',{
            pagetitle:'edit your home',
            editing:editing,
            home:home,
        })
    })
};
// const rhouses=[]
exports.postaddhomes=(req,res,next)=>{
    const{housename,pricepernight,location,rating,photourl}=req.body
    const home=new Home(housename,pricepernight,location,rating,photourl)
    home.save()
    // rhouses.push(req.body)
    res.redirect('/host/host-home-list')
}
exports.postedithome=(req,res,next)=>{
    const{id,housename,pricepernight,location,rating,photourl}=req.body
    const home=new Home(housename,pricepernight,location,rating,photourl)
    home.id=id;
    home.save()
    res.redirect('/host/host-home-list')
}


exports.gethosthomes=(req,res,next)=>{
    const rhouses=Home.fetchall((rhouses)=>res.render('host/host-home-list',{rhouses:rhouses,pagetitle:'host-home-list'}))
}



// exports.rhouses=rhouses;