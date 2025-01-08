
export const setLastVisited = (req,res,next)=>{
    if (req.cookies.lastVisited) {
        res.locals.lastVisited = new Date().toLocaleString();
    }else{
    res.cookie('lastVisited', new Date().toLocaleString(),{
        maxAge: 2*24*60*60*1000
    });
    }

    next();
}