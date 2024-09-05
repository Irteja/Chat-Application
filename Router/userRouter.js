const express = require("express");
const {getUser,addUser,removeUser}=require("../controller/usercontroller");
const decorateHtmlResponse=require("../middlewawre/common/decorateHtmlResponse");
const avaterUploader=require("../middlewawre/user/avaterUpload");
const {checkLogin,requireRole}=require("../middlewawre/common/checkLogin");

const {userValidator,userValidationHandler}=require("../middlewawre/user/uservalidator");

const router=express.Router();

// console.log("yes");

router.get("/",decorateHtmlResponse("User"),checkLogin,requireRole(["admin"]),getUser);

router.post("/",checkLogin,avaterUploader,userValidator,userValidationHandler,addUser);

router.delete("/:id",removeUser);



module.exports=router;