const bcrypt = require("bcrypt");
const { unlink } = require("fs");
const path = require("path");


const User = require("../model/people");

async function getUser(req,res,next){
    try{
        const users=await User.find();
        res.render("users",{
            users:users,
        });
    }catch(err){
        next(err);
    }
   
}

async function addUser(req,res,next){
    let newusr;
    const hashedpass=await bcrypt.hash(req.body.password,10);

    if(req.files && req.files.length>0){
        newusr== new User({
            ...req.body,
            avatar: req.files[0].filename,
            password: hashedpass,
          });
    }else{
        newusr= new User({
            ...req.body,
            password: hashedpass,
          });
    }

    try{
        const result=await newusr.save();
        res.status(200).json({
            message:"User was added successfully!",
        });
        // console.log("ok2");
    }catch(err){
        console.log(err);
        res.status(500).json({
            errors: {
                common: {
                  msg: "Unknown error occured!",
                },
              },
        });
    }
}


async function removeUser(req, res, next) {
    try {
      const user = await User.findByIdAndDelete({
        _id: req.params.id,
      });
  
      if (user.avatar) {
        unlink(
          path.join(__dirname, `/../public/uploads/avatars/${user.avatar}`),
          (err) => {
            if (err) console.log(err);
          }
        );
      }
  
      res.status(200).json({
        message: "User was removed successfully!",
      });
    } catch (err) {
      res.status(500).json({
        errors: {
          common: {
            msg: "Could not delete the user!",
          },
        },
      });
    }
  }


module.exports={
    getUser,
    addUser,
    removeUser,
}