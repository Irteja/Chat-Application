function decorateHtmlResponse(ptitle){
    return function(req,res,next){
        res.locals.html=true;
        res.locals.title=`${ptitle}-${process.env.APP_NAME}`;
        res.locals.loggedInUser = {};
        res.locals.errors = {};
        res.locals.data = {};
        // console.log(res.locals.check_role);
        if(!res.locals.check_role)
         res.locals.check_role=0;
        next();
    };
}

module.exports=decorateHtmlResponse;