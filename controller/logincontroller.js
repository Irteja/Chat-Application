const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const User=require("../model/people");

function getlogin(req,res,next){
    res.render("index");
}

async function login(req,res,next){
    try{
        const user=await User.findOne({
            $or:[{email:req.body.username},{mobile:req.body.username}],
        });

        if(user && user._id){
            const isValid=await bcrypt.compare(req.body.password,user.password);
            if(isValid){
                const userObject={
                    userid:user._id,
                    username:user.name,
                    mobile:user.mobile,
                    email:user.email,
                    avatar:user.avatar || null,
                    role:user.role || "user",
                };

                const token=jwt.sign(userObject,process.env.JWT_SECRET,{
                    expiresIn:process.env.JWT_EXPIRES,
                });

                res.cookie(process.env.COOKIE_NAME,token,{
                    maxAge:process.env.JWT_EXPIRES,
                    httpOnly:true,
                    signed:true,
                });

                res.locals.loggedInUser=userObject;
                res.redirect("/inbox");
                // console.log("find");
            }else{
                throw createError("Login failed! Please try again.");
            }
        }else{
            throw createError("Login failed! Please try again.");
        }

       
    }catch(err){
        res.render("index",{
            data:{
                username:req.body.username,
            },
            errors:{
                common:{
                    msg:err.message,
                },
            },
        });
    }
}


function logOut(req,res){
    res.clearCookie(process.env.COOKIE_NAME);
    res.send("logged out");
}

module.exports={
    getlogin,login,logOut
}