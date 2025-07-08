
exports.getlogin=(req,res,next)=>{
    res.render('auth/login',{
        pagetitle:'login',
        isLoggedIn:false,
    })
};

exports.postlogin=(req,res,next)=>{
    req.session.isLoggedIn=true;
    res.redirect('/')
};
exports.postlogout=(req,res,next)=>{
    req.session.destroy(()=>{
        res.redirect('/login')
    })
};