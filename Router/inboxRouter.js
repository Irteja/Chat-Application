const express = require("express");
const {getInbox,addConversation,getMessages,searchUser,sendMessage}=require("../controller/inboxcontroller");
const decorateHtmlResponse=require("../middlewawre/common/decorateHtmlResponse");
const {checkLogin}=require("../middlewawre/common/checkLogin");
const attachmentUpload=require("../middlewawre/inbox/attachmentUploader");

const router=express.Router();


router.get("/",decorateHtmlResponse("Inbox"),checkLogin,getInbox);

router.post("/search",checkLogin,searchUser);

router.post("/conversation",checkLogin,addConversation);

router.get("/message/:conversation_id", checkLogin, getMessages);

router.post("/message",checkLogin,attachmentUpload,sendMessage);



module.exports=router;