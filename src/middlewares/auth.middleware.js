
export const auth=(req,res,next)=>{
    if (req.session.userEmail) {
        return next();
    }
    return res.render('login',{errormessage:null});
}