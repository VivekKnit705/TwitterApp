const checkAuth=(req,res,next)=>{
    if(req.session.isAuth){
        return next();
    }
    return ({
        status:400,
        message:"Invalid Session please log in"
    })
}

module.exports={checkAuth};