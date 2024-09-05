const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const path = require("path");
const { unlink } = require("fs");

const usr=require("../../model/people");

const userValidator=[
    check("name")
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet")
    .trim(),
    check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (value) => {
      try {
        const user = await usr.findOne({ email: value });
        if (user) {
          throw createError("Email already is use!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
    check("mobile")
    .isMobilePhone("bn-BD", {
      strictMode: true,
    })
    .withMessage("Mobile number must be a valid Bangladeshi mobile number(+880)")
    .custom(async (value) => {
      try {
        const user = await usr.findOne({ mobile: value });
        if (user) {
          throw createError("Mobile already is use!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
    check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
    ),
];

const userValidationHandler=function(req,res,next){
    const errors=validationResult(req);
    const mappedErrors=errors.mapped();
    if(Object.keys(mappedErrors).length===0){
      next();
    }else{
      console.log(Object.keys(mappedErrors).length);
        if(req.files.length>0){
            const {filename}=req.files[0];
            unlink(
                path.join(__dirname,`/../../public/uploads/avaters/${filename}`),
                (err)=>{
                    console.log(err);
                }
            );
        }
        res.status(500).json({
            errors:mappedErrors,
        });
    }
};


module.exports={
    userValidator,
    userValidationHandler,
};