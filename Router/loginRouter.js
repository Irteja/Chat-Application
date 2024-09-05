const express = require("express");
const {getlogin,login,logOut}=require("../controller/logincontroller");
const decorateHtmlResponse=require("../middlewawre/common/decorateHtmlResponse");
const {loginValidators,loginValidatorsHanlder}=require("../middlewawre/login/loginValidators");
const {redirectLogin}=require("../middlewawre/common/checkLogin");

const router=express.Router();



router.get("/",decorateHtmlResponse("Login"),redirectLogin,getlogin);

router.post("/",decorateHtmlResponse("Login"),loginValidators,loginValidatorsHanlder,login);

router.delete("/",logOut);

module.exports=router;