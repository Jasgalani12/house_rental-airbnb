exports.pagenotfound=(req,res,next)=>{
    res.status(404).render('404',{
        pagetitle:'page not found',
        isLoggedIn:req.session.isLoggedIn,
        user:req.session.user
    })
}