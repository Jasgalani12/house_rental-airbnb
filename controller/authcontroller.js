
exports.getlogin=(req,res,next)=>{
    res.render('auth/login',{
        pagetitle:'login',
        isLoggedIn:false,
    })
};

exports.postlogin=(req,res,next)=>{
    res.cookie('isLoggedIn',true)
    req.isLoggedIn=true;
    res.redirect('/')
};
exports.postlogout=(req,res,next)=>{
    res.cookie('isLoggedIn',false)
    res.redirect('/login')
};